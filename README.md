# MERP

## Overview

This project is an Event Management System built with Django for the backend and React for the frontend. This README will guide you through setting up the development environment for both the backend and frontend.

## Prerequisites

- Python 3.x
- Node.js and npm
- Django
- React

## Backend Setup (Django)

1. **Navigate to the Backend Folder**  
   Open your terminal and navigate to the backend directory:
   ```bash
   cd MERP/back
   ```

3. **Create a Python Virtual Environment**  
   Create a virtual environment to manage your dependencies:
   ```bash
   python -m venv venv
   ```
5. **Activate the Virtual Environment**  
   - On macOS/Linux:
    ```bash
     source venv/bin/activate
     ```
   - On Windows:
    ```bash
     venv\Scripts\activate
     ```

6. **Install Requirements**  
   Install the required Python packages:
   ```bash
   pip install -r requirements.txt
    ```
8. **Make Migrations**  
   Run the following command to create the necessary database migrations:
   ```bash
   ./manage.py makemigrations
    ```
10. **Create a Superuser**  
   Create a superuser account to access the admin panel:
```bash
   ./manage.py createsuperuser
```

12. **Run the Development Server**  
   Start the Django development server:
  ```bash
   ./manage.py runserver
  ```
14. **Access the Admin Panel**  
   Open your web browser and go to http://127.0.0.1:8000/admin to access the admin panel. Use the superuser credentials you created earlier to log in.

## Frontend Setup (React)

1. **Navigate to the Frontend Folder**  
   Open another terminal window and navigate to the frontend directory:
   ```bash
   cd MERP/front
    ```
3. **Install Frontend Dependencies**  
   Install the required Node.js packages:
   ```bash
   npm install
   ```
5. **Run the React Development Server**  
   Start the React development server:
   ```bash
   npm start
    ```
7. **Access the React Application**  
   Open your web browser and go to http://localhost:3000 to view the application.

## Additional Notes

- Ensure that your backend server is running before starting the frontend server.
- You may need to adjust your CORS settings in Django if you encounter cross-origin issues while accessing the API from the React app.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
