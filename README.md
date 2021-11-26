## Project 4 - CodewordCo

Visit the website here:

## Description
Dive in the world of coding!

### Technology Used

```
- MongoDB
- Express
- React
- React Router
- NodeJS
- Axios
- Styled Components CSS
```

### MVP
- User-facing page: users are able to view the classes offered (no authentication required to view)
- Authenticated login for Admins to add/update/delete classes, as well as view who enrolled
- Authenticated login for Guest users to enroll

Suggested pages:
1.	Nav bar: Home/Classes/About/Sign up/Login
2.	Home page
3.	Classes & Fees
4.	About page
5.  Sign up page: Sign up for new user account
6.	Login Page for: 
a.	Admin: Login page for admin to edit/add/delete/update classes and view/update/delete enrollments if needed
b. Guest user: Login to be able to enroll

### User Stories

There will be 2 main groups of users: Admin and Guest.

Admin users:
They will be able update, delete, create classes and view/delete enrollment

Guest users:
They can browse the website without logging in.
However, only guest users who are logged in can enroll for classes

```
To use the app, user should:

- Select to view the classes from the navbar
- View all the classes at a glance
- Click on a particular class to see specific details about the class
- User can register an account and login to enroll
- CRUD features for Admin users only
- Users can refer to other pages on navbar (Home/About) too

```

---

## Installation instructions for dependencies
npm installation

```
React frontend:
- React router + React-router-dom
- Axios
- Styled Components CSS
```

```
Express backend:
- Express
- Express-sessions
- Mongoose
- Dotenv
- Bcrypt
```