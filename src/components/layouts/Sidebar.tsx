import clsx from "clsx";
import {  X, Hospital, Settings, User, CreditCard, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";
import { Switch } from "../ui/switch";
import { useThemeStore } from "@/store/themeStore";
import Logo from '/croplife-canada.png';

type menuProps={
    onClick: () => void
}

const Sidebar = ({onClick}:menuProps) => {
    const {theme, toggleTheme} = useThemeStore()
    

    const activeClass= ({isActive}:{isActive: boolean}) =>
        clsx("flex gap-3 cursor-pointer", {
        "text-white bg-dark p-3 rounded-lg border ": isActive,
        "": !isActive,
    });

    return (
        <aside className="w-[346px] h-full bg-transparent rounded-br-lg  pt-5 px-6 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative border-r backdrop-blur-2xl lg:backdrop-blur-md shadow-lg">
            <Button 
                variant="ghost" 
                className="hover:bg-transparent lg:hidden absolute top-0 right-[-13px]"
                onClick={onClick}
            >
                <X className=" !w-8 !h-8" />
            </Button>
            <nav className="font-jakarta flex flex-col gap-8">
                <div className="flex items-center justify-between pb-6 border-b">
                    <Link to="/" className="flex items-center">
                        <img src={Logo} alt=" Sofiamatics logo" className="" />
                    </Link>
                </div>
                <NavLink to="dashboard" className={activeClass}>
                    <LayoutDashboard /> Dashboard
                </NavLink>
                <NavLink to="hospitals" className={activeClass}>
                    <Hospital /> Hospitals
                </NavLink>
                <NavLink to="billings" className={activeClass}>
                    <CreditCard /> Billings
                </NavLink>
                <NavLink to="profile" className={activeClass}>
                    <User /> Profile
                </NavLink>
                <NavLink to="settings" className={activeClass}>
                    <Settings /> Settings
                </NavLink>

                <div className="flex items-center  gap-0  cursor-pointer">
                    <div className="flex items-center gap-2 ">
                        <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} className="border border-teal-500" />
                        Dark Mode
                    </div>
                    
                </div>
            </nav>           
        </aside>
    )
}

export default Sidebar;