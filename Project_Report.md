# Campus Issue Tracker - Project Report

## Project Overview
The Campus Issue Tracker is a web application designed to streamline the reporting and management of various campus-related issues. It provides students with a platform to report problems like Wi-Fi issues, maintenance needs, or library requests, while giving administrators a centralized panel to track and resolve these issues.

## Technical Stack
- **Frontend**: React (Vite), TypeScript, Vanilla CSS (for styling).
- **Backend**: Node.js, Express, TypeScript.
- **Database**: MongoDB (Mongoose ODM).
- **Authentication**: JWT (JSON Web Tokens) with secure bcrypt password hashing.
- **Icons**: Lucide React.

## Core Features Implemented
1. **User Authentication**:
   - Secure registration and login for both Students and Admins.
   - Role-based access control (RBAC) to protect administrative features.
2. **Issue Submission**:
   - Detailed reporting form including Title, Category, Description, Location, and Priority.
   - Support for optional image URLs.
3. **User Dashboard**:
   - Personalized view of all issues reported by the user.
   - Real-time status tracking (Open, In Progress, Resolved).
4. **Admin Panel**:
   - Global view of all campus issues.
   - Ability to update issue status and filter reports.
5. **Search and Filter**:
   - Keyword search across issue titles and descriptions.
   - Filtering by Category and Status.
6. **Responsive Design**:
   - Fully functional and visually appealing on both Desktop and Mobile devices.

## Setup Instructions
### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or a cloud instance)

### Installation
1. Clone the repository.
2. **Backend**:
   - `cd backend`
   - `npm install`
   - Create a `.env` file with `MONGODB_URI` and `JWT_SECRET`.
   - `npm run dev`
3. **Frontend**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Conclusion
The application fulfills all core requirements of the assignment, providing a complete, secure, and user-friendly solution for campus issue management.
