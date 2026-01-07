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
            <div className='flex'>
                <div className='bg-gray-100 w-full'>
                    <h1 className="text-2xl font-bold">Dashboard</h1>

                    <div className="grid grid-cols-3 gap-5 w-full p-5">
                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Total Users</h3>
                            <p className="text-3xl font-bold">{totalUsers}</p>
                        </div>

                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Total Cars</h3>
                            <p className="text-3xl font-bold">12</p>
                        </div>

                        <div className="w-full bg-white p-5 rounded shadow">
                            <h3 className="text-gray-500 text-sm">Active Users</h3>
                            <p className="text-3xl font-bold">
                                {totalUsers > 0 ? totalUsers - 1 : 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Dashbord