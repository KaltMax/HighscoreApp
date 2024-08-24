
# HighscoreApp

A web application with user login/registration and a highscore management system for an imaginary game, built using Angular, Docker, and MongoDB.

## Project Description

The development of a web-based highscore list application (Single-Page Application). This application includes a login and registration mechanism as well as viewing a highscore list for a fictional game. Only logged-in users should have the authorization to access the highscore list. The application is divided into frontend, backend, and a database.

## Technologies Used

### Frontend:
- **Angular:**
  - Framework for creating the Single-Page Application.
  - Creation of the web page using Angular Components (Login, Registration, Highscores)
- **Angular Material:**
  - Library for user-friendly and visually appealing UI components.
  - Use of forms, navigation menus, cards, icons, etc.

### Backend:
- **Node.js:**
  - Platform for developing the web application.
- **Express.js:**
  - Web framework for Node.js to develop the backend of the web application.

### Database:
- **MongoDB:**
  - NoSQL database for storing the highscore list and user data.

## Components

### 1. Login Component:
**Frontend:**
- Form input for email and password.
- Validation of input data (valid email format, passwords at least 8 characters long).
- Communication with the backend for authentication.

**Backend:**
- Endpoint to accept login data and authenticate the user.
- Token generation for session handling.

### 2. Register Component:
**Frontend:**
- Form for entering email, password, company, street, city, and postal code.
- Validation of input data (valid email format, passwords are at least 8 characters long, password validation by re-entering and comparing the entries, company is preset as "FH Technikum Wien" and cannot be changed, email and password are mandatory fields).
- Communication with the backend for user registration.

**Backend:**
- Endpoint to accept registration data.
- Checking the input data (is a user with the provided email address already present).
- Storing user data in the MongoDB database.

### 3. Highscore Component:
**Frontend:**
- Table to display the highscores (only visible to logged-in users).

**Backend:**
- Endpoint to query highscore data (only for authenticated requests).
- Storage and management of highscore data in the MongoDB database.

## Development Process

### 1. Initial Setup:
- Setting up the Angular project and installing Angular Material.

### 2. Frontend Development:
- Creating the Login and Register components with Angular.
- Creating a navigation menu (/login, /register, /highscores).
- Implementing the Highscore component and integrating it with the backend.

### 3. Backend Development:
- Setting up the Node.js server with Express.js.
- Configuring the MongoDB database and connecting via Mongoose with Express.js.
- Implementing the authentication and registration logic with Express.js.
- Implementing the Highscore API endpoints.
- Ensuring communication between the Angular frontend and the Express backend.

### 4. Testing the Application:
- Checking the functionality of the application.

## Communication Flow and Resource Management

### Frontend-Backend Communication
- Use of HTTP Requests (GET, POST):
  - **Login:** POST request to send email and password to the backend for authentication.
  - **Registration:** POST request to send registration data to the backend to create a new user.
  - **Highscores:** GET request to retrieve highscore data, only for authenticated users.

### Tokens for Authentication and Session Management:
- Upon successful login, an authentication token is generated and sent back to the client.
- This token is sent in the HTTP header for subsequent requests to protected endpoints.
- The backend validates the token to ensure the request is from an authenticated user.

### Resource Management
- Storage in MongoDB:
  - **User data:** Storage of email, password, company, street, city, and postal code.
  - **Highscores:** Storage of user highscores with references to the users.

### Validation of User Inputs:
- **Frontend (Angular Forms):** Validation of email format, password length, password repetition, and fixed company name.
- **Backend:** Additional data validation and check if the email address already exists, as well as token validation when querying highscores.

## Description of Processes

### Login:
User -> Browser : Open Login Page  
Browser -> Server : Send Login Request (Email, Password)  
Server -> Database: Validate Credentials  
Database -> Server : Return User Data/Token  
Server -> Browser : Send Auth Token  
Browser -> User : Display Success/Error Message

### Registration:
User -> Browser : Open Registration Page  
Browser -> Server : Send Registration Data (Email, Password, Company, Street, City, Postal Code)  
Server -> Database : Check if Email Already Exists  
Database -> Server : Return Existence Status  
Server -> Database : Save New User Data (if email does not exist)  
Database -> Server : Return Confirmation  
Server -> Browser : Send Registration Confirmation  
Browser -> User : Display Success/Error Message

### Highscores:
User -> Browser : Request Highscore Page  
Browser -> Server : Send Highscore Request (with Auth Token)  
Server -> Database : Validate Auth Token  
Database -> Server : Return Validation Status  
Server -> Database : Fetch Highscore Data (if token is valid)  
Database -> Server : Return Highscore Data  
Server -> Browser : Send Highscore Data  
Browser -> User : Display Highscore List
