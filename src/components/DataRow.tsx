import React from 'react';
import { TableData } from '../types';
import {CalendarCheck2, User } from 'lucide-react';

interface DataRowProps {
    // data: TableData[];
    paginatedData: TableData[];
}

const DataRow: React.FC<DataRowProps> = ({ paginatedData }) => {
    return (
        <div className='w-full flex flex-col divide-y divide-gray-300 rounded-lg overflow-hidden'>
            {paginatedData.map((item) => {
                const { id, name, email, status, lastLogin, role } = item
                return <div className='bg-white py-5 px-5 space-y-2' key={id}>
                    <p className='flex items-center justify-between'>
                        <span className='text-lg'>{name} <br /> {email}</span>
                        <span className={`${status === "active" ? "bg-emerald-50 text-green-700" : "bg-red-50 text-red-700"} flex items-center  text-sm rounded-full py-1 px-3`}>
                            {status}</span>
                    </p>
                    <div className='text-gray-600 flex gap-4'>
                        <p className=' flex items-center gap-2'>
                            <User className='h-5 w-5 rounded-md bg-gray-200 p-0.5' />
                            <span className='pb-0.5'> {role} </span>
                        </p>
                        <p className=' flex items-center gap-2'>
                            <CalendarCheck2 className='h-5 w-5 rounded-md bg-gray-200 p-0.5' />
                            <span className='pb-0.5'>Recent {lastLogin} </span>
                        </p>
                    </div>


                </div>
            })}
        </div>
    );
}

export default DataRow;

