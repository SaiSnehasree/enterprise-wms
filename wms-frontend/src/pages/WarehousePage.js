import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Building2,
    Package,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function WarehousePage() {
    const [warehouses, setWarehouses] = useState([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [newWarehouse, setNewWarehouse] = useState({
        warehouseName: "",
        location: "",
        capacity: "",
    });

    const API_URL = "http://localhost:8080/warehouse";

    useEffect(() => {
        fetchWarehouses();
    }, []);

    // =========================
    // FETCH WAREHOUSES
    // =========================
    const fetchWarehouses = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setWarehouses(response.data || []);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    // =========================
    // ADD WAREHOUSE
    // =========================
    const handleAddWarehouse = async () => {
        try {
            const token = localStorage.getItem("token");

            const warehouseData = {
                ...newWarehouse,
                capacity: Number(newWarehouse.capacity),
            };

            await axios.post(API_URL, warehouseData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchWarehouses();
            resetForm();
        } catch (error) {
            console.error(error);
            alert("Failed to add warehouse ❌");
        }
    };

    // =========================
    // DELETE WAREHOUSE
    // =========================
    const handleDeleteWarehouse = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this warehouse?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchWarehouses();
        } catch (error) {
            console.error(error);
            alert("Delete failed ❌");
        }
    };

    // =========================
    // OPEN EDIT MODAL
    // =========================
    const openEditModal = (warehouse) => {
        setIsEditing(true);
        setSelectedId(warehouse.id);

        setNewWarehouse({
            warehouseName: warehouse.warehouseName,
            location: warehouse.location,
            capacity: warehouse.capacity,
        });

        setShowModal(true);
    };

    // =========================
    // UPDATE WAREHOUSE
    // =========================
    const handleUpdateWarehouse = async () => {
        try {
            const token = localStorage.getItem("token");

            const updatedWarehouse = {
                ...newWarehouse,
                capacity: Number(newWarehouse.capacity),
            };

            await axios.put(
                `${API_URL}/${selectedId}`,
                updatedWarehouse,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchWarehouses();
            resetForm();
        } catch (error) {
            console.error(error);
            alert("Update failed ❌");
        }
    };

    // =========================
    // RESET FORM
    // =========================
    const resetForm = () => {
        setShowModal(false);
        setIsEditing(false);
        setSelectedId(null);

        setNewWarehouse({
            warehouseName: "",
            location: "",
            capacity: "",
        });
    };

    // =========================
    // SEARCH FILTER
    // =========================
    const filteredWarehouses = warehouses.filter(
        (warehouse) =>
            warehouse.warehouseName
                ?.toLowerCase()
                .includes(search.toLowerCase())
    );

    // =========================
    // TOTAL CAPACITY
    // =========================
    const totalCapacity = warehouses.reduce(
        (total, item) =>
            total + (Number(item.capacity) || 0),
        0
    );

    return (
        <div className="min-h-screen bg-[#03040A] text-white relative overflow-hidden flex">
            {/* Background Glow */}
            <div className="absolute top-[-180px] left-[-180px] w-[550px] h-[550px] bg-violet-700/20 blur-[180px] rounded-full" />

            <div className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] bg-fuchsia-500/10 blur-[180px] rounded-full" />

            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 p-6 md:p-10 relative z-10 overflow-y-auto h-screen">
                {/* ================= HERO ================= */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col xl:flex-row justify-between gap-10"
                >
                    {/* LEFT */}
                    <div className="max-w-3xl">
                        <p className="uppercase tracking-[8px] text-slate-500 mb-5 text-sm">
                            Enterprise Warehouse System
                        </p>

                        <h1 className="text-[55px] md:text-[90px] font-black leading-[0.92] tracking-[-4px]">
                            Warehouse
                            <br />
                            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-slate-200 bg-clip-text text-transparent">
                Intelligence
              </span>
                        </h1>

                        <p className="text-slate-400 text-lg md:text-xl mt-8 leading-9 max-w-2xl">
                            Futuristic enterprise warehouse
                            operations platform with live
                            inventory infrastructure,
                            intelligent storage control and
                            real-time warehouse analytics.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-5 mt-10">
                            <div className="px-6 py-5 rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-3xl min-w-[220px]">
                                <p className="text-slate-400 text-sm">
                                    Warehouses
                                </p>

                                <h3 className="text-3xl font-bold mt-2">
                                    {warehouses.length}
                                </h3>
                            </div>

                            <div className="px-6 py-5 rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-3xl min-w-[220px]">
                                <p className="text-slate-400 text-sm">
                                    Total Capacity
                                </p>

                                <h3 className="text-3xl font-bold mt-2">
                                    {totalCapacity}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                        }}
                        className="w-full xl:w-[420px] rounded-[40px] border border-white/10 bg-white/[0.05] backdrop-blur-3xl p-8 shadow-[0_0_80px_rgba(139,92,246,0.15)]"
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold">
                                Live Warehouse Grid
                            </h2>

                            <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.9)]" />
                        </div>

                        <div className="space-y-5 mt-8">
                            {filteredWarehouses
                                .slice(0, 3)
                                .map((warehouse) => (
                                    <div
                                        key={warehouse.id}
                                        className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                                    >
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg">
                                                    {
                                                        warehouse.warehouseName
                                                    }
                                                </h3>

                                                <p className="text-slate-400 mt-2">
                                                    {warehouse.location}
                                                </p>
                                            </div>

                                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                                                <Building2 />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </motion.div>
                </motion.div>

            {/* ================= SEARCH BAR ================= */}
                <div className="relative mt-14">
                    <Search className="absolute left-5 top-5 text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search warehouse..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full rounded-[28px] bg-white/[0.04] border border-white/10 p-5 pl-14 outline-none text-lg backdrop-blur-2xl focus:border-violet-500 transition-all"
                    />
                </div>

                {/* ================= HEADER ================= */}
                <div className="flex items-center justify-between mt-12">
                    <div>
                        <h2 className="text-3xl font-bold">
                            Warehouse Overview
                        </h2>

                        <p className="text-slate-400 mt-2">
                            Manage and monitor all warehouse
                            operations.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setShowModal(true);
                        }}
                        className="flex items-center gap-3 px-7 py-4 rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition-all shadow-[0_0_40px_rgba(139,92,246,0.35)]"
                    >
                        <Plus size={20} />
                        Add Warehouse
                    </button>
                </div>

                {/* ================= CARDS ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
                    {filteredWarehouses.length > 0 ? (
                        filteredWarehouses.map(
                            (warehouse) => (
                                <motion.div
                                    key={warehouse.id}
                                    whileHover={{ y: -8 }}
                                    className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#111827]/90 to-[#0B1120]/90 backdrop-blur-3xl p-8 shadow-[0_0_80px_rgba(139,92,246,0.08)] hover:shadow-[0_0_100px_rgba(139,92,246,0.18)] transition-all duration-500 relative overflow-hidden"
                                >
                                    {/* Glow */}
                                    <div className="absolute top-[-60px] right-[-60px] w-44 h-44 bg-violet-500/10 blur-[100px] rounded-full" />

                                    {/* Header */}
                                    <div className="flex justify-between items-center">
                                        <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                                            <Building2 />
                                        </div>

                                        <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-300 text-sm">
                                            Active
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl font-bold mt-8">
                                        {
                                            warehouse.warehouseName
                                        }
                                    </h2>

                                    {/* Details */}
                                    <div className="space-y-4 mt-8">
                                        <div className="flex justify-between">
                      <span className="text-slate-400">
                        Location
                      </span>

                                            <span>
                        {warehouse.location}
                      </span>
                                        </div>

                                        <div className="flex justify-between">
                      <span className="text-slate-400">
                        Capacity
                      </span>

                                            <span>
                        {warehouse.capacity}
                      </span>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-4 mt-10">
                                        <button
                                            onClick={() =>
                                                openEditModal(
                                                    warehouse
                                                )
                                            }
                                            className="flex-1 py-4 rounded-2xl bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Pencil size={18} />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDeleteWarehouse(
                                                    warehouse.id
                                                )
                                            }
                                            className="flex-1 py-4 rounded-2xl bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                                        >
                                            <Trash2 size={18} />
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        )
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[36px] py-20 bg-white/[0.03]">
                            <Package
                                size={60}
                                className="text-slate-500"
                            />

                            <h2 className="text-2xl font-bold mt-5">
                                No Warehouses Found
                            </h2>

                            <p className="text-slate-400 mt-2">
                                Add a warehouse or try another
                                search.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 px-6">
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.95,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0B1120] overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.25)]"
                    >
                        {/* Header */}
                        <div className="p-10 border-b border-white/10">
                            <h2 className="text-4xl font-bold">
                                {isEditing
                                    ? "Edit Warehouse"
                                    : "Add Warehouse"}
                            </h2>

                            <p className="text-slate-400 mt-2">
                                {isEditing
                                    ? "Update warehouse details."
                                    : "Create a new warehouse."}
                            </p>
                        </div>

                        {/* Form */}
                        <div className="p-10 grid gap-5">
                            <input
                                placeholder="Warehouse Name"
                                value={
                                    newWarehouse.warehouseName
                                }
                                onChange={(e) =>
                                    setNewWarehouse({
                                        ...newWarehouse,
                                        warehouseName:
                                        e.target.value,
                                    })
                                }
                                className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-all"
                            />

                            <input
                                placeholder="Location"
                                value={
                                    newWarehouse.location
                                }
                                onChange={(e) =>
                                    setNewWarehouse({
                                        ...newWarehouse,
                                        location:
                                        e.target.value,
                                    })
                                }
                                className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-all"
                            />

                            <input
                                type="number"
                                placeholder="Capacity"
                                value={
                                    newWarehouse.capacity
                                }
                                onChange={(e) =>
                                    setNewWarehouse({
                                        ...newWarehouse,
                                        capacity:
                                        e.target.value,
                                    })
                                }
                                className="bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-all"
                            />

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={resetForm}
                                    className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() =>
                                        isEditing
                                            ? handleUpdateWarehouse()
                                            : handleAddWarehouse()
                                    }
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition-all"
                                >
                                    {isEditing
                                        ? "Update"
                                        : "Add"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default WarehousePage;