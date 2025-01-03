import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { dashboardItems } from '../../../helpers/dashboard';
import SignOutModal from "../../layout/modal/auth/SignOutModal";
import { IoMenu } from "react-icons/io5";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useProfile } from "../../../context/ProfileContext";

function Dashboard() {
    const location = useLocation();
    let currentPath = location.pathname.split("/");
    let [isOpen, setIsOpen] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const { userRole } = useProfile();

    useEffect(() => {
        setSideBarOpen(false);
    }, [location.pathname]);

    const updatedDashboardItems = dashboardItems.filter((item) => item.roles.includes(userRole));

    return (
        <div className='bg-gray-100 w-full overflow-hidden flex pt-[70px] dark:bg-zinc-800 min-h-screen relative'>
            <button type="button" onClick={() => setSideBarOpen(!sideBarOpen)} className="absolute top-[102px] z-20 left-6 sm:left-10 lg:hidden h-10 inline-flex border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 items-center p-2 mt-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <IoMenu className="text-xl text-blue-500 dark:text-teal-500" />
            </button>
            <SignOutModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <aside className={`${sideBarOpen ? "translate-x-0" : "-translate-x-full"} pt-16 lg:pt-4 transition-transform fixed w-64 left-0 top-20 bg-white dark:bg-zinc-900 z-40 bottom-0 border-t border-r border-zinc-300 dark:border-zinc-700 lg:translate-x-0`}>
                <button onClick={() => setSideBarOpen(!sideBarOpen)} className="lg:hidden absolute right-4 hover:bg-gray-100 dark:hover:bg-zinc-700 top-6 border border-zinc-300 dark:border-zinc-700 p-2">
                    <MdOutlineArrowBackIosNew className="text-xl text-blue-500 dark:text-teal-500" />
                </button>
                <div className="h-full px-3 py-4 overflow-y-auto ">
                    <ul className="space-y-2 font-medium flex flex-col gap-1">
                        {updatedDashboardItems.map((nav, key) => (
                            (
                                nav.label === "Sign out" ? (
                                    <li key={key} className="flex items-center justify-between">
                                        <button
                                            onClick={() => setIsOpen(true)}
                                            className="w-full space-y-2 items-center flex text-[16px] gap-2 p-2 rounded-lg hover:text-blue-500 dark:hover:text-teal-500 dark:text-gray-400 group"
                                        >
                                            <span className="text-2xl">{nav.icon}</span>
                                            {nav.label}
                                        </button>
                                    </li>
                                ) : (
                                    <Link
                                        key={key}
                                        to={nav.path}
                                    >
                                        <li key={key} className={`${currentPath[2] === nav.path ? "border-l-4 border-blue-500 dark:border-teal-500" : ""} transition duration-300 hover:text-blue-500 flex items-center justify-between`}>
                                            <p className={`${currentPath[2] === nav.path ? " text-blue-500 dark:text-teal-500 " : ""} w-full dark:hover:text-teal-500 space-y-2 items-center flex text-[16px] gap-2 p-2 dark:text-gray-400 group`}>
                                                <span className='text-2xl'>{nav.icon}</span>
                                                {nav.label}
                                            </p>
                                            {nav.label === "Profile" && <p className={`${currentPath[2] === nav.path ? "text-blue-500 bg-blue-400/10 dark:text-teal-500 dark:bg-teal-400/10 " : "text-gray-500 dark:text-gray-500 bg-gray-400/20"} px-2 py-1`}>{userRole}</p>}
                                        </li>
                                    </Link>
                                )
                            )
                        ))}
                    </ul>
                </div>
            </aside>
            <div
                className={`flex-1 lg:ml-64 overflow-hidden px-6 sm:px-10 lg:px-6 py-10 ${sideBarOpen ? "blur-sm" : ""
                    } lg:blur-none`}
            >
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard