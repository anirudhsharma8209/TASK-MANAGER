import React, { useEffect, useState, useRef } from 'react'
import { Fragment } from 'react'
import { Radio } from "@material-tailwind/react";
import axios from 'axios';
import EmployeeTable from './EmployeeTable';

const Employee = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
    useEffect(() => {
        setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 1000)
    }, [])
    const [employee_name, setEmpName] = useState("");    
    const [employee_address, setEmpAddress] = useState("");    
    const [employee_designation, setEmpDes] = useState("");    
    const [employee_salary, setEmpSal] = useState("");    
    const [employee_gen, setEmpGen] = useState("");


    const genderCheck1 = useRef();    
    const genderCheck2 = useRef();    


    const handleSubmit = (event) => {    
        event.preventDefault();   
        let employee_gender;
        console.log(genderCheck1.current.checked);
        console.log(genderCheck2.current.checked);
        if(genderCheck1.current.checked){
            employee_gender = "Male";
            setEmpGen("Male");
        }
        else{
            employee_gender = "Female";
            setEmpGen("Female");
        }

        axios.post("http://localhost:4500/createemployee", {employee_name, employee_address, employee_designation, employee_gender, employee_salary}).then((data) => console.log(data)).catch((error) => console.log(error));
        setEmpName(""); setEmpAddress(""); setEmpGen(""); setEmpSal("");  setEmpDes("");
        genderCheck1.current.checked = false;
        genderCheck2.current.checked = false;
    }
    return (
        <Fragment>
            <div className="container bg-slate-900 rounded-xl">
                <div className="h-16 text-3xl rounded-t-md bg-violet-600 text-slate-100 text-center flex justify-between p-4 items-center">
                    Welcome Admin <span>{currentTime}</span>
                </div>
                <div className="card-body p-7 w-100">
                    <div className="task_div flex container h-16 justify-between p-5 items-center">
                        <label htmlFor="" className="form-label text-xl text-slate-50">Employee Name</label>
                        <input type="text" id="" value={employee_name} name='employee_name' onChange={(e) => setEmpName(e.target.value)} className="form-control h-11 w-80 rounded-md p-2 border border-slate-900" placeholder='Enter Your Task here....' />
                    </div>
                    <div className="description flex justify-between col-lg-12 mt-2 p-3">
                        <div className="first w-full">
                            <label htmlFor="" className="form-label text-slate-100 text-xl">Address of Employee </label>
                            <div className="flex justify-center items-center mt-2">
                                <textarea className='from-control rounded-md p-2' value={employee_address} name='employee_address' onChange={(e) => setEmpAddress(e.target.value)} rows={3} cols={90} placeholder='Employee Address : '></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="dateandtime flex justify-around mt-2">
                        <div className="calendar mt-5">
                            <label htmlFor="" className="text-lg text-slate-100">Gender : </label>
                            <div className='flex w-44 h-10 justify-between items-center text-slate-50'>
                                <input type="radio" ref={genderCheck1} name="employee_gender" className='w-7 h-5 ' id="male" /> Male 
                                <input type="radio" ref={genderCheck2} name="employee_gender" className='w-5 h-5'  id="female" /> Female
                            </div>
                        </div>
                        <div className="block">
                            <div className="second">
                                <label htmlFor="" className='text-slate-100 text-xl'>Salary : </label>
                                <div className="flex justify-center mt-2">
                                    <input type="number" value={employee_salary} onChange={(e) => setEmpSal(e.target.value)} name="employee_salary" className='p-3 w-72 rounded-md' placeholder='Enter Salary : ' id="" />
                                </div>
                            </div>
                        </div>
                        <div className="block w-60">
                            <label htmlFor="" className="text-lg text-slate-100">Current Designation :  </label>
                            <select value={employee_designation} name="employee_designation" onChange={(e) => setEmpDes(e.target.value)} className='text-lg text-slate-900 w-64 p-2.5 rounded-lg'>
                                <option value="-- None --">Select Designation  </option>
                                <option value="Manager">Manager</option>
                                <option value="Clerk">Clerk</option>
                                <option value="CEO">CEO</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                    </div>                
                </div>
                <div className="container flex justify-center items-center mt-4">
                    <button className='bg-violet-700 w-96 p-4 rounded-xl text-slate-100 text-xl' onClick={handleSubmit}>Add Employee</button>
                </div>
            </div>
                <div className="container">
                    <EmployeeTable taskingToEmployee={true} selectionPart={false} />
                </div>
        </Fragment>
    )
}

export default Employee
