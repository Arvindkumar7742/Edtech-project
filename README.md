# StudyNotion — EdTech Platform

**StudyNotion** is a comprehensive EdTech project where students can learn new skills and instructors can share their knowledge by creating and managing online courses.

## Table of Contents

- Overview
- Features
  - Student Features
  - Instructor Features
  - Security Features
- Tech Stack
- Installation
- Running Locally
- Video Walkthrough
- Contribution
- License

## Overview

StudyNotion is a full-stack web application built with **ReactJS** (frontend), **NodeJS** \& **MongoDB** (backend) that supports a robust online learning environment. The platform enables **students** to enroll in, purchase, and learn from courses, while **instructors** can manage and publish their own courses with detailed analytics, all empowered by secure authentication and payment flows.

## Features

### Student Functionality

- **Login / Signup:** Secure account creation and access.
- **Forgot Password:** Reset password via email verification (OTP sent to email).
- **Dashboard:** Personalized student dashboard with user profile, enrolled courses, and progress tracking.
- **Profile Management:** View and update personal details.
- **Course Operations:**
  - View all enrolled courses.
  - Purchase new courses via **Razorpay** with secure payment authentication.
  - Learn directly within the platform from purchased course content.

### Instructor Functionality

- **Login / Signup:** Instructor onboarding with authentication.
- **Dashboard:** View analytics for all created courses (enrollments, performance, etc.).
- **Course Management:**
  - Create new courses with video content, tags, thumbnails, and other metadata.
  - Update, delete, and manage course materials.
  - View all owned courses in one place.

### Security Features

- **Email Verification:** OTP-based verification during signup and password recovery.
- **Secure Password Reset:** Password recovery workflow integrated with email-based OTPs.
- **Payment Security:** Course purchase authenticated via Razorpay’s secure payment gateway.
- **Email Notifications:** Automated emails for verification, forgotten password, and other critical operations.

## Tech Stack

- **Frontend:** ReactJS (Hooks, Router, Context API)
- **Backend:** NodeJS, Express
- **Database:** MongoDB (with Mongoose ODM)
- **Payments:** Razorpay API integration
- **Email:** NodeMailer (for OTP and notifications)
- **Authentication:** JWT-based authentication with secure password storage

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Arvindkumar7742/Edtech-project.git
cd Edtech-project
```

2. **Backend Setup** - Navigate to `/server` - Install dependencies
   `npm install` - Set up `.env` with credentials (MongoDB URI, JWT secret, Razorpay keys, etc.) - Start the backend
   `npm start`
3. **Frontend Setup** - Navigate to `/src` - Install dependencies
   `npm install` - Start the frontend
   `npm run dev`
4. **Access the Platform**
   Open your browser and go to `http://localhost:3000`

## Video Walkthrough

We’ve added a **video demonstration** to showcase key features and user flows, including student and instructor journeys, course creation, secure payment, and authentication.

[Video Walk through](https://drive.google.com/file/d/1Wmn0qfFBAdUJh6Z05YMVzAKGBq3KQnfA/view?usp=sharing)

## Contribution

- Fork the repository
- Create your branch:
  `git checkout -b feature/yourFeature`
- Commit your changes:
  `git commit -m 'Add your feature'`
- Push to the branch:
  `git push origin feature/yourFeature`
- Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

**Note:** All critical workflows (signup, password reset, payment, etc.) use secure, email-based verification and notifications. For queries or issues, please reach out via the issues section.

**Video attached:**
One video has been added to this project to showcase the complete work—including both student and instructor perspectives, security/auth flows, and major features.
