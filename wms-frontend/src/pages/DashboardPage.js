import { motion } from "framer-motion";
import { ChevronRight, AlertTriangle } from "lucide-react";
import Sidebar from "../components/Sidebar";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";

import axios from "axios";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

function DashboardPage() {

    const navigate = useNavigate();
    const role =
        localStorage.getItem(
            "role"
        );

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

    const [
        lowStockItems,
        setLowStockItems,
    ] = useState([]);

    const [
        analyticsData,
        setAnalyticsData,
    ] = useState([]);

    const [
        predictions,
        setPredictions,
    ] = useState([]);

    const [
        salesPrediction,
        setSalesPrediction,
    ] = useState([]);

    const [
        aiQuestion,
        setAiQuestion,
    ] = useState("");

    const [
        aiResponse,
        setAiResponse,
    ] = useState("");

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
            value: lowStockItems.length,
        },
    ];

    useEffect(() => {

        const fetchDashboardData =
            async () => {

                try {

                    const token =
                        localStorage.getItem(
                            "token"
                        );

                    const config = {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    };

                    const response =
                        await axios.get(
                            "https://enterprise-wms.onrender.com/products",
                            config
                        );

                    const warehouseResponse =
                        await axios.get(
                            "https://enterprise-wms.onrender.com/warehouse",
                            config
                        );

                    const inventoryResponse =
                        await axios.get(
                            "https://enterprise-wms.onrender.com/inventory",
                            config
                        );

                    const lowStockResponse =
                        await axios.get(
                            "https://enterprise-wms.onrender.com/inventory/low-stock",
                            config
                        );

                    const analyticsResponse =
                        await axios.get(
                            "https://enterprise-wms.onrender.com/inventory/warehouse-analytics",
                            config
                        );

                    const predictionResponse =
                        await axios.get(
                            "https://enterprise-wms.onrender.com/inventory/reorder-predictions",
                            config
                        );

                    const salesPredictionResponse =
                        await axios.get(
                            "https://enterprise-wms.onrender.com/inventory/sales-prediction",
                            config
                        );

                    setProductCount(
                        response.data.length
                    );

                    setWarehouseCount(
                        warehouseResponse.data.length
                    );

                    setInventoryCount(
                        inventoryResponse.data.length
                    );

                    setLowStockItems(
                        lowStockResponse.data
                    );

                    setAnalyticsData(
                        analyticsResponse.data
                    );
                    setPredictions(
                        predictionResponse.data
                    );
                    setSalesPrediction(
                        salesPredictionResponse.data
                    );
                } catch (error) {

                    console.log(error);
                }
            };

        fetchDashboardData();

    }, []);
    const askWarehouseAI =
        async () => {

            try {

                const response =
                    await axios.get(

                        "https://enterprise-wms.onrender.com/ai/ask",

                        {
                            params: {
                                question:
                                aiQuestion,
                            },
                        }
                    );

                setAiResponse(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    const handleLogout =
        () => {

            localStorage.removeItem(
                "token"
            );
            localStorage.removeItem(
                "role"
            );

            navigate("/");
        };

    return (

        <div className="min-h-screen bg-[#03040A] text-white overflow-hidden relative flex">

            {/* Background Glow */}
            <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-violet-700/30 blur-[180px] rounded-full" />

            <div className="absolute bottom-[-200px] right-[-150px] w-[450px] h-[450px] bg-slate-400/20 blur-[180px] rounded-full" />

            <div className="absolute top-[40%] left-[35%] w-[300px] h-[300px] bg-fuchsia-500/10 blur-[140px] rounded-full" />

            <Sidebar />

            <div className="flex-1 p-12 relative z-10">

                {/* Top Profile */}
                <div className="flex justify-end mb-8">

                    <motion.div
                        whileHover={{
                            scale: 1.02,
                        }}
                        className="
                        rounded-[30px]
                        border border-white/10
                        bg-white/[0.04]
                        backdrop-blur-3xl
                        px-5 py-4
                        flex items-center gap-5
                        shadow-[0_0_50px_rgba(168,85,247,0.08)]"
                    >

                        <div
                            className="
                            w-14 h-14
                            rounded-[22px]
                            bg-gradient-to-br
                            from-violet-500
                            via-fuchsia-500
                            to-violet-700
                            flex items-center
                            justify-center
                            text-white
                            font-bold
                            text-xl
                            shadow-[0_0_35px_rgba(168,85,247,0.35)]"
                        >
                            A
                        </div>

                        <div>

                            <div className="flex items-center gap-2">

                                <h3 className="font-semibold text-lg text-white">
                                    {role}
                                </h3>

                                <div
                                    className="
                                    w-2 h-2
                                    rounded-full
                                    bg-emerald-400"
                                />

                            </div>

                            <p className="text-slate-400 text-sm">

                                {role === "ADMIN"

                                    ? "System Administrator"

                                    : "Warehouse Operator"}

                            </p>

                        </div>

                        <div className="h-10 w-[1px] bg-white/10" />

                        <button
                            onClick={handleLogout}
                            className="
                            px-5 py-3
                            rounded-[18px]
                            bg-red-500/10
                            text-red-300
                            hover:bg-red-500/20
                            transition-all
                            font-medium"
                        >
                            Logout
                        </button>

                    </motion.div>

                </div>

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

                    <div className="max-w-3xl">

                        <p className="uppercase tracking-[8px] text-slate-400 mb-5">
                            Enterprise Platform
                        </p>

                        <h1 className="text-[95px] font-black leading-[0.95] tracking-[-3px]">

                            Warehouse
                            <br />

                            <span className="
                                bg-gradient-to-r
                                from-violet-400
                                via-fuchsia-300
                                to-slate-200
                                bg-clip-text
                                text-transparent">

                                Intelligence
                            </span>

                            <br />
                            System
                        </h1>

                    </div>

                    {/* Live Control */}
                    <motion.div
                        animate={{
                            y: [0, -12, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                        }}
                        className="
                        w-[420px]
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

                            {stats.map((item, index) => (

                                <motion.div
                                    key={index}
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    className="
                                    rounded-[28px]
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
                    {/* Sales Prediction Graph */}
                    <motion.div
                        className="
    rounded-[40px]
    border border-violet-500/20
    bg-white/[0.04]
    backdrop-blur-3xl
    p-8 mb-8"
                    >

                        <div className="mb-6">

                            <h2 className="text-3xl font-bold">
                                Sales Prediction
                            </h2>

                            <p className="text-slate-400 mt-2">
                                Predicted stock depletion
                                over next 7 days
                            </p>

                        </div>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <LineChart
                                data={
                                    salesPrediction
                                }
                            >

                                <XAxis
                                    dataKey="day"
                                    stroke="#888"
                                />

                                <YAxis
                                    stroke="#888"
                                />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="stock"
                                    stroke="#a855f7"
                                    strokeWidth={4}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </motion.div>

                </motion.div>
                {/* Warehouse AI Assistant */}
                <motion.div
                    className="
    rounded-[40px]
    border border-fuchsia-500/20
    bg-white/[0.04]
    backdrop-blur-3xl
    p-8 mb-8"
                >

                    <h2 className="text-3xl font-bold">
                        🤖 Warehouse AI
                    </h2>

                    <p className="text-slate-400 mt-2 mb-6">
                        Ask inventory questions
                    </p>

                    <input
                        type="text"
                        placeholder="
        Ask WMS AI...
        "
                        value={aiQuestion}
                        onChange={(e) =>
                            setAiQuestion(
                                e.target.value
                            )
                        }
                        className="
        w-full
        p-5
        rounded-2xl
        bg-white/[0.05]
        border border-white/10
        outline-none
        text-white"
                    />

                    <motion.button
                        whileHover={{
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        onClick={
                            askWarehouseAI
                        }
                        className="
        mt-5
        px-8 py-4
        rounded-2xl
        bg-gradient-to-r
        from-violet-600
        to-fuchsia-600
        font-semibold"
                    >
                        Ask AI
                    </motion.button>

                    {aiResponse && (

                        <div
                            className="
            mt-6
            rounded-[24px]
            bg-violet-500/10
            border border-violet-500/20
            p-5
            whitespace-pre-line"
                        >

                            {aiResponse}

                        </div>

                    )}

                </motion.div>
                {/* Smart Inventory Insights */}
                <motion.div
                    whileHover={{
                        scale: 1.01,
                    }}
                    className="
    rounded-[40px]
    border border-violet-500/20
    bg-white/[0.04]
    backdrop-blur-3xl
    p-8
    h-full
    shadow-[0_0_60px_rgba(168,85,247,0.08)]"
                >

                    <div className="flex items-center gap-3 mb-6">

                        <h2 className="text-2xl font-bold">
                            Smart Inventory Insights
                        </h2>

                    </div>

                    <div className="space-y-4 max-h-[320px] overflow-y-auto">

                        {predictions.map(
                            (item, index) => (

                                <motion.div
                                    key={index}
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    className={`
rounded-[28px]
p-6
border
min-h-[180px]
transition-all
hover:scale-[1.02]

${
                                        item.priority === "HIGH"
                                            ? "border-red-500/20 bg-red-500/10"

                                            : item.priority === "MEDIUM"
                                                ? "border-yellow-500/20 bg-yellow-500/10"

                                                : "border-emerald-500/20 bg-emerald-500/10"
                                    }
`}
                                >

                                    <h3 className="font-semibold text-lg">
                                        {item.product}
                                    </h3>

                                    <p className="mt-2 text-sm">
                                        Stock:
                                        {" "}
                                        {item.currentStock}
                                    </p>

                                    <p className="text-sm">
                                        Priority:
                                        {" "}
                                        {item.priority}
                                    </p>

                                    {item.priority !==
                                        "HEALTHY" && (

                                            <p className="text-sm mt-2">
                                                Suggested reorder:
                                                {" "}
                                                {
                                                    item.suggestedReorder
                                                }
                                            </p>

                                        )}

                                </motion.div>
                            )
                        )}

                    </div>

                </motion.div>



                {/* Analytics + Low Stock */}
                <div className="grid grid-cols-3 gap-8 mt-14">

                    {/* Chart */}
                    <motion.div
                        className="
                        col-span-2
                        rounded-[40px]
                        border border-white/10
                        bg-white/[0.04]
                        backdrop-blur-3xl
                        p-8"
                    >

                        <div className="flex justify-between mb-8">

                            <div>

                                <h2 className="text-3xl font-bold">
                                    Warehouse Analytics
                                </h2>

                                <p className="text-slate-400 mt-2">
                                    Real-time warehouse inventory
                                </p>

                            </div>

                            <div className="
                                px-5 py-2
                                rounded-2xl
                                bg-violet-500/20
                                text-violet-300"
                            >
                                Live Analytics
                            </div>

                        </div>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >
                            <AreaChart data={analyticsData}>

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

                                <YAxis stroke="#888" />

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

                    {/* Low Stock Panel */}
                    <motion.div
                        whileHover={{
                            scale: 1.01,
                        }}
                        className="
                        rounded-[40px]
                        border border-red-500/20
                        bg-white/[0.04]
                        backdrop-blur-3xl
                        p-8
                        h-full
                        shadow-[0_0_60px_rgba(239,68,68,0.08)]"
                    >

                        <div className="flex items-center gap-3 mb-6">

                            <AlertTriangle
                                className="text-red-400"
                            />

                            <h2 className="text-2xl font-bold">
                                Low Stock Alerts
                            </h2>

                        </div>

                        <div className="space-y-4 max-h-[320px] overflow-y-auto">

                            {lowStockItems.length > 0 ? (

                                lowStockItems.map(
                                    (item) => (

                                        <motion.div
                                            key={item.id}
                                            whileHover={{
                                                scale: 1.02,
                                            }}
                                            className="
                                            rounded-[24px]
                                            border border-red-500/20
                                            bg-red-500/10
                                            p-5"
                                        >

                                            <h3 className="font-semibold text-lg">
                                                {
                                                    item.product
                                                        ?.productName
                                                }
                                            </h3>

                                            <p className="text-red-300 mt-2">
                                                Only {
                                                item.stockQuantity
                                            } left
                                            </p>

                                            <p className="text-slate-400 text-sm mt-2">
                                                {
                                                    item.warehouse
                                                        ?.warehouseName
                                                }
                                            </p>

                                        </motion.div>
                                    )
                                )

                            ) : (

                                <div className="
                                    h-[250px]
                                    flex items-center
                                    justify-center
                                    text-slate-400
                                    text-center"
                                >
                                    All inventory
                                    levels are healthy
                                </div>

                            )}

                        </div>

                    </motion.div>

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;