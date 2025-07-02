# Dream Decoder 🌙

Welcome to **Dream Decoder**, a smart AI-powered dream journaling and interpretation app!  
This project helps users **record**, **visualize**, and **understand** their dreams using modern technologies like GPT, DALL·E, Firebase, and semantic search.

---

## 🚀 Running the Application

This project consists of two main parts:
- **Server** – Node.js backend for API, dream processing, and Firebase integration
- **Client** – React Native app (using Expo) for user interaction

1. Clone this repository to your local machine 💻
2. To run the server, navigate to the `server` folder, run `npm install`, and then start the server using `node server.js` ▶️  
4. Ensure you have a `.env` file in the `server` folder with your Firebase and OpenAI credentials  
5. To run the client, navigate to the `DreamApp` folder, run `npm install`, and then start the app using `npx expo start` 📱  
6. Make sure Firebase Authentication, Firestore, and Storage are properly configured  
7. Keep both the server and client running in parallel for the app to function correctly

---

## 🧠 About the App

Dream Decoder is a mobile app that allows users to:

- Record dreams via **voice** or **text**
- Get **clarifying questions** if the input is unclear
- Generate **AI-based scenes** using DALL·E
- Receive **symbolic interpretation** using GPT
- Explore **similar dreams** using embedding-based KNN
- Browse, filter, and search past dreams
- Customize interpretation style

---

## ✨ Features

- ### 📝 Register & Login
Secure login and signup using Firebase Authentication.  
Users can choose their preferred dream interpretation style.

- ### 🎙️ Record Dreams
Users can record their dream via voice (Speech-to-Text) or type it manually.  
If unclear references are detected (e.g., “Dana”), the app will ask follow-up questions.

- ### 🖼️ Visual Dream Scenes
Dreams are split into visual scenes using GPT, then converted to images using DALL·E.  
Each scene includes symbolic tags and descriptions.

- ### 📚 Dream Journal
View your dreams in a **gallery** or **timeline** view.  
Each dream card shows a thumbnail and interpretation summary.

- ### 🔍 Search & Filter
Search dreams using keywords or tags.  
Filtering by date, mood, or symbol is supported.

- ### 🤝 Similar Dreams (KNN)
The app recommends semantically related dreams using OpenAI Embeddings and cosine similarity.

- ### 🔐 Secure Storage
All data is securely stored in Firestore and Firebase Storage.

---

## 🧪 Testing (Jest)

Tests are implemented using the **Jest** framework. Examples:

- **Authentication**  
  - Token validation  
  - Error handling for missing or invalid tokens

- **Dream Submission**  
  - Voice/text submission  
  - Clarification logic  

- **Visualization & Interpretation**  
  - GPT-based scene extraction  
  - Symbol tagging

- **Dream Recommendation**  
  - Embedding generation  
  - Cosine similarity + filtering

---

## 🖼️ Screenshots

### 📝 Register
![תמונה של WhatsApp_ 2025-06-22 בשעה 23 03 21_e586ecaf](https://github.com/user-attachments/assets/187b89a2-70d6-4983-8b2f-e3dfc28c31f5)

<img src="https://github.com/user-attachments/assets/187b89a2-70d6-4983-8b2f-e3dfc28c31f5" width="232" height="500">


---

### 🔐 Login
![תמונה של WhatsApp_ 2025-06-22 בשעה 23 03 21_e586ecaf (4)](https://github.com/user-attachments/assets/fafc2f98-9576-431a-8792-7843e5f1ee32)
---
### ✔️ User Preferences Settings
![תמונה של WhatsApp_ 2025-06-22 בשעה 23 03 21_e586ecaf (3)](https://github.com/user-attachments/assets/90f15b4c-3700-4aa2-8e29-44e3ff4b65be)
---
### 📔 Journal
![תמונה של WhatsApp_ 2025-06-22 בשעה 23 03 21_e586ecaf (5)](https://github.com/user-attachments/assets/bf680d63-ddd2-4d78-a650-b14c995c1734)
---
### 📍 Timeline
![תמונה של WhatsApp_ 2025-06-22 בשעה 23 03 21_e586ecaf (2)](https://github.com/user-attachments/assets/4330f40f-aa13-4085-bb0f-de4697854f09)
---
### ➕ Record New Dream
![תמונה של WhatsApp_ 2025-06-22 בשעה 23 03 21_e586ecaf (1)](https://github.com/user-attachments/assets/ec6e8533-c5a8-4b38-9ec2-439a64ad683e)
---
### ✍️ Personalized Questions
![תמונה של WhatsApp_ 2025-06-22 בשעה 23 05 04_ffa81eed](https://github.com/user-attachments/assets/5124b7f2-9ecf-4ff2-9161-bcfe7f2e6025)
---
### ✨ Dream Screen
![תמונה של WhatsApp_ 2025-06-22 בשעה 23 03 21_e586ecaf (6)](https://github.com/user-attachments/assets/ba8464a8-4556-487d-b76a-387b4d362b3b)

---

## 🧱 Tech Stack

| Component        | Tech                     |
|------------------|--------------------------|
| **Frontend**     | React Native (Expo)      |
| **Backend**      | Node.js + Express        |
| **Database**     | Firebase Firestore       |
| **Auth**         | Firebase Authentication  |
| **Storage**      | Firebase Storage         |
| **AI Services**  | OpenAI GPT, DALL·E, Whisper |
| **Similarity**   | Embeddings + KNN  |
| **Testing**      | Jest                     |

---

