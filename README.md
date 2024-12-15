# 🌟 **MBTI Pep Talk API** 🌟

Welcome to the **MBTI Pep Talk API**, an API that generates personalized pep talks based on MBTI types and moods. This API is designed to give you a quick boost of motivation or reassurance tailored to your personality type.

---

## 🚀 **About the Project**
The MBTI Pep Talk API is a simple yet charming API that returns thoughtful, witty, and heartfelt pep talks for each of the 16 MBTI types. Not only does it customize advice for each MBTI type, but it also allows users to select a **mood**—because everyone needs different advice when they’re feeling **sad**, or **angry**.

This is just the beginning! Future versions will include more **emotions**, **customizable advice**, and maybe even **user-generated pep talks**.

---

## 📚 **API Endpoints**
Here's how you can interact with the MBTI Pep Talk API.

| **Endpoint**              | **Method** | **Description**                                              |
|--------------------------|------------|-------------------------------------------------------------|
| `/api/peptalk/:mbti`       | GET        | Get a pep talk for the specified MBTI. Example: `/api/peptalk/INTJ` |
| `/api/peptalk/:mbti?mood=default` | GET | Get a pep talk for the specified MBTI in a **default** mood. Example: `/api/peptalk/INTJ?mood=default` |
| `/api/peptalk/:mbti?mood=sad`     | GET | Get a pep talk for when your MBTI type is feeling **sad**. Example: `/api/peptalk/ENTP?mood=sad`  |
| `/api/peptalk/:mbti?mood=angry`   | GET | Get a pep talk for when your MBTI type is feeling **angry**. Example: `/api/peptalk/INFJ?mood=angry` |

### 📌 **Supported MBTI Types**
The following MBTI types are supported:
- **Analysts**: INTJ, INTP, ENTJ, ENTP
- **Diplomats**: INFJ, INFP, ENFJ, ENFP
- **Sentinels**: ISTJ, ISFJ, ESTJ, ESFJ
- **Explorers**: ISTP, ISFP, ESTP, ESFP

---

## 🛠️ **How to Use It**
You can call the API from any HTTP client like **Postman**, **Insomnia**, or even from your browser’s URL bar. Here's a quick example:

**Example Request:**
```
GET /api/peptalk/INTJ?mood=sad
```

**Example Response:**
```json
{
  "type": "INTJ",
  "mood": "sad",
  "message": "감정이 흐려질 때는, 논리를 다시 확인하는 것이 가장 안전합니다."
}
```
---

## 🛠️ **Setup Instructions**

### **1️⃣ Prerequisites**
- **Node.js** (v18+ recommended)
- **npm** (comes with Node.js)

### **2️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/mbti-pep-talk-api.git
cd mbti-pep-talk-api
```

### **3️⃣ Install Dependencies**
```bash
npm install
```

### **4️⃣ Start the Server**
```bash
npm start
```
You’ll see:
```
Server is running on port 3000
```
The API will be available at: `http://localhost:3000/`

---

## 🦄 **How It Works**
When you make a request to the API, it selects a **random pep talk** from a collection of personalized advice specific to your MBTI type. The mood (**default**, **sad**, or **angry**) determines which pool of advice is used to generate the response.

**Example for INTJ (sad mood):**
- *"감정이 흐려질 때는, 논리를 다시 확인하는 것이 가장 안전합니다."*

**Example for ENFP (angry mood):**
- *"아니, 누가 우리 ENFP 화나게 했어? 나한테 말해봐."*

Each type has its own unique flavor of pep talks. For logical types like **INTJ**, expect "Sheldon Cooper"-style brutal honesty. For emotional types like **ENFP**, expect more comforting words and "bestie energy."

---

## 🎨 **Customization**
Want to add your own pep talks or customize the API? You can! Here’s how:
1. Open `server.js`
2. Locate the **mbtiPepTalks** object and add your pep talks under each MBTI type.
3. Moods are categorized as `default`, `sad`, and `angry`.
---

## 🌐 **Deployment**
This project is deployed on **Netlify** and runs as a serverless API. To deploy it yourself:

1. **Install the Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Link Your Project**:
```bash
netlify link
```

3. **Deploy to Netlify**:
```bash
netlify deploy --prod
```

Your API will be available at a URL like `https://your-netlify-site.netlify.app/`

---

## 🚀 **Future Plans**
- 🆕 **More Moods** (Anxious, Motivated, Relaxed, etc.)
- 🎨 **More Personalization** (User-generated pep talks, Custom MBTI input)

---

## ❤️ **Contributing**
Got ideas for new pep talks? Want to improve the design? We’d love your help! Here’s how you can contribute:

1. Fork the repo and clone it locally.
2. Create a new branch: `git checkout -b my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-feature`
5. Submit a pull request.

---

## 🪲 **Bugs and Issues**
If you encounter any issues, please create a [GitHub issue](https://github.com/jiwon-lieb/mbti_peptalk/issues) so we can track and resolve it.

---

## 📜 **License**
This project is open-source and available under the **MIT License**.

---

## 💌 **Contact**
Have questions or feedback? Feel free to reach out via [email](mailto:contact@jiwonkwak.co).

**Enjoy your personalized pep talks! Stay fabulous! ✨**

