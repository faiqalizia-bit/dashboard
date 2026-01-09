import React from 'react'
import { useState, useEffect } from 'react';
import DashboardLayout from '../Component/DashboardLayout';


function Dashbord() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    const totalUsers = users.length;
    return (
        <DashboardLayout>
            <div className='flex py-2'>
                <div className='bg-neutral w-full'>
                    <h1 className="text-sm font-bold"><div className='flex gap-[4px] items-center'>Dashboard</div></h1>

                    <div className="grid grid-cols-3 gap-5 w-full p-5">
                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Total Users</h3>
                            <p className="text-3xl font-bold">{totalUsers}</p>
                        </div>

                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Total Hospitals</h3>
                            <p className="text-3xl font-bold">12</p>
                        </div>

                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Active Users</h3>
                            <p className="text-3xl font-bold">
                                {totalUsers > 0 ? totalUsers - 1 : 0}
                            </p>
                        </div>

                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Doctors</h3>
                            <p className="text-3xl font-bold">
                                Recent:
                            </p>
                        </div>

                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Nurses</h3>
                            <p className="text-3xl font-bold">
                               Recent: 
                            </p>
                        </div>

                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Patients</h3>
                            <p className="text-3xl font-bold">
                                 Recent:
                            </p>
                        </div>
                    </div>

                    <div className='flex gap-5 w-full p-5'>
                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Patients</h3>
                            <p className="text-3xl font-bold">
                                 Recent:
                            </p>
                        </div>

                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Patients</h3>
                            <p className="text-3xl font-bold">
                                 Recent:
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashbord