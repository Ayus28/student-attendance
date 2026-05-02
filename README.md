📝 Student Attendance Management System

A modren, role-based web apllication to manage student attendance effciently. Bulit with a focus on clean UI/UX and presistent data management.

🚀 Live Demo

https://github.com/Ayus28/student-attendance

✨ Key Features

- Role-Based Access Comtrol (RBAC): * Professor: Full access to add delete student records.
- Student: view-only access to the attendance dashboard. 
- Automatic Roll Numbering: Dynamic sequential numbering that adjusts automatically when a
  student is added or deleted.
- Data Presistence: Uses LocalStorage to ensure data remains safe even after refreshing the  
  page.
- Secure Session Routing: Prevents unauthorized access and redirects unauthenicated users to
  the login page.
- Fully Responsive Desgin: Optimized for seamless viewing on both mobile devices and 
  desktop.

🛠️ Teck Stack

- Frontend: HTML5, CSS3 (Modern Responsive Layout)
- scripting: Vanilla Javascript (ES6+)
- Storage: web LocalStorage API

🔑 Login Credentials 

For testing purposes, use the following credentails to access diffrent role:

ROLE     | Usernme Selection | Password | Access Level
Professor| Professor(Admin)  | admin123 | Read & Write
Student  | Student(View Only)| studnt123| Read-only

⚙️ Installation & local Setup

### Option 1: Direct Download
1. click on the green **code** button at the top right of this page .
2. Select **Download ZIP** and extract the files on your computer.
3. Open `login.html` directly in any web browser.

#### Option 2: Using Git
1. clone the respository to your local machine:```bash
   git clone [https://github.com/Ayus28/student-attendance]

[bash

cd Student-attendance]

🛡️ Future Enhancements

- [] Export to Excel: Download live attendance reports as a CSV or Excel file. 
- [] Search & Filter: Quickly filter students by name or roll number.
- [] History Logs: View and track attendance history across multiple dates.
- [] Database Integration: Move data from LocalStorage to a real-time database like Firebase.