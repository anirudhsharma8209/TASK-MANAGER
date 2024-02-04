const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const TaskModal = require("./Modals/Task");
const EmployeeModal = require("./Modals/Employee");
const PORT = 4500;
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/TaskManager")
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("Got an Error in MongoDB Connection"));

app.get("/alltasks", (request, response) => {
    TaskModal.find({}).then((data) => response.json(data)).catch((error) => console.log(error));    
})

app.post("/createtask", (request, response) => {
    TaskModal.create(request.body)
    .then((data) => response.json(data))
    .catch((error) => response.json(error));        
})

app.delete("/deletetask", (request, response) => {
    console.log(request.query)
    TaskModal.deleteOne({_id : request.query.id }).then((data) => response.json(data) );
})

app.put("/updaterecord", (request, response) => {    
    let updatedObject = JSON.parse(request.query.updateElement); 
    console.log(updatedObject)     
    TaskModal.updateOne({_id : request.query.id}, {description : updatedObject.description, dueDate : updatedObject.dueDate, chooseFile : updatedObject.file, fileSize : updatedObject.fileSize, isFooter : updatedObject.isFooter})    
    .then((data) => response.json(data))
    .catch(error => response.json(error));    
})



app.post("/createemployee", (request, response) => {
    EmployeeModal.create(request.body)
    .then(data => response.json(data))
    .catch(error => response.json(error)) ;
})

app.get("/allemployee", (request, response) => {
    EmployeeModal.find({}).then((data) => response.json(data)).catch((error) => response.json(error));
})

app.listen(PORT, () => {
    console.log("You are connected to the Server : http://localhost:4500");
})