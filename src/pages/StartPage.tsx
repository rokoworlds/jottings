import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"


export default function StartPage() {
    return (
        <>    
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16">
            <div className="relative w-full max-w-lg">
                <div className="pointer-events-none animate-blob filter blur-xl mix-blend-multiply absolute top-0 -left-4 w-72 h-72 bg-teal-300 rounded-full">
                </div>
                <div className="pointer-events-none animate-blob animation-delay-2000 filter blur-xl mix-blend-multiply absolute top-0 -right-4 w-72 h-72 bg-green-300 rounded-full">
                </div>
                <div className="pointer-events-none animate-blob animation-delay-4000 filter blur-xl mix-blend-multiply absolute -bottom-16 left-20 w-72 h-72 bg-sky-300 rounded-full">
                </div>
                <div className="m-8 relative space-y-4">
      <div className="p-5 bg-white shadow-lg shadow-teal-200 rounded-lg flex font-sora items-center justify-center">
        <div className="flex flex-col justify-center items-center">
        <Link to='/new'>
          <div className="border-2 cursor-pointer border-dotted text-3xl border-sky-500 py-2 px-3 mt-3 rounded-full">
            <FontAwesomeIcon icon={faPencil} className="hover:text-sky-500 " />
          </div>
          </Link>
          <div className="mt-5 text-xl p-2 text-gray-900">
            <h1>Welcome to Jottings</h1>
          </div>
          <div className="text-sm font-mono text-center p-3 mb-6 text-gray-500">
            <p > Jottings:</p>
            <p >quickly written short notes</p>
          </div>
          <Link to='/new'>
          <button className=" px-5 py-2 mb-6 btn-green">
            Make a note
          </button>
          </Link>
          

        </div>

      </div>
     
      

    </div>
            </div>
        </div>
        </>
    )
}