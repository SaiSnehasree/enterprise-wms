import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Package,
    Warehouse,
    ClipboardList,
    LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const sidebarItems = [
        {
            icon: <LayoutDashboard />,
            text: "Dashboard",
            path: "/dashboard",
            action: () => navigate("/dashboard"),
        },
        {
            icon: <Package />,
            text: "Products",
            path: "/products",
            action: () => navigate("/products"),
        },
        {
            icon: <Warehouse />,
            text: "Warehouses",
            path: "/warehouse",
            action: () => navigate("/warehouse"),
        },
        {
            icon: <ClipboardList />,
            text: "Inventory",
            path: "/inventory",
            action: () => navigate("/inventory"),
        },
    ];

    return (
        <motion.div
            initial={{
                x: -80,
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
            transition={{ duration: 0.5 }}
            className="w-24 hover:w-72 transition-all duration-500 border-r border-white/10 bg-white/[0.03] backdrop-blur-3xl flex flex-col items-center py-10 group z-20 h-screen sticky top-0 shrink-0"
        >
            {/* Logo */}
            <div className="mb-12 cursor-pointer" onClick={() => navigate("/dashboard")}>
                <div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-slate-400 shadow-[0_0_50px_rgba(168,85,247,0.5)] flex items-center justify-center font-bold text-xl text-white"
                >
                    W
                </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 w-full space-y-2">
                {sidebarItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <SidebarItem
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            isActive={isActive}
                            onClick={item.action}
                        />
                    );
                })}
            </div>

            {/* Logout */}
            <div className="w-full">
                <SidebarItem
                    icon={<LogOut />}
                    text="Logout"
                    isActive={false}
                    onClick={handleLogout}
                />
            </div>
        </motion.div>
    );
}

function SidebarItem({ icon, text, isActive, onClick }) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{
                x: 10,
            }}
            className={`flex items-center w-full px-7 py-5 cursor-pointer transition-all relative ${
                isActive
                    ? "text-violet-400 bg-white/[0.05] border-l-4 border-violet-500"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
            }`}
        >
            <div className="min-w-[24px]">
                {icon}
            </div>

            <span
                className="ml-5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 font-medium"
            >
                {text}
            </span>
        </motion.div>
    );
}

export default Sidebar;
