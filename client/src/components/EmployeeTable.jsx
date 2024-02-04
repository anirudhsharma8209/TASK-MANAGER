import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios';

const EmployeeTable = ({taskingToEmployee, selectionPart}) => {
    console.log(selectionPart);
    const [allEmployee, setAllEmployee] = useState("");
    useEffect(() => {        
        axios.get("http://localhost:4500/allemployee").then((data) => setAllEmployee(data.data)).catch((error) => collapse.log(error));
    }, [])
    return (
        <Fragment>
            <h1 className='text-3xl text-slate-100 text-center mb-4'>Employee's Information</h1>
            <table className='text-slate-50 w-full'>
                <thead className='border'>
                    <tr>
                        <th>Employee Sr.</th>
                        <th className='border p-4'>Employee Name</th>
                        <th className='border'>Employee Address</th>
                        <th className='border'>Employee Designation</th>
                        <th className='border'>Employee Gender</th>
                        <th className='border'>Employee Salary</th>
                        {
                            selectionPart && <th>Selection</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        (allEmployee != '') &&
                        allEmployee.map((element, index) => (
                            <tr className='border' align='center' key={index}>
                                <td className='border'>
                                    {index + 1}
                                </td>
                                <td className='border p-5'>
                                    {element.employee_name}
                                </td>
                                <td className='border'>
                                    {element.employee_address}
                                </td>
                                <td className='border'>
                                    {element.employee_designation}
                                </td>
                                <td className='border'>
                                    {element.employee_gender}
                                </td>
                                <td className='border'>
                                    {element.employee_salary}
                                </td>
                                {
                                    selectionPart && 
                                    <td>
                                        {
                                            taskingToEmployee
                                                ?
                                                <button className='w-24 m-2 h-9 bg-green-500 rounded-md' onClick={() => { setTaskingToEmployee(false); setFixedIndex(index) }}>Select</button>
                                                :
                                                (fixedIndex == index)
                                                    ?
                                                    `[ ${selectionTask} ]`
                                                    :
                                                    <button className='w-24 m-2 h-9 bg-green-500 rounded-md' onClick={() => { setSelectionTask(selectionTask.length = 0); setFixedIndex(index); setTaskingToEmployee(false) }}>Select Emp</button>                                        
                                        }
                                    </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default EmployeeTable