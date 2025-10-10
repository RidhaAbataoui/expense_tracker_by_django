🧾 Expense Tracker

A simple and powerful Expense Tracker web application built with Django REST Framework for the backend and React + TypeScript + Tailwind CSS for the frontend.
It allows users to add, manage, and visualize their daily expenses efficiently.

🚀 Features

💸 Add, edit, and delete transactions

📊 View expense distribution by category (Pie Chart)

📅 Track transactions by date

🔙 Persistent data stored in a database

🔗 RESTful API with Django REST Framework

🎨 Modern and responsive UI using React + Tailwind CSS

🛠️ Tech Stack

Frontend:

React (TypeScript)

Tailwind CSS

Axios

Recharts (for visual charts)

Backend:

Django

Django REST Framework (DRF)

SQLite (default, can switch to PostgreSQL)

django-cors-headers (for frontend-backend connection)

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/RidhaAbataoui/expense_tracker_by_django.git
cd expense_tracker_by_django

2️⃣ Backend Setup (Django)
cd expense_tracker
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


The backend runs by default on:

http://127.0.0.1:8000/

3️⃣ Frontend Setup (React)
cd frontend
npm install
npm run dev


The frontend runs by default on:

http://localhost:5173/

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/expenses/	List all expenses
POST	/api/expenses/	Create a new expense
GET	/api/expenses/<id>/	Get expense details
PUT	/api/expenses/<id>/	Update an expense
DELETE	/api/expenses/<id>/	Delete an expense
GET	/api/categories/summary/	Get category-wise summary for Pie Chart
📊 Example Chart (Frontend)

The Pie Chart dynamically displays the percentage of spending per category fetched from the backend API.

🧠 Learning Objectives

This project was built to strengthen skills in:

REST API development with Django REST Framework

Frontend-backend integration

State management in React

Data visualization using Recharts

Clean and modular full-stack architecture


💡 Future Improvements

Add authentication (login/register)

Filter transactions by date range

Export data (CSV/PDF)

Dark mode theme

👨‍💻 Author

Ridha Abataoui
🎓 Final-year Computer Science student passionate about mobile and web development
📍 Morocco
