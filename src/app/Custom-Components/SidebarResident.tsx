// app/Custom-Components/Sidebar.tsx
'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";


import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaMoneyBillWave } from "react-icons/fa"

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const closeSidebar = () => setSidebarOpen(false);

    const sideItems = [
        // { url: "/resident/dashboard", text: "Residents", Icon: AiOutlineUser },
        {url:"/resident/dashboard",text:"Complain",Icon:FaMoneyBillWave}
    ];

    return (
        <>
            {/* Mobile Menu Icon */}
            <div className="sm:hidden fixed top-5 left-5 z-50">
                <Bars3Icon
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                />
            </div>

            {/* Sidebar */}
            <div
                className={`bg-white text-black min-h-screen fixed w-44 sm:w-52 z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
                    } sm:translate-x-0`}
            >
                <h2 className=" text-2xl font-bold mb-8 ml-14 -mt-10">Logo.</h2>

                {sideItems.map((item) => (
                    <div key={item.url} className=" mr-3">
                        <Link
                            // key={item.url}
                            href={item.url}
                            className={`flex items-center ml-3 space-x-3 rounded-xl  py-2 px-3 transition ${pathname === item.url
                                    ? "bg-white-500 font-bold text-black"
                                    : "hover:text-blue-500"
                                }`}
                            onClick={closeSidebar}
                        >
                            <item.Icon className="w-5 h-5" />
                            <span className="text-md">{item.text}</span>
                        </Link>
                    </div>

                ))}
            </div>
        </>
    );
};

export default Sidebar;
