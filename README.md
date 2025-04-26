DriveLearn

A smart AI Tutor that helps students ask questions via text or voice and get instant AI-generated answers.
Supports CBSE, ICSE, and State Board students.


---

Features

Text and voice-based question input

Board selection at signup

AI-generated answers (DeepSeek model via OpenRouter API)

Answer history stored in PostgreSQL

Secure authentication (JWT)

Simple logout functionality


---

Tech Stack

Frontend: Next.js 14, Tailwind CSS

Backend: Next.js API Routes

Database: PostgreSQL

AI Model: DeepSeek via OpenRouter

Authentication: JWT


---

Setup Instructions

1. Clone the repository

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name


2. Install dependencies

npm install


3. Create .env.local

PG_USER=your_db_user
PG_HOST=your_db_host
PG_DATABASE=your_db_name
PG_PASSWORD=your_db_password
PG_PORT=your_db_port

DEEPSEEK_API_KEY=your_openrouter_api_key


4. Run the development server

npm run dev

---

License

Open for educational and non-commercial use.