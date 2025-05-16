# 👥 Agent Assignment System – MERN Stack Internship Project

A complete agent management system built using the MERN stack. This project allows admins to register agents, upload leads via CSV/XLSX, auto-distribute or manually assign tasks, and manage agent approvals. Agents have their own dashboards to view assigned leads.

---

## 🚀 Features

- 🔐 Admin & Agent Login (JWT-based)
- 🧾 CSV/XLSX File Upload
- ⚙️ Auto Distribution of leads among agents
- ✋ Manual Assignment option
- 👮 Admin Approval Flow for new agents
- 📊 Dashboards for both roles
- 📎 File validations, error handling, responsive UI

---

## 🧱 Tech Stack

| Layer     | Technology          |
|-----------|---------------------|
| Frontend  | React, Tailwind CSS |
| Backend   | Node.js, Express.js |
| Database  | MongoDB (Mongoose)  |
| Auth      | JWT (jsonwebtoken)  |
| Upload    | Multer + xlsx       |

---

## 📁 Project Structure

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/Agent-Assignment.git
cd Agent-Assignment

Backend Setup

cd backend
cp .env.example .env    # Add your Mongo URI and JWT secret
npm install
npm start

Frontend Setup
Open a second terminal:
cd ..
npm install             # Install frontend packages
npm start

🔄 Project Flow (Step-by-Step)

🧑‍💼 Admin Flow

Admin Registers / Logs In
Secure authentication using JWT
Redirected to Admin Dashboard
Admin Adds Agents
Enters agent details: name, email, phone, password
Agent is added with isApproved = false
Admin Approves Agents
Pending agents are listed in the "Pending Approval" section
Admin clicks "Approve" to allow login access

Admin Uploads Lead File

Accepts .csv, .xlsx, or .xls with FirstName, Phone, Notes
Backend parses and validates the file
Lead Distribution
System auto-distributes leads evenly across 5 approved agents
Unassigned leads can also be manually assigned by admin

🧑 Agent Flow

Agent Registers
Submits personal details and selects role as "Agent"
Sees success message: “Please wait for admin approval before logging in”
Agent Logs In (after approval)
JWT authentication
Redirected to Agent Dashboard

Agent Dashboard

Sees only their assigned leads
Table displays: FirstName, Phone, Notes
Lead count is shown at the top
Option to logout

💡 Admin Dashboard Highlights
Add Agent form
CSV Upload panel
Pending Agents table
Manual Assignment table
Clean layout using Tailwind CSS
