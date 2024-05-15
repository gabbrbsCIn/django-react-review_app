import { MoreVertical, ChevronLast, ChevronFirst, LogOut } from "lucide-react"
import { useContext, createContext, useState, useEffect } from "react"
import api from "../api"
import { ACCESS_TOKEN } from "../constants"
import UserContext from "../contexts/userContext"
const SidebarContext = createContext()

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)

    const {user} = useContext(UserContext);

    
    const [isLoading, setIsLoading] = useState(true);

    
    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.reload();
    };

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col border-r border-gray-600 bg-amber-300 shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src=""
                        className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
                        alt=""
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst color="#111827" /> : <ChevronLast color="#111827" />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t border-gray-600 flex p-3 w-full">

                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-60 ml-3" : "w-0"}`}>
                        <div className="leading-4">
                            <h4 className="flex p-2 rounded-md font-semibold bg-gray-800 text-white">  {user.username}</h4>
                        </div>
                        <button className={"p-1.5 rounded-md bg-transparent transition-colors duration-300 hover:bg-red-400"} >
                            <LogOut color="#111827" onClick={handleLogout} />
                        </button>

                    </div>
                </div>
            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext)

    return (
        <li
            className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-white text-gray-600"
                }
    `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all text-gray-800 ${expanded ? "w-52 ml-3" : "w-0"
                    }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo  -400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                >
                    {text}
                </div>
            )}
        </li>
    )
}