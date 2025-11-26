import clsx from "clsx";
import { Settings, X, ShieldCheck, ChevronDown, LogOut, ChevronUp, CircleQuestionMark, ChartNoAxesCombined,  MessagesSquare, Hospital } from "lucide-react";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";
import { Switch } from "../ui/switch";
import { useThemeStore } from "@/store/themeStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import PageLoader from "../PageLoader";
import { useAuthStore } from "@/store/authStore";
import Logo from '/Sofiamatics-Logo.png';



type menuProps={
    onClick: () => void
}

const Sidebar = ({onClick}:menuProps) => {
    const {theme, toggleTheme} = useThemeStore()
    const user = useAuthStore(state => state.user);
    const tempLogout =  false;
    // const logout = useLogout();

    const activeClass= ({isActive}:{isActive: boolean}) =>
        clsx("flex gap-3 cursor-pointer", {
        "text-white bg-teal-500 p-3 rounded-lg border border-teal-500": isActive,
        "": !isActive,
    });

    const handleLogout = () => {
        // logout.mutate();
        return false;
        
    }

    return (
        <aside className="w-[306px] h-full bg-transparent rounded-br-lg  pt-5 px-6 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative border-r backdrop-blur-2xl lg:backdrop-blur-md shadow-lg">
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
                        <img src={Logo} alt=" Sofiamatics logo" className="w-12 h-12" />
                    </Link>
                    <Button variant="ghost" className="hover:bg-transparent flex flex-col items-center font-jakarta border w-1/12 mr-2">
                        <ChevronUp className="!w-4 !h-3" />
                        <ChevronDown className="!w-4 !h-3" />

                    </Button>
                </div>
                <span className=" pt-4">MAIN</span>
                <NavLink to="hospitals" className={activeClass}>
                    <Hospital /> Hospitals
                </NavLink>

                

                <NavLink to="messages" className={activeClass}>
                    <MessagesSquare />
                    Messages
                </NavLink>

                <NavLink to="profile" className={activeClass}>
                    <ChartNoAxesCombined />
                    Reports
                </NavLink>

                <span className="pt-4">OTHERS</span>
                {/* <hr/> */}

                <NavLink to="settings" className={activeClass}>
                    <Settings /> Settings
                </NavLink>
               
                {/* <div className="flex gap-3 cursor-pointer"> */}
                <NavLink to="security" className={activeClass}>
                    <ShieldCheck /> Security
                </NavLink>
                {/* </div> */}

                {/* <div className="flex gap-3 cursor-pointer"> */}
                <NavLink to="help" className={activeClass}>
                    <CircleQuestionMark />
                    Help Center
                </NavLink>
                {/* </div> */}
                <Button
                            onClick={handleLogout}
                            variant="ghost"
                            // disabled={logout.isPending}
                            className="w-full justify-start hover:text-red-500 font-jakarta cursor-pointer disabled:opacity-50"
                        >
                            {/* {logout.isPending ? ( */}
                            {tempLogout ? (
                                <>
                                    <PageLoader />
                                    Signing out...
                                </>
                            ) : (
                                <>
                                    <LogOut className="!w-6 !h-6 " />
                                    Sign Out
                                </>
                            )}
                </Button>
                <span className="pt-2">APPEARANCE</span>
                <div className="flex items-center  gap-0  cursor-pointer">
                    <div className="flex items-center gap-2 ">
                        <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} className="border border-teal-500" />
                        Dark Mode
                    </div>
                    
                </div>

                {/* user profile */}
                
                <div className="flex items-center justify-between gap-3 pt-30 pb-10 ">
                    <div className="py-2 w-full">
                        <div className="flex items-center space-x-3 mb-4 font-jakarta">
                            <Avatar className="w-10 h-10 border">
                                <AvatarImage src={user?.avatar || ""} alt="" />
                                <AvatarFallback className="font-medium">
                                    {/* {getInitials()} */}dd
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-lg font-bold truncate">
                                    {user?.first_name || "Guest"} 
                                    {/* { user?.last_name} */}
                                </p>
                                <p className="text-xs  truncate">
                                    { user?.email || "neogreat@gmail.com" }
                                </p>
                            </div>
                            <ChevronDown/>
                        </div>
                                
                        
                    </div>
                </div>
            </nav>           
        </aside>
    )
}

export default Sidebar;