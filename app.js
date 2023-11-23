const client = require('./databasePG'); //importts the definition of client from databasePG.js

client.connect(); //connets 

async function getAllStudents() {
    try { //attempt query the server a select statement
        const res = await client.query('SELECT * FROM students'); //sends a query to the server and waits for the repsonse to come back before proceeding further
        console.log(res.rows); //outputs the rows of the students table if the request is successful
    } catch (err) { //If there is some type of error that occurs during the query, 
        console.log(err);
    } finally {
        await client.end(); //closes the connection with the postgres server
    }
}

async function addStudent(first_name, last_name, email, enrollment_date=null){ //takes 4 parameters first_name, last_name, email, and enrollment date. If enrollment is not given it will be defaulted to null.
    try{
        const query = 'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4)'; //Query statement with parameterized values to prevent sql injection
        const values = [first_name, last_name, email, enrollment_date]; //array containing the attributes to be added to the table
        await client.query(query, values); //sends a query request with the query statement with its parameterized values swapped with the values in the values array
        console.log('Student added successfully');
    }
    catch (err){ //logs error if it occcurs
        console.log(err);
    }
    finally{
        await client.end(); //closes connection with server
    }
}
    
async function updateStudentEmail(student_id, new_email) { //takes 2 parameters student id and new email
    try {
        const query = 'UPDATE students SET email = $1 WHERE student_id = $2'; //query statement to update the email attribute with the value of new_email where student_id=student_id 
        const values = [new_email, student_id];
        await client.query(query, values);
        console.log('Student email updated successfully');
    } catch (err) { //catches and logs errors if they occur
        console.log(err);
    } finally {
        await client.end();
    }
}    

async function deleteStudent(student_id){
    try{
        const query = 'DELETE FROM students WHERE student_id = $1'; //query statement with parameterized values
        const values = [student_id];
        await client.query(query, values); //sends a query request to the postgres server to delete the student that matches student_id
        console.log(`Student with id=${values} has been deleted`);
    } catch (err) {
        console.log(err);
    } finally {
        await client.end();
    }
    
}

// Check command line arguments
const args = process.argv.slice(2); //removes the first 2 arguments in initial command to run this file "node app.js (functionName) (args)" becomes "(functionName) (args1) (args2) ..."
if (args[0] === 'getAllStudents') { //Match the functionName to the functions 
    getAllStudents();
} else if (args[0] === 'addStudent') {
    //check if enough parameters
    if (args.length <4){ //The addStudent function requires 4 arguments in total, so if the function is called with less than that we can not proceed with calling it.
        console.log("Not enough arguments");
        client.end()
    }else if (args.length==4){
        addStudent(args[1],args[2],args[3],args[4]); //call the addStudent function with given arguments 
    }else{
        addStudent(args[1],args[2],args[3],args[4],args[5]);
    }
} else if (args[0] ==="updateStudentEmail"){
    if(args.length < 3){
        console.log("not enough arguments");
        client.end()
    }else{
        updateStudentEmail(args[1],args[2]);
    }
}else if (args[0]==="deleteStudent"){
    if (args.length < 1){
        console.log("not enough arguments");
        client.end()
    }else{
        deleteStudent(args[1]);
    }
}else{ //if no matching command is found.
    console.log("Command not found");
    client.end()
}