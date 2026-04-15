# 🌍 SHAPEthiopia  
### Sustainable Hope for Africa Program Ethiopia

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?lines=Empowering+Communities+in+Ethiopia;Technology+for+Social+Impact;Built+by+Dawit+Mengesha&center=true&width=600&height=50">
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/daveontrack/shapeeeeti?style=for-the-badge" />
  <img src="https://img.shields.io/github/forks/daveontrack/shapeeeeti?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues/daveontrack/shapeeeeti?style=for-the-badge" />
  <img src="https://img.shields.io/github/license/daveontrack/shapeeeeti?style=for-the-badge" />
</p>

---

## 🎨 Project Preview

<p align="center">
  <img src="https://image.thum.io/get/width/1200/crop/700/https://v0-shapethiopia-psi.vercel.app/" />
</p>

---

## ✨ Overview

**SHAPEthiopia** is a modern full-stack humanitarian platform built to empower communities across Ethiopia through scalable, technology-driven solutions.

It connects **donors, volunteers, and organizations** in one unified ecosystem to drive sustainable social impact.

---

## 🎯 Mission

To create lasting impact by supporting:

- 📚 Education access  
- 💧 Clean water initiatives  
- 👩 Women empowerment  
- 🏘 Community development  

---

## 🚀 Core Features

### 👤 User Experience

- 🔐 Secure authentication (Email & Google OAuth)  
- 💳 Multi-channel donation system  
  - Stripe (International)  
  - Telebirr & CBE (Local)  
- 📊 Personalized dashboard  
- 🧾 Donation history tracking  
- 🙋 Volunteer application system  

---

### 🛠 Admin Capabilities

- 📈 Analytics & reporting  
- 💰 Donation approval system  
- 👥 Volunteer management  
- 🔔 Notifications system  
- 🔐 Role-Based Access Control (RBAC)  

---

### 🤖 AI-Powered Features

- 💬 AI chatbot assistant  
- 📉 Donation prediction insights  
- ✍️ Content optimization  

---

## 🧠 Technology Stack

### Frontend
- Next.js (App Router)  
- React.js  
- Tailwind CSS  
- shadcn/ui  

### Backend
- Node.js API Routes  

### Database
- Supabase (PostgreSQL)  

### Integrations
- Stripe (Payments)  
- SendGrid (Emails)  
- OpenAI API  

---

## 🏗 System Architecture

graph TD;
User --> Frontend
Frontend --> Supabase
Frontend --> Stripe
Frontend --> OpenAI


shape-ethiopia/
├── app/
├── components/
├── lib/
├── api/
├── public/
└── styles/


```

⚙️ Getting Started
1. Clone the repository
```
git clone https://github.com/daveontrack/shapeeeeti.git
cd shapeeeeti
```
2. Install dependencies
```
pnpm install
```
3. Setup environment variables
```
.env.local:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
SENDGRID_API_KEY=
OPENAI_API_KEY=

```
4. Run the development server
pnpm dev
```
```
📊 Database Overview
Main tables:

users
donations
volunteer_applications
contacts
newsletter_subscribers


---

# 🔥 Done — this version is:
- ✅ Clean Markdown (no extra wrappers)
- ✅ GitHub-ready
- ✅ Professional + readable
- ✅ No broken sections

---

If you want next upgrade:

👉 **Add animated section dividers + language toggle (EN | አማርኛ)**  
👉 **Add live donation counter badge**

Just say: **“upgrade again”** 🚀
