from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import torch
from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification

# Initialize FastAPI
app = FastAPI(
    title="Spendora API",
    description="AI-Powered Transaction Categorization API",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model configuration
MODEL_DIR = os.path.join("model", "distilbert_spendora")
MAX_LEN = 48

# Global variables for model
model = None
tokenizer = None
id2label = None
device = None

# ============ LOAD MODEL ============

def load_label_classes():
    """Load category labels from file"""
    path = os.path.join(MODEL_DIR, "label_classes.txt")
    with open(path, "r", encoding="utf-8") as f:
        classes = [line.strip() for line in f.readlines()]
    return {i: c for i, c in enumerate(classes)}

def load_model_and_tokenizer():
    """Load the trained model and tokenizer"""
    global model, tokenizer, id2label, device
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_DIR)
    model = DistilBertForSequenceClassification.from_pretrained(MODEL_DIR).to(device)
    id2label = load_label_classes()
    model.eval()  # Set to evaluation mode
    
    print(f"✅ Model loaded successfully!")
    print(f"   Device: {device}")
    print(f"   Categories: {len(id2label)}")

# Load model when server starts
print("🚀 Loading Spendora Model...")
try:
    load_model_and_tokenizer()
except Exception as e:
    print(f"❌ Error loading model: {e}")
    print("Make sure the model folder exists at 'model/distilbert_spendora'")

# ============ RULE-BASED ADJUSTMENTS ============

def rule_adjust_category(description: str, predicted: str) -> str:
    """Apply rule-based corrections to predictions"""
    text = description.lower()
    
    if "received from" in text or "credited by" in text:
        return "Income / Transfers In"
    if "top-up to upi lite" in text or "top up to upi lite" in text or "upi lite/load" in text:
        return "Wallet Top-up"
    if "irctc" in text or "indian railways" in text or "railways uts" in text:
        return "Travel & Transport"
    if "general stores" in text or "kirana" in text or "supermarket" in text:
        return "Groceries"
    if "atm/cash" in text or "atm withdrawal" in text:
        return "Cash Withdrawal"
    
    return predicted

# ============ PREDICTION FUNCTIONS ============

def predict_single(description: str):
    """Predict category for a single transaction"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Tokenize
    enc = tokenizer(
        [description],
        truncation=True,
        padding=True,
        max_length=MAX_LEN,
        return_tensors="pt"
    )
    enc = {k: v.to(device) for k, v in enc.items()}
    
    # Predict
    with torch.no_grad():
        outputs = model(**enc)
        probs = torch.softmax(outputs.logits, dim=-1).cpu().numpy()[0]
    
    # Get prediction
    pred_id = probs.argmax()
    raw_label = id2label[pred_id]
    final_label = rule_adjust_category(description, raw_label)
    confidence = float(probs[pred_id]) * 100
    
    # Get all scores
    all_scores = {id2label[i]: round(float(probs[i]) * 100, 2) for i in range(len(probs))}
    
    return {
        "category": final_label,
        "confidence": round(confidence, 2),
        "all_scores": all_scores
    }

def predict_batch(descriptions: List[str]):
    """Predict categories for multiple transactions"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    # Tokenize
    enc = tokenizer(
        descriptions,
        truncation=True,
        padding=True,
        max_length=MAX_LEN,
        return_tensors="pt"
    )
    enc = {k: v.to(device) for k, v in enc.items()}
    
    # Predict
    with torch.no_grad():
        outputs = model(**enc)
        probs = torch.softmax(outputs.logits, dim=-1).cpu().numpy()
    
    # Process results
    pred_ids = probs.argmax(axis=1)
    raw_labels = [id2label[i] for i in pred_ids]
    
    # Apply rules
    final_labels = [
        rule_adjust_category(desc, label)
        for desc, label in zip(descriptions, raw_labels)
    ]
    
    confidences = [float(probs[i][pred_ids[i]]) * 100 for i in range(len(pred_ids))]
    
    return final_labels, confidences

# ============ REQUEST/RESPONSE MODELS ============

class TransactionRequest(BaseModel):
    text: str

class BatchTransactionRequest(BaseModel):
    transactions: List[str]

class CategoryResponse(BaseModel):
    transaction: str
    category: str
    confidence: float
    all_scores: dict

# ============ API ENDPOINTS ============

@app.get("/")
def root():
    """Health check endpoint"""
    return {
        "status": "running",
        "message": "Spendora API is live!",
        "model": "DistilBERT",
        "categories": len(id2label) if id2label else 0,
        "endpoints": {
            "predict": "/predict",
            "predict_batch": "/predict/batch",
            "analytics": "/analytics",
            "categories": "/categories"
        }
    }

@app.post("/predict", response_model=CategoryResponse)
def predict_category(request: TransactionRequest):
    """Predict category for a single transaction"""
    try:
        result = predict_single(request.text)
        return CategoryResponse(
            transaction=request.text,
            category=result["category"],
            confidence=result["confidence"],
            all_scores=result["all_scores"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/batch")
def predict_batch_endpoint(request: BatchTransactionRequest):
    """Predict categories for multiple transactions"""
    try:
        labels, confidences = predict_batch(request.transactions)
        results = []
        for text, label, conf in zip(request.transactions, labels, confidences):
            results.append({
                "transaction": text,
                "category": label,
                "confidence": round(conf, 2)
            })
        return {"predictions": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analytics")
def get_analytics(request: BatchTransactionRequest):
    """Get analytics for a list of transactions"""
    try:
        labels, confidences = predict_batch(request.transactions)
        
        # Calculate category breakdown
        category_counts = {}
        for label in labels:
            category_counts[label] = category_counts.get(label, 0) + 1
        
        # Calculate percentages
        total = len(labels)
        category_percentages = {
            cat: round((count / total) * 100, 2)
            for cat, count in category_counts.items()
        }
        
        # Create predictions list
        predictions = [
            {
                "transaction": text,
                "category": label,
                "confidence": round(conf, 2)
            }
            for text, label, conf in zip(request.transactions, labels, confidences)
        ]
        
        return {
            "total_transactions": total,
            "category_breakdown": category_counts,
            "category_percentages": category_percentages,
            "predictions": predictions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/explain")
def explain_prediction(request: TransactionRequest):
    """Get explanation for a prediction"""
    try:
        result = predict_single(request.text)
        
        # Simple keyword extraction
        words = request.text.lower().split()
        
        # Find keywords that might have influenced the prediction
        category_keywords = {
            "Food & Dining": ["restaurant", "cafe", "food", "dining", "swiggy", "zomato"],
            "Shopping": ["amazon", "flipkart", "shopping", "store", "mall"],
            "Travel & Transport": ["uber", "ola", "metro", "train", "irctc", "railways"],
            "Groceries": ["grocery", "kirana", "supermarket", "general stores"],
            "Income / Transfers In": ["received from", "credited by", "salary"],
            "Cash Withdrawal": ["atm", "cash withdrawal"],
            "Wallet Top-up": ["top-up", "wallet", "upi lite"]
        }
        
        matched_keywords = []
        category = result["category"]
        if category in category_keywords:
            for word in words:
                for keyword in category_keywords[category]:
                    if keyword in word:
                        matched_keywords.append(word)
        
        return {
            "prediction": result,
            "key_words": list(set(matched_keywords)),
            "explanation": f"Classified as '{category}' with {result['confidence']:.1f}% confidence based on pattern matching and AI analysis."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/categories")
def get_categories():
    """Get all available categories"""
    if id2label is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {
        "categories": list(id2label.values())
    }

# Health suggestions (same as before)
@app.get("/health-tips")
def get_all_health_tips():
    """Get all health suggestions"""
    health_suggestions = {
        "Food & Dining": {
            "issue": "High spending on dining out",
            "suggestion": "Try home cooking and meal prepping",
            "potential_savings": "₹3,000 - ₹5,000/month"
        },
        "Shopping": {
            "issue": "Frequent online shopping",
            "suggestion": "Wait 24 hours before purchasing",
            "potential_savings": "₹2,000 - ₹4,000/month"
        }
    }
    return health_suggestions

@app.get("/budget-alternatives")
def get_all_budget_alternatives():
    """Get all budget alternatives"""
    budget_alternatives = {
        "Food & Dining": [
            {"current": "Restaurant meals", "alternative": "Home cooking", "savings": "60-70%"}
        ],
        "Shopping": [
            {"current": "Full price", "alternative": "Wait for sales", "savings": "40-60%"}
        ]
    }
    return budget_alternatives

# Run with: python api.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)