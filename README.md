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
![registerr](https://github.com/user-attachments/assets/f8a73f94-2d51-4595-8248-aeeb09d7f1f1)
---
### 🔐 Login
![register](https://github.com/user-attachments/assets/60eae006-4727-48e1-93c9-83423836719c)
---
### ✔️ User Preferences Settings
![settings](https://github.com/user-attachments/assets/e03fa7af-991b-455a-bcab-0fd6ec77fa69)
---
### 📔 Journal
![journal](https://github.com/user-attachments/assets/934f1c9f-2d0a-41a5-be20-848be2f4c954)
---
### 📍 Timeline
![timeline](https://github.com/user-attachments/assets/368d016e-73fa-4ceb-b454-603bdd4a94f8)
---
### ➕ Record New Dream
![new dream](https://github.com/user-attachments/assets/41fc0072-d44b-4f4f-92ef-d120499c53f7)
---
### ✍️ Personalized Questions
![q](https://github.com/user-attachments/assets/1721349b-5d1d-4fcb-a9fa-e2ab615a162b)
---
### ✨ Dream Screen
![dream](https://github.com/user-attachments/assets/b3f4dd5b-c73a-4586-b2ee-347a407d8246)
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

