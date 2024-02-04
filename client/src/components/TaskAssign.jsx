import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { collapse } from '@material-tailwind/react';
import EmployeeTable from './EmployeeTable';
const TaskAssign = () => {
    const [allTask, setAllTask] = useState("");    
    const [taskingToEmployee, setTaskingToEmployee] = useState(true);
    const [selectionTask, setSelectionTask] = useState([]);
    
    const setAddToArray = (index) => {
        selectionTask.push(index);        
        setSelectionTask(selectionTask);
    }
    useEffect(() => {
        axios.get("http://localhost:4500/alltasks").then((data) => setAllTask(data.data)).catch((error) => console.log(error));        
    }, [])    
    const [indexToChange, sendIndexToChange] = useState(-1);
    return (
        <Fragment>
            <div className="container flex gap-2 flex-wrap m-5 p-5">
                {
                    (allTask != '') &&
                    allTask.map((element, index) => (
                        element.isFooter
                            &&
                            <div className="card w-52 h-52 bg-slate-900 rounded-se-3xl rounded-ee-lg rounded-es-lg cursor-pointer overflow-hidden" key={index}>
                                <div className="taskTop flex items-center justify-between text-slate-50" >
                                    <div className="taskcount bg-slate-950 w-10 h-10 rounded-se-xl rounded-ee-xl flex justify-center items-center text-1xl"> {index + 1} </div>
                                    <div className="div p-2 w-24 text-sm bg-slate-950"> {element.dueDate} </div>
                                </div>
                                <div htmlFor="" className='text-slate-100 text-sm m-2 mt-3 font-semibold underline decoration-transparent hover:decoration-violet-400'>Task Detail :   </div>
                                <div className="taskinfo text-slate-200 m-2 p-1 h-20" onClick={() => sendIndexToChange(index)}>
                                    {element.description}
                                </div>
                                {
                                    !taskingToEmployee
                                        ?
                                        indexToChange == index
                                            ?
                                            <div className={`drag_action rounded-md bg-green-500 h-10 flex justify-center items-center text-slate-50 font-semibold`} onClick={() => { sendIndexToChange(index); }}>
                                                Selected
                                            </div>
                                            :
                                            <div className={`drag_action rounded-md bg-red-500 h-10 flex justify-center items-center text-slate-50 font-semibold`} onClick={() => {  sendIndexToChange(index); setAddToArray(index) }}>
                                                Select Task
                                            </div>
                                        :
                                        <div className='bg-slate-700 w-full h-10 text-white flex justify-center items-center'>
                                            Select Employee First
                                        </div>
                                }
                            </div>
                        ))
                }
            </div>
            <div className="container">
               <EmployeeTable taskingToEmployee={taskingToEmployee} selectionPart={true} />
            </div>
        </Fragment>
    )
}

export default TaskAssign