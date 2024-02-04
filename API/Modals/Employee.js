const mongooge = require("mongoose");

const EmployeeSchema = mongooge.Schema({   
    employee_name : {
        type : String,
        required : true
    },
    employee_address : {
        type : String,
        required : true
    },  
    employee_designation : {
        type : String,
        required : true,
        enum : ["Manager", "Clerk", "CEO", "Sales"]
    },
    employee_gender:{
        type : String,
        required : true,
        enum : ["Male","Female"]
    },
    employee_salary : {
        type : Number,
        required : true
    }
});

module.exports = mongooge.model("employeeCollection", EmployeeSchema);