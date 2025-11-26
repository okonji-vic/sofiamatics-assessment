import { Outlet } from "react-router-dom";
import Header from "./Header";

import Sidebar from "./Sidebar";

import { useState } from "react";
import clsx from "clsx";
import { Toaster } from "../ui/sonner";


const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const user: "creator" | "artist" = "creator";  
    

    const toggleSidebar = () =>{
        setIsSidebarOpen(!isSidebarOpen);
    }

    const closeSidebar = () =>{
        setIsSidebarOpen(false);
    }

    const sidebarStyle= clsx(
        "fixed inset-y-0 left-0 z-50 lg:hidden",
        "transform transition-transform duration-300 ease",
        isSidebarOpen? "translate-x-0" : "-translate-x-full"
    )

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                {/* <Sidebar onClick={closeSidebar}/> */}
                    <Sidebar onClick={closeSidebar} />
            
            </div>

            {/* Mobile sidebar*/}       
            <div className={sidebarStyle}>
                    <Sidebar onClick={closeSidebar} />
            
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-x-hidden" >
            
                    {/* <Header onMenuToggle={toggleSidebar} /> */}
            
                <main className="flex-1 p-4 sm:p-6 overflow-y-auto" >
                    <Header onMenuToggle={toggleSidebar} />
                    <div className=" max-w-[1640px] mx-auto" onClick={closeSidebar}>
                        
                        <Outlet /> 
                    </div>
                </main>
            </div>
            

            {/* ✅ Global Toaster (for protected routes only) */}
            <Toaster richColors position="top-right" />

        </div>
    )
}
export default DashboardLayout;
