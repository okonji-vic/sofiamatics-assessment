import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";



type menuProps={
    onMenuToggle: () => void
}

const Header = ({onMenuToggle}: menuProps) => {

    return ( 
        <div className={`lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md cursor-pointer `}>
            <Button
                variant="ghost"
                className="hover:bg-transparent text-theme-text"
                onClick={onMenuToggle}
            >
                <AlignJustify className="!w-6 !h-6" />
            </Button>
        </div>
    );
};

export default Header;

