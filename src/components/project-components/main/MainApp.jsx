import { Outlet } from "react-router-dom";
import MobileSidebar from '../layout/MobileSidebar'
import Sidebar from '../layout/Sidebar'
import Topbar from '../layout/Topbar'
import { useState } from "react";

export default function MainApp() {

    const [open, setOpen] = useState(false);

    return (
        <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${open ? "overflow-hidden" : " "}`}>
            <Sidebar className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0" />

            {open && <MobileSidebar open={open} setOpen={setOpen} />}

            <div className="flex flex-col flex-1 w-full">
                <Topbar open={open} setOpen={setOpen} />
                <Outlet />
            </div>
        </div>
    )
}