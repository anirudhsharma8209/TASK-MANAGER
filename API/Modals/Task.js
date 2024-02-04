const mongoose = require("mongoose");
const express = require("express");

const TaskSchema = mongoose.Schema({
    description : {
        type : String, 
        required : true,        
    },
    dueDate : {
        type : String,
        required : true
    },
    chooseFile : {
        type : String
        // required : true
    },
    fileSize : {
        type : String
        // required : true
    },
    isFooter : {
        type : Boolean,
        required : true
    }
})

module.exports = mongoose.model("TaskCollection", TaskSchema);