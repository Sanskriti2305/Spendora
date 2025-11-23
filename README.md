# 🚀 Spendora – AI-Powered Transaction Categorisation

Spendora is a lightweight, privacy-first system that automatically categorises financial transactions using a fine-tuned **DistilBERT** model and rule-based enhancements. It works on **Excel, CSV, PDFs, and images**, extracting text using OCR and assigning high-confidence categories without any external API calls.

Spendora is designed for financial apps, budgeting tools, enterprise automation, and personal expense tracking.

---

## 🎥 Demo Video  
▶ **Watch the Prototype Demo:**  
https://drive.google.com/file/d/1baXD2VtHY3SM5Vxl-31FXraTSPoWYXr9/view?usp=drive_link

---

## 🛠️ Technology Stack

### **AI & Machine Learning**
- DistilBERT (HuggingFace Transformers)  
- PyTorch  
- scikit-learn  

### **Text Extraction**
- Tesseract OCR  
- OpenCV image preprocessing  

### **Backend / Processing**
- Python  
- Pandas  
- YAML (for taxonomy configuration)  

### **Frontend**
- Streamlit – Interactive UI  
- Matplotlib / Plotly – Optional analytics  

### **Storage**
- Local CSV / Excel  
- JSON-based feedback logs  
- YAML taxonomy  

---
Got it — your project uses a **Node.js frontend** + **Python backend**, not Streamlit.

Here is the **correct, clean, copy-paste-ready Markdown “Run Locally” section** based EXACTLY on your steps:

---

# ⬇️ **COPY FROM HERE — Correct Run Locally (Markdown)**

````markdown
## 🧪 How to Run Spendora Locally

Spendora uses a **Node.js frontend** and a **Python backend API**.  
Follow the steps below to set everything up on your local machine.

---

## 🔧 1️⃣ Clone the Repository
```bash
git clone https://github.com/Sanskriti2305/Spendora
cd Spendora
````

---

## 📦 2️⃣ Install Frontend Dependencies (Node.js)

Make sure Node.js & npm are installed.

```bash
npm install
```

---

## ▶️ 3️⃣ Start the Frontend

Run this in **Terminal 1**:

```bash
npm run dev
```

This starts the UI at:

```
http://localhost:3000
```

---

## 🐍 4️⃣ Start the Backend API (Python)

Open **another terminal (Terminal 2)** in the project folder.

Create a Python environment (optional but recommended):

### Windows:

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux:

```bash
python3 -m venv venv
source venv/bin/activate
```

Run the backend:

```bash
python new-api-backend.py
```

This will start the local API (usually on `http://127.0.0.1:5000` or similar — shown in terminal).

---

## 📤 5️⃣ Upload Your Dataset

Inside the **frontend UI**, upload your:

* CSV
* Excel
* PDF / Image (OCR supported if included)

The backend will process transactions and return:

* Categories
* Confidence scores
* Insights
* Quiz module
* Analytics dashboard

---

## 🧠 6️⃣ Explore Spendora Features

Once your dataset is uploaded, you can:

* Generate **automated transaction categories**
* View **accuracy & insights**
* Run the **quiz module**
* Explore **spending analytics**
* Download processed output

Everything works locally without cloud APIs.

---

## ✔️ Spendora is now fully running on your local device!












