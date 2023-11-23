const {Client} = require('pg') //we are using postgres pg so we have to import postgres packages

const client = new Client({ //settings to login to the server we set up
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "a4"
})

client.on("conect", ()=> { //Given the connect event the following is outputted to the console
    console.log("Database connection established.");
})

client.on("end", ()=>{ //given the end event the following is outputted to the console
    console.log("Database connection ended");
})


module.exports = client; //We export the defintion of client so it can be used in our app.js file.

