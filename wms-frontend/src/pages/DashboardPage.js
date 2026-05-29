import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Sidebar from "../components/Sidebar";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import axios from "axios";
import {
    useEffect,
    useState,
} from "react";



function DashboardPage() {



    const [
        productCount,
        setProductCount,
    ] = useState(0);

    const [
        warehouseCount,
        setWarehouseCount,
    ] = useState(0);

    const [
        inventoryCount,
        setInventoryCount,
    ] = useState(0);

    const stats = [
        {
            title: "Products",
            value: productCount,
        },
        {
            title: "Warehouses",
            value: warehouseCount,
        },
        {
            title: "Inventory",
            value: inventoryCount,
        },
        {
            title: "Low Stock",
            value: "08",
        },
    ];

    const data = [
        { name: "Mon", stock: 240 },
        { name: "Tue", stock: 320 },
        { name: "Wed", stock: 280 },
        { name: "Thu", stock: 450 },
        { name: "Fri", stock: 400 },
        { name: "Sat", stock: 520 },
    ];

    useEffect(() => {

        const fetchDashboardData =
            async () => {

                try {

                    const productResponse =
                        await axios.get(
                            "http://localhost:8080/products"
                        );

                    const warehouseResponse =
                        await axios.get(
                            "http://localhost:8080/warehouse"
                        );

                    const inventoryResponse =
                        await axios.get(
                            "http://localhost:8080/inventory"
                        );

                    setProductCount(
                        productResponse.data.length
                    );

                    setWarehouseCount(
                        warehouseResponse.data.length
                    );

                    setInventoryCount(
                        inventoryResponse.data.length
                    );

                } catch (error) {
                    console.log(error);
                }
            };

        fetchDashboardData();

    }, []);

    return (
        <div className="min-h-screen bg-[#03040A] text-white overflow-hidden relative flex">

            {/* Background Glow */}
            <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-violet-700/30 blur-[180px] rounded-full" />

            <div className="absolute bottom-[-200px] right-[-150px] w-[450px] h-[450px] bg-slate-400/20 blur-[180px] rounded-full" />

            <div className="absolute top-[40%] left-[35%] w-[300px] h-[300px] bg-fuchsia-500/10 blur-[140px] rounded-full" />

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-12 relative z-10">

                {/* Hero Section */}
                <motion.div
                    initial={{
                        y: 80,
                        opacity: 0,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    className="flex justify-between items-center"
                >

                    {/* Left Side */}
                    <div className="max-w-3xl">

                        <p className="uppercase tracking-[8px] text-slate-400 mb-5">
                            Enterprise Platform
                        </p>

                        <h1
                            className="text-[95px]
              font-black
              leading-[0.95]
              tracking-[-3px]"
                        >
                            Warehouse
                            <br />

                            <span
                                className="bg-gradient-to-r
                from-violet-400
                via-fuchsia-300
                to-slate-200
                bg-clip-text
                text-transparent"
                            >
                Intelligence
              </span>

                            <br />
                            System
                        </h1>

                        <p className="text-slate-400 text-xl mt-8 max-w-2xl leading-9">
                            A futuristic enterprise control
                            center to manage products,
                            inventory, analytics, warehouse
                            operations and intelligent stock
                            movement in real-time.
                        </p>

                    </div>

                    {/* Floating Stats Panel */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                        }}
                        className="w-[420px]
            rounded-[40px]
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-3xl
            p-8 shadow-2xl"
                    >

                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">
                                Live Control
                            </h2>

                            <ChevronRight />
                        </div>

                        <div className="grid grid-cols-2 gap-5 mt-8">

                            {stats.map(
                                (item, index) => (
                                    <motion.div
                                        whileHover={{
                                            scale: 1.05,
                                        }}
                                        key={index}
                                        className="rounded-[28px]
                  border border-white/10
                  bg-gradient-to-br
                  from-white/[0.08]
                  to-white/[0.03]
                  p-6"
                                    >
                                        <p className="text-slate-400">
                                            {item.title}
                                        </p>

                                        <h3 className="text-4xl font-bold mt-4">
                                            {item.value}
                                        </h3>
                                    </motion.div>
                                ))}

                        </div>
                    </motion.div>

                </motion.div>

                {/* Analytics Section */}
                <div className="grid grid-cols-3 gap-8 mt-14">

                    {/* Chart */}
                    <motion.div
                        className="col-span-2
            rounded-[40px]
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-3xl
            p-8"
                    >

                        <div className="flex justify-between mb-8">

                            <div>
                                <h2 className="text-3xl font-bold">
                                    Inventory Flow
                                </h2>

                                <p className="text-slate-400 mt-2">
                                    Real-time stock movement
                                </p>
                            </div>

                            <div
                                className="px-5 py-2 rounded-2xl
                bg-violet-500/20 text-violet-300"
                            >
                                Live Analytics
                            </div>

                        </div>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart data={data}>

                                <defs>
                                    <linearGradient
                                        id="colorStock"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#a855f7"
                                            stopOpacity={0.8}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#a855f7"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <XAxis
                                    dataKey="name"
                                    stroke="#888"
                                />

                                <YAxis
                                    stroke="#888"
                                />

                                <Tooltip />

                                <Area
                                    type="monotone"
                                    dataKey="stock"
                                    stroke="#a855f7"
                                    fillOpacity={1}
                                    fill="url(#colorStock)"
                                />

                            </AreaChart>
                        </ResponsiveContainer>

                    </motion.div>

                    {/* Activity */}
                    <motion.div
                        className="rounded-[40px]
            border border-white/10
            bg-white/[0.04]
            backdrop-blur-3xl
            p-8"
                    >
                        <h2 className="text-2xl font-bold">
                            Live Activity
                        </h2>

                        <div className="space-y-5 mt-8">

                            <Activity
                                title="Warehouse Updated"
                                time="2 mins ago"
                            />

                            <Activity
                                title="Inventory Added"
                                time="10 mins ago"
                            />

                            <Activity
                                title="Low Stock Alert"
                                time="15 mins ago"
                            />

                        </div>

                    </motion.div>

                </div>

            </div>
        </div>
    );
}

// SidebarItem removed in favor of reusable Sidebar component

function Activity({
                      title,
                      time,
                  }) {
    return (
        <motion.div
            whileHover={{
                x: 5,
            }}
            className="rounded-3xl
      border border-white/10
      bg-white/[0.04]
      p-5"
        >
            <h3 className="font-semibold">
                {title}
            </h3>

            <p className="text-slate-400 mt-2">
                {time}
            </p>
        </motion.div>
    );
}

export default DashboardPage;