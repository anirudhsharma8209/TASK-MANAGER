import React, { Fragment, useEffect, useState } from 'react'
import Employee from './Employee'
import { FaFileMedical } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5"
import { MdFileDownload } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import { motion } from "framer-motion"
import { useRef } from 'react';
import axios from 'axios';
import TaskAssign from './TaskAssign';
const Card = ({ refrence, fileSize, isEmployee, isAssign, isInsertReload }) => {    
    const [getAllTask, setAllTask] = useState(null);
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [file, setFile] = useState("");
    const [fileSizeKB, setFileSizeKB] = useState(0);
    const [clicked, setClicked] = useState(false);    


    const [trash, setTrash] = useState(false);
    useEffect(() => {            
        axios.get("http://localhost:4500/alltasks").then((data) => setAllTask(data.data)).catch((error) => console.log(error));
    }, [clicked, trash, isInsertReload]);    
    const textArea = useRef();
    const spanError = useRef();
    const [updateElement, setUpdateElement] = useState("");
    const updateNow = (update) => {        
        
        setDescription(update.description);
        setDueDate(update.dueDate);        
        setFile(update.chooseFile);
        update.charCount = update.description.length;                
        setUpdateElement(update);
        setClicked(true);
        setShowTaskModal(false)
    }
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [filePath, setFilePath] = useState("");
    const [taskShow, setTaskShow] = useState("");
    const showTaskDetail = (taskDetail) => {
        setTaskShow(taskDetail);        
        setClicked(true)
        setShowTaskModal(true);        
    }

    const updateObject = (event) => {
        console.log(event);
        updateElement.charCount = event ;
    }

    const getFileSize = () => {
            let file = document.getElementById('file');
            console.log(file);
            var data = 0;
            if(file.files.length > 0){
                for(let i = 0; i < file.files.length; i++){
                    const fSize = file.files.item(i).size;
                    data = Math.round((fSize / 1024)) + "kb"
                }        
            }    
            // console.log(data);
            setFileSizeKB(data);
    }

    const updateRecord = (elementId) => {
        let updatedObject = {
            description : description, 
            dueDate : dueDate,
            file : file,
            fileSize : fileSizeKB,
            isFooter : fileSizeKB == undefined || fileSizeKB == 0  ? false : true
        }                
        console.log(fileSizeKB);
        console.log(updateObject.fileSize); 
        setTrash(!trash);
        updatedObject = JSON.stringify(updatedObject);
        axios.put(`http://localhost:4500/updaterecord?id=${elementId}&updateElement=${updatedObject}`).then((data) => {console.log(data)}).catch((error) => console.log(error)) ;
        setClicked(false);
    }   

    const deleteTask = (elementId) => {        
        axios.delete(`http://localhost:4500/deletetask?id=${elementId}`).then((data) => console.log(data)).catch((error) => console.log(error));        
        setTrash(!trash);
    }
    return (
        (isEmployee)
        ?
            <Employee />
        :   (isAssign)
                ?   <TaskAssign />
                :   <Fragment>        
                    {
                        (getAllTask != null) &&
                        getAllTask.map((element, index) => (
                            <motion.div key={index} drag dragConstraints={refrence} className="card mt-5 w-60 overflow-hidden cursor-pointer h-72 rounded-3xl text-white bg-slate-900 ">
                                <div className="top flex justify-between w-56 items-center">
                                    <p className='mt-5 border m-4 rounded-full w-7 h-7 flex justify-center items-center bg-slate-50' onClick={() => {deleteTask(element._id)}}>
                                        <FaTrash className="text-slate-800"  />
                                    </p>
                                    <p>
                                        {element.dueDate}
                                    </p>
                                </div>
                                <div className="details mt-4 w-full">
                                    <div className="description mt-4 p-4">
                                        <p className='text-white h-16 mt-2'>{element.description}</p>
                                    </div>
                                    <div className="size_detail p-3  flex justify-between items-center">                                
                                        <p className=''>{(element.chooseFile == '') ? 0+"kb" : element.fileSize}</p>
                                        {
                                            element.isFooter
                                                ?
                                                <p className='w-7 h-7 flex border bg-slate-50 justify-center items-center rounded-full'>
                                                    <MdFileDownload className="text-slate-800 text-lg" />
                                                </p>
                                                :
                                                <p className='w-7 h-7 flex border bg-slate-50 text-lg justify-center items-center rounded-full'>
                                                    <MdFileUpload className="text-slate-800" />
                                                </p>
                                        }
                                    </div>
                                    {element.isFooter
                                        ?
                                        <div onClick={() => {showTaskDetail(element)}} className="footer bg-blue-400 flex justify-center items-center h-14 w-[100%]">
                                            Show Attachement
                                        </div>
                                        :
                                        <div onClick={() => {updateNow(element)}} className="footer bg-green-400 flex justify-center items-center h-14 w-[100%]">
                                            Uplode Now
                                        </div>
                                    }
                                </div>
                            </motion.div>                    
                        ))
                    }          
                    {               
                        (showTaskModal != true) 
                        ?
                            <div className="flex justify-center items-center h-screen">
                            <div x-data={`{ open: ${clicked} }`}>                                            
                                <div x-show="open" className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
                                <div x-show="open" x-transition:enter="transition-opacity ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition-opacity ease-in duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>                
                                <div x-show="open" x-transition:enter="transition-transform ease-out duration-300" x-transition:enter-start="transform scale-75" x-transition:enter-end="transform scale-100" x-transition:leave="transition-transform ease-in duration-300" x-transition:leave-start="transform scale-100" x-transition:leave-end="transform scale-75" className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">                    
                                    <div className="bg-green-500 text-white px-4 py-2 flex justify-between">
                                        <h2 className="text-lg font-semibold">Update Your Task</h2>
                                        <button x-on:click="open = false" className="px-3 py-1 bg-slate-800 text-white  rounded-md w-full sm:w-auto" onClick={() => setClicked(false)}> <IoClose /> </button>
                                    </div>
                                    <form>                    
                                    <div className="p-4">
                                            <div className="container_wrapper grid grid-col-4">
                                                <div>                                
                                                    <label htmlFor="desc">Description : </label>
                                                    <textarea ref={textArea} id="message" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" value={description} onChange={(event) => {updateObject(description.length); setDescription(event.target.value)}} name="description" placeholder="Provide description....."></textarea>
                                                    <div className="container flex justify-end" ref={spanError}>                                            
                                                    {updateElement.charCount}/1000
                                                    </div>
                                                </div>
                                                <div className="flex mt-3 justify-between items-center">
                                                    <div className=''>
                                                        <label htmlFor="" className='text-center'>Date : </label>
                                                        <input type="date" name="currentdate" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className='border border-slate-300 rounded p-3 block w-40' id="" />
                                                    </div>
                                                    <div className="">
                                                        <label htmlFor="">File : </label>
                                                        <input type="file" id="file" value={file} onChange={(e) => {setFile(e.target.value); getFileSize()}} name="chooseFile" className='border border-slate-300 rounded p-2.5 block w-56' />
                                                    </div>
                                                </div>
                                            </div>                        
                                    </div>                    
                                        <div className="border-t px-4 py-2 flex justify-end ">
                                            <button type='button' className='btn bg-green-500 p-2 text-white mt-3 w-40 rounded text-3md font-semibold' onClick={() => {updateRecord(updateElement._id)}}>Update Task</button>                                                          
                                        </div>
                                    </form>                        
                                </div>
                                </div>
                            </div>
                            </div>
                        : 
                        <div className="flex justify-center items-center h-screen">
                        <div x-data={`{ open: ${clicked} }`}>                                            
                            <div x-show="open" className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
                            <div x-show="open" x-transition:enter="transition-opacity ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition-opacity ease-in duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>                
                            <div x-show="open" x-transition:enter="transition-transform ease-out duration-300" x-transition:enter-start="transform scale-75" x-transition:enter-end="transform scale-100" x-transition:leave="transition-transform ease-in duration-300" x-transition:leave-start="transform scale-100" x-transition:leave-end="transform scale-75" className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">                    
                                <div className="bg-indigo-500 text-white px-4 py-2 flex justify-between">
                                    <h2 className="text-lg font-semibold">Task Details</h2>
                                    <button x-on:click="open = false" className="px-3 py-1 bg-slate-800 text-white  rounded-md w-full sm:w-auto" onClick={() => setClicked(false)}> <IoClose /> </button>
                                </div>    
                                <div className="container  h-72 w-72">
                                    <div className="card text-white bg-slate-800 h-full w-[100vw]">
                                        <div className="container  w-96 ml-10 grid gap-3 p-3">
                                            Task : {taskShow.description}
                                        </div>
                                        <div className="container flex justify-between ml-16 items-center w-80 p-3 h-20">
                                            <span>
                                                Due Date : {taskShow.dueDate}
                                            </span>
                                            <span>
                                                File Size : {taskShow.fileSize}
                                            </span>
                                        </div>
                                        <div className="container p-2 h-full w-full">
                                            <label htmlFor="">Attachement  : </label>                                    
                                            {                                                                                
                                                // setFilePath(taskShow.chooseFile.slice(taskShow.chooseFile.indexOf('h') + 1))
                                                taskShow.chooseFile.slice(taskShow.chooseFile.indexOf('h') + 1)
                                            }                                    
                                        </div>
                                    </div>
                                </div>                    
                            </div>
                            </div>
                        </div>
                        </div>               
                    }
                </Fragment>
    )
}

export default Card