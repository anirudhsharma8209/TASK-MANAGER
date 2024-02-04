import React, { Fragment, useEffect, useRef, useState } from 'react'
import Card from './Card'
import { IoClose } from "react-icons/io5"
import axios from 'axios';
const Foreground = () => {
    const refrence = useRef();
    const textArea = useRef();
    const spanError = useRef();
    const fileTag = useRef();
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [chooseFile, setChooseFile] = useState("");
    const [fileExist, setFileExist] = useState(false);
    const [fileSizeValue, setFileSizeValue] = useState(0);
    const [isEmployee, setIsEmployee ] = useState(false);
    const [isAssign, setIsAssign] = useState(false);

    const [charCounter, setCharCounter] = useState(0);    

    const setErrorFormat = (removedText) => {
        let textAreaVal = textArea.current.value
        let removedFromIndex = textAreaVal.lastIndexOf(removedText);        
        setDescription(textAreaVal.slice(0,removedFromIndex));
        textArea.current.setAttribute('style','border: 5px solid red;')
        spanError.current.setAttribute("style", "color: red");
    }

    const textAreaCharCal = (event) => {    
        setDescription(event.target.value);     
        window.addEventListener(('keyup'), (event) => {            
            let textAreaVal = textArea.current.value;
            if(event.key == "Backspace"){                
                setCharCounter(charCounter - 1);
            }else{                
                (textAreaVal != '') 
                    ? 
                        (textAreaVal.length <= 1000)
                            ? setCharCounter(textAreaVal.length) 
                            : setErrorFormat(event.key)
                    : setCharCounter(0);
            }
        })             
    }

    const [isInsertReload, setIsInsertReload] = useState(false);

    const submitTask = (event) => {
        event.preventDefault();               
        let data;
        console.log(chooseFile);
        console.log(fileTag.current.files.length);        
        for(let i = 0; i < fileTag.current.files.length; i++){
            const fSize = fileTag.current.files.item(i).size;            
            data = Math.round((fSize / 1024)) + "kb"            
        }
        setFileSizeValue(data);            
        setFileExist(true);                                      
        let fileSize = data;    
        let isFooter = null;          
        
        (fileSize != undefined)
            ? isFooter = true        
            : isFooter = false;         
        
            
        axios.post("http://localhost:4500/createtask", {description, dueDate, chooseFile, fileSize, isFooter})
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
        setIsInsertReload(true);
        setDescription(""); setDueDate(""); setChooseFile("");
        setClicked(false);
    }

    const [clicked, setClicked] = useState(false);
    return (
        <Fragment>              
            <div ref={refrence} className='relative container  border-slate-50  cursor-text h-[100vh] p-5 flex gap-5'>
                <div className="container w-[110vw] gap-3 h-[100%] p-2 relative flex flex-wrap">
                    <Card refrence={refrence} fileSize={fileSizeValue} isEmployee={isEmployee} isAssign={isAssign} isInsertReload={isInsertReload} />    
                </div>
                    <div className="button_div block w-52 h-52">                    
                        <button x-on:click="open = true" className="px-4 py-2 w-52 bg-green-500 text-white rounded-md" onClick={() => {setClicked(true); setIsEmployee(false); setIsAssign(false)}}> Add Task </button>   
                        <button type='button' className=' bg-indigo-400 p-2 w-52 text-white mt-3 rounded text-3md font-semibold' onClick={() => {setIsEmployee(true); setIsAssign(false)}}>Add Employee</button>                                       
                        <button type='button' className= ' bg-rose-400 p-2 w-52 text-white mt-3 rounded text-3md font-semibold' onClick={() => {setIsAssign(true); setIsEmployee(false)}}>Assign Task</button>                                       
                    </div>                
            </div>
            <div className="flex justify-center items-center h-screen">
            <div x-data={`{ open: ${clicked} }`}>                                            
                <div x-show="open" className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
                <div x-show="open" x-transition:enter="transition-opacity ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition-opacity ease-in duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>                
                <div x-show="open" x-transition:enter="transition-transform ease-out duration-300" x-transition:enter-start="transform scale-75" x-transition:enter-end="transform scale-100" x-transition:leave="transition-transform ease-in duration-300" x-transition:leave-start="transform scale-100" x-transition:leave-end="transform scale-75" className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">                    
                    <div className="bg-indigo-500 text-white px-4 py-2 flex justify-between">
                        <h2 className="text-lg font-semibold">Add Your Task</h2>
                        <button x-on:click="open = false" className="px-3 py-1 bg-slate-800 text-white  rounded-md w-full sm:w-auto" onClick={() => setClicked(false)}> <IoClose /> </button>
                    </div>
                    <form>                    
                    <div className="p-4">
                            <div className="container_wrapper grid grid-col-4">
                                <div>                                
                                    <label htmlFor="desc">Description : </label>
                                    <textarea ref={textArea} id="message" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2" value={description} onChange={textAreaCharCal} name="description" placeholder="Provide description....."></textarea>
                                    <div className="container flex justify-end" ref={spanError}>
                                        {charCounter}/1000
                                    </div>
                                </div>
                                <div className="flex mt-3 justify-between items-center">
                                    <div className=''>
                                        <label htmlFor="" className='text-center'>Date : </label>
                                        <input type="date" value={dueDate} onChange={(e) => {setDueDate(e.target.value)}} name="currentdate" className='border border-slate-300 rounded p-3 block w-40' id="" />
                                    </div>
                                    <div className="">
                                        <label htmlFor="">File : </label>
                                        <input type="file" id="file" value={chooseFile} ref={fileTag} onChange={(e) => setChooseFile(e.target.value)} name="chooseFile" className='border border-slate-300 rounded p-2.5 block w-56' />
                                    </div>
                                </div>
                            </div>                        
                    </div>                    
                        <div className="border-t px-4 py-2 flex justify-end ">
                            <button type='submit' className='btn bg-indigo-500 p-2 text-white mt-3 w-40 rounded text-3md font-semibold' onClick={submitTask}>Insert Task</button>                      
                        </div>
                    </form>                        
                </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default Foreground;