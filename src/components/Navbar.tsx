import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"


export function Navbar() {
  

    return (
      <div className="fixed top-0 left-0 right-0 h-10 bg-opacity-0 
      flex justify-start items-center z-10 ml-10">
        <NavLink to={'/'} className='flex justify-center items-center text-xl text-sky-600 cursor-pointer hover:text-sky-800 hover:border-sky-800 mt-6'>
        <FontAwesomeIcon icon={faPencil} className='border-2 border-dotted py-2 px-2 border-sky-600 rounded-full ' />
        <h1 className='text-xl font-sora font-tilt pr-1 ml-2'>Jottings</h1>
        </NavLink>
       
        <div>
        
        </div>

      </div>
)}