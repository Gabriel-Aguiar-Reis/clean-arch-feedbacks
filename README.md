<h1 align="center">📝 Clean Arch Feedbacks</h1>

<p align="center">Clean Arch Feedbacks is a Full-Stack NestJS/Next.js repository aimed at developing an anonymous feedback system. The project leverages Clean Architecture, SOLID principles, and Design Patterns to ensure modularity, scalability, and maintainability.</p>

## 📌 Technologies Used

### 🏗 Backend:
![NestJS](https://img.shields.io/badge/NestJS-brightgreen?style=for-the-badge&logo=nestjs&logoColor=EA2858&color=222222)
![TypeORM](https://img.shields.io/badge/typeORM-brightgreen?style=for-the-badge&logo=typeorm&logoColor=EA3B2B&color=222222)

### 🎨 Frontend:
![Next.js](https://img.shields.io/badge/Next.js-brightgreen?style=for-the-badge&logo=nextdotjs&logoColor=EDEEF0&color=222222)
![React](https://img.shields.io/badge/react-brightgreen?style=for-the-badge&logo=react&logoColor=00D8FF&color=222222)
![TailwindCSS](https://img.shields.io/badge/tailwindCSS-brightgreen?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&color=222222)

### 🛠 Database:
![PostgreSQL](https://img.shields.io/badge/postgreSQL-brightgreen?style=for-the-badge&logo=postgresql&logoColor=white&color=172554)
![SQLite](https://img.shields.io/badge/SQLite-brightgreen?style=for-the-badge&logo=sqlite&logoColor=white&color=172554)

### 🔐 Authentication:
- JWT (JSON Web Token)

### 🚀 Architecture:
- Clean Architecture  
- SOLID Principles  
- Design Patterns

## 📂 Basic Project Structure

```bash
backend/
│── src/
│   ├── application/         # Use Cases
│   ├── config/              # App configurations
│   ├── domain/              # Entities and repository interfaces
│   ├── infrastructure/      # Repository implementations and external services
│   ├── presentation/        # Controllers and DTOs
│
frontend/
│── src/
│   ├── app/                 # Next.js routes
│   ├── components/          # Reusable components
│   ├── services/            # API communication
│   ├── styles/              # Styling (Tailwind)
│── .env                     # Enviroment variables
│── .gitignore
│── README.md                # This file! :)
```

## 🚀 How to Run the Project

### 1. Clone the repository:
```bash
git clone https://github.com/gabriel-aguiar-reis/clean-arch-feedbacks.git
```

### 2. Backend Setup:
```bash
cd backend
npm install
npm run start:dev
```

### 3. Frontend Setup:
```bash
cd ../frontend
npm install
npm run dev
```

## 🛠 Ongoing Tasks

- [x] Initial configuration of NestJS and Next.js

- [ ] Implementation of the main entities (User, Feedback)

- [ ] Development of use cases

- [ ] Setup anonymous feedback API

- [ ] Design and implement user interface for submitting feedbacks

## 🤝 Contributing

> #### 1. Fork this repository
>
> #### 2. Create a new branch
>```bash
>git checkout -b feature/your-feature
>```
>
>#### 3. Commit your changes
>```bash
>git commit -am 'Add new feature'
>```
>
>#### 4. Push to the branch
>```bash
>git push origin feature/your-feature
>```
>
>#### 5. Create a new Pull Request

Feel free to open an issue if you find any bugs or have feature suggestions!
