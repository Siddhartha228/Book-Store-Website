import React from 'react'
import AdminNav from './AdminNav'

function AdminDashboard() {
  return (
    <>
    <AdminNav/>
    <div className="h-[800px] bg-pink-500 flex items-center justify-center">
        <h1 className='text-5xl font-bold text-white'>Hi Admin!</h1>
    </div>
    </>
  )
}

export default AdminDashboard