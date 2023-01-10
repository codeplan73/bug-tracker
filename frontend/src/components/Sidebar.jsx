import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from 'react-icons/md'
import { BsListTask } from 'react-icons/bs'
import { GrTask, GrTasks } from 'react-icons/gr'
import { TbSubtask} from 'react-icons/tb'
import { BiTaskX} from 'react-icons/bi'
import { SlLogout} from 'react-icons/sl'

const Sidebar = () => {
  return (
    <aside className='w-2/12 shadow-xl h-screen p-4'>
        <h2 className='text-xl'>Username: Name</h2>
        <h4 className='text-md'>User Role: Role</h4>
        
        <ul className='flex flex-col justify-start items-start gap-4 mt-4'>
            <span className=''><strong>Data</strong></span>
            <li className=''><Link className='flex items-center gap-2 font-sans' to='/dashboard'><MdDashboard /> Home</Link></li>
            <li className=''><Link className='flex items-center gap-2 font-sans' to=''><BsListTask />All Tickets</Link></li>
            <li className=''><Link className='flex items-center gap-2 font-sans' to=''><GrTasks />My Tickets</Link></li>
            <li className=''><Link className='flex items-center gap-2 font-sans' to=''><TbSubtask />Unassigned Tickets</Link></li>
            <li className=''><Link className='flex items-center gap-2 font-sans' to=''><GrTask />Fixed Tickets</Link></li>
            <li className=''><Link className='flex items-center gap-2 font-sans' to=''><BiTaskX /> Failed Tickets</Link></li>
            <li className=''><Link className='flex items-center gap-2 font-sans' to=''><SlLogout/> Logout</Link></li>
        </ul>
    </aside>
  )
}

export default Sidebar