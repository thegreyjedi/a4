Database Setup Instructions:
For the database I am just using the native PostgreSQL 16 app for MacOS

Youtube Link:
https://www.youtube.com/watch?v=3Q3jheVZ7No


1. Open up Postgres and click start to start the postgres server

2. Open up a terminal, type psql to enter psql mode

3. Create the a4 database using "CREATE DATABASE a4;" Make sure to include the semicolon

4. use the command \l to confirm you database has been created.

5. Connect to the database a4 database you just created using \c a4 while in psql mode

6. Insert database schema:

Copy the following sql into the terminal and press enter. The terminal should reply with 'CREATE TABLE' on the next line
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    enrollment_date DATE
);

use \d, \dt, \d students to view the students table

7. Populate database

Copy and paste the following SQL into the terminal and press enter:

INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');

The terminal should reply with "INSERT 0 3", it means that 3 rows have been added

Do a simple 'SELECT * FROM Students' to view the students table's rows.

8. Go back the the PostgreSQL app. Click on server settings, and change the password to 'root' for postgres user.

9. Start up the postgres Server and you should be good to go





Compile and run application:

1.in the terminal where you download the application make sure you have postgres packages installed by typing "npm install pg"

To execute the different functions type "node app.js (functionName) (args)"
You have to type the arguments in the same order as they are described in the function calls.

Example calls:

"node app.js getAllStudents"
"node app.js addStudent matthew ho matthewho@cmail.ca, '2021-09-02'
"node app.js updateStudentEmail 4  ho.matthew@cmail.ca
"node app.js deleteStudent 4"


Error checking
Example: adding a student with existing email
node app.js addStudent John John john.doe@example.com 2023-09-01






Function Explanations:

async function getAllStudents()
-This function takes no parameters and just does a simple 'Select * From students' query on the connected database

async function addStudent(first_name, last_name, email, enrollment_date=null) 
-This function takes 4 arguments, first name, last name, email, and enrollment date. If enrollment date is not given in the call to this function it's default value will be null.
-The function takes these values and attempts to perform an insertion query into the students table using a parameterized query string to prevent SQL injection attacks.

async function updateStudentEmail(student_id, new_email)
-This function takes two arguments, student_id of the student who's email needs to be updated, and new_email.
-This function performs an update on the email attribute where the studentid matches the argument that was used to call this function.

async deleteStudent(student_id)
-This function takes one argument, the student id of the student who is to be deleted from the students table.
-This function performs a delete query on the tuple that has a student_id that matches the called student_id


