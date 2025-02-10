# Clinikk TV Backend Service - Proof of Concept (POC)

## 📌 Overview

This project is a **Proof of Concept (POC) Backend Service** for **Clinikk TV**, a feature that provides users with health-related media content (videos & audio). The backend handles user authentication, media management, and user interactions such as likes, comments, and content display.

## 🚀 Features

- **User Authentication:** Sign-up, Login, and JWT-based authentication middleware.
- **Media Management:** Upload, store, and retrieve video/audio content.
- **Cloud Storage:** Uploading media files to Cloudinary.
- **Content Display:** Fetch media for single and multiple users.
- **Like/Unlike Functionality:** Users can like/unlike media content.
- **Content Deletion:** Secure deletion of media content by authorized users.

## 🏗 Tech Stack

- **Backend:** Node.js (Express.js)
- **Database:** MongoDB 
- **Authentication:** JWT (JSON Web Token)
- **Cloud Storage:** Cloudinary (for media storage)
- **API Documentation:** Postman
- **Middleware:** Express Middleware for authentication & authorization

## 🔧 Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= v14)
- **MongoDB** 
- **Cloudinary** (for media uploads)
- **Postman** (for API testing) or any online API testing Platforms..

### Steps to Run Locally

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/clinikk-tv-backend.git](https://github.com/sivasaidwarapureddy/clinikkassignment

   cd api
2. Install dependencies
     ```sh
      npm install
3. Set up environment variables (.env)
   Create a .env file and add
   ```sh
   PORT=3001
   JWT_SECRET='yourSecretKey'
   MONGO_URI='yourmongodburl'

