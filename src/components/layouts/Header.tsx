import { useLocation } from "react-router-dom";
import { Search, Bell, Plus, CopyPlus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/authStore";

type menuProps={
    onMenuToggle: () => void
}

const Header = ({onMenuToggle}: menuProps) => {
    const location = useLocation();
    const user = useAuthStore(state => state.user);

    const greetingMessage = () => {
    const hourOfDay = new Date().getHours();
    let greeting: string;

    if (hourOfDay < 12) {
        greeting = "Good Morning";
    } else if (hourOfDay < 18 && hourOfDay >= 12) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }
    return greeting;
    };

    const headerSettings: Record<string, { 
        title?: string; 
        bg: string;
        hasSearch: boolean;
        hasTitle?: boolean;
        input?: string;
        searchPlaceholder?: string;
    }> = {
        // Sidebar pages - Default background
        "/dashboard": {  
            bg: " backdrop-blur-md shadow-lg text-white bg-theme-background/60",
            hasSearch: true,
            hasTitle: false,
            searchPlaceholder: "Search for hospital names...",
        },
        "/artist/savings-loan": { 
            title: "Savings & Loan", 
            bg: "bg-megaPrimary text-white",
            hasSearch: false,
            hasTitle: true
        },
        "/artist/market-place": { 
            title: "Market Place", 
            bg: "bg-megaPrimary text-white",
            hasSearch: false,
            hasTitle: true
        },
        "/artist/investment": { 
            title: "Investment", 
            bg: "bg-megaPrimary text-white",
            hasSearch: false,
            hasTitle: true
        },
        "/artist/profile": { 
            title: "Profile", 
            bg: "bg-card-bg text-theme-text",
            hasSearch: false,
            hasTitle: true
        },
        "/artist/settings": { 
            title: "Settings", 
            bg: "bg-card-bg text-theme-text",
            hasSearch: false,
            hasTitle: true
        },
        "/artist/transactions": { 
            title: "Transactions", 
            bg: "bg-megaPrimary text-white",
            input: "text-icon",
            hasSearch: true,
            hasTitle: true,
            searchPlaceholder: "Search for something..."
        },
        "/artist/cart": { 
            title: "My Cart", 
            bg: "bg-megaPrimary text-white",
            hasSearch: false,
            hasTitle: true
        },
       
    };

    const defaultSetting = headerSettings[location.pathname] || {
        bg: "bg-theme-background text-theme-text",
        hasSearch: false,
        hasTitle: false
    };

    return (
        <header className={`px-0 lg:px-6 pr-2 md:pr-4 py-4 font-poppins ${defaultSetting.bg}`}>
            <div className="flex items-center justify-between gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Left side - Page Title */}
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost" 
                        className="hover:bg-transparent lg:hidden text-theme-text"
                        onClick={onMenuToggle}
                    >
                        <AlignJustify className="!w-6 !h-6" />
                    </Button>

                    {/* <h1 className="text-2xl font-bold">
                        {defaultSetting.title}
                    </h1> */}
                    {defaultSetting.hasTitle ? (
                        <h1 className="text-2xl font-bold">
                            {defaultSetting.title}
                        </h1>
                    ) : (
                        <>
                            <div className="flex items-center justify-between gap-3">
                                <div className=" w-full">
                                    <div className="flex items-center space-x-0 md:space-x-3 font-jakarta">
                                        <Avatar className="w-10 h-10 border">
                                            <AvatarImage src={user?.avatar || ""} alt="" />
                                            <AvatarFallback className="font-medium text-theme-text">
                                                {/* {getInitials()} */}dd
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0 hidden md:block">
                                            <p className="text-md font-bold truncate text-theme-text">
                                             {/* Good Morning {user?.first_name || "Guest"}, */}
                                                {greetingMessage()} {user?.first_name || "Guest"},
                                                {/* { user?.last_name} */}
                                            </p>
                                            <p className="text-xs  truncate text-theme-text">
                                              What do you want to do today?
                                            </p>
                                        </div>
                                        
                                    </div>
                                
                        
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4 ">
                    {/* Center - Conditional Search */}
                    {defaultSetting.hasSearch && (
                        <div className="relative flex bg-theme-background rounded-md border">
                            <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 text-icon w-4 h-4" />
                            <Input
                                type="text"
                                placeholder={defaultSetting.searchPlaceholder || "Search..."}
                                className={`pl-7 w-37 md:w-62 border-transparent text-xs md:text-md text-theme-text shadow-none placeholder:text-icon ${defaultSetting.input}`}
                            />
                        </div>
                    )}
                    {/* Right side - User actions */}
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="hover:bg-white/10 hidden sm:flex text-theme-text">
                            <Bell className="w-5 h-5" />
                        </Button>
                        
                        {/* <Button variant="ghost" size="icon" className="hover:bg-theme-hover bg-theme-background text-theme-text lg:hidden">
                            <User className="w-5 h-5" />
                        </Button> */}

                        <Button variant="outline" size="sm" className="hover:bg-theme-hover bg-theme-background text-theme-text flex">
                            <CopyPlus className="w-5 h-5" /> <span className="hidden lg:inline-block">Top Up</span>
                        </Button>

                        <Button variant="default" size="sm" className="hover:bg-theme-hover bg-teal-500 flex">
                            <Plus className="w-5 h-5" /> <span className="hidden lg:inline-block">Add Hospital</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;