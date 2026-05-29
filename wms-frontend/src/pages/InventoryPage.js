import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    ClipboardList,
    AlertTriangle,
    CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function InventoryPage() {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const [newItem, setNewItem] = useState({
        stockQuantity: "",
        status: "Available",
        productId: "",
        warehouseId: "",
    });

    const API_URL = "http://localhost:8080/inventory";

    useEffect(() => {
        fetchInventory();
        fetchProductsAndWarehouses();
    }, []);

    // =========================
    // FETCH DATA
    // =========================
    const fetchInventory = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInventoryItems(response.data || []);
        } catch (error) {
            console.error("Fetch Inventory Error:", error);
        }
    };

    const fetchProductsAndWarehouses = async () => {
        try {
            const token = localStorage.getItem("token");
            const prodRes = await axios.get("http://localhost:8080/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const wareRes = await axios.get("http://localhost:8080/warehouse", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(prodRes.data || []);
            setWarehouses(wareRes.data || []);
        } catch (error) {
            console.error("Fetch Products/Warehouses Error:", error);
        }
    };

    // =========================
    // ADD INVENTORY
    // =========================
    const handleAddInventory = async () => {
        if (!newItem.productId || !newItem.warehouseId || !newItem.stockQuantity) {
            alert("Please fill in all fields ❌");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const payload = {
                stockQuantity: Number(newItem.stockQuantity),
                status: newItem.status,
                product: { id: Number(newItem.productId) },
                warehouse: { id: Number(newItem.warehouseId) },
            };

            await axios.post(API_URL, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchInventory();
            resetForm();
        } catch (error) {
            console.error("Add Error:", error);
            alert("Failed to add inventory item ❌");
        }
    };

    // =========================
    // DELETE INVENTORY
    // =========================
    const handleDeleteInventory = async (id) => {
        const confirmDelete = window.confirm("Delete this inventory item?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchInventory();
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Delete failed ❌");
        }
    };

    // =========================
    // OPEN EDIT MODAL
    // =========================
    const openEditModal = (item) => {
        setIsEditing(true);
        setSelectedId(item.id);
        setNewItem({
            stockQuantity: item.stockQuantity,
            status: item.status,
            productId: item.product?.id || "",
            warehouseId: item.warehouse?.id || "",
        });
        setShowModal(true);
    };

    // =========================
    // UPDATE INVENTORY
    // =========================
    const handleUpdateInventory = async () => {
        if (!newItem.stockQuantity) {
            alert("Please fill in all fields ❌");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const payload = {
                stockQuantity: Number(newItem.stockQuantity),
                status: newItem.status,
            };

            await axios.put(`${API_URL}/${selectedId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchInventory();
            resetForm();
        } catch (error) {
            console.error("Update Error:", error);
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
        setNewItem({
            stockQuantity: "",
            status: "Available",
            productId: "",
            warehouseId: "",
        });
    };

    // =========================
    // FILTERS & STATS
    // =========================
    const filteredItems = inventoryItems.filter((item) => {
        const productMatch = item.product?.productName
            ?.toLowerCase()
            .includes(search.toLowerCase());
        const warehouseMatch = item.warehouse?.warehouseName
            ?.toLowerCase()
            .includes(search.toLowerCase());
        return productMatch || warehouseMatch;
    });

    const lowStockCount = inventoryItems.filter(
        (item) => Number(item.stockQuantity) < 10
    ).length;

    const totalStock = inventoryItems.reduce(
        (acc, item) => acc + (Number(item.stockQuantity) || 0),
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
                    <div className="max-w-3xl">
                        <p className="uppercase tracking-[8px] text-slate-500 mb-5 text-sm">
                            Enterprise Warehouse System
                        </p>

                        <h1 className="text-[55px] md:text-[90px] font-black leading-[0.92] tracking-[-4px]">
                            Stock
                            <br />
                            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-slate-200 bg-clip-text text-transparent">
                                Infrastructure
                            </span>
                        </h1>

                        <p className="text-slate-400 text-lg md:text-xl mt-8 leading-9 max-w-2xl">
                            Consolidated inventory monitoring platform with live location allocation, dynamic multi-node tracking, and real-time replenishment analytics.
                        </p>

                        {/* Stats Dashboard */}
                        <div className="flex flex-wrap gap-5 mt-10">
                            <div className="px-6 py-5 rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-3xl min-w-[220px]">
                                <p className="text-slate-400 text-sm">Total Inventory Records</p>
                                <h3 className="text-3xl font-bold mt-2">{inventoryItems.length}</h3>
                            </div>

                            <div className="px-6 py-5 rounded-[30px] border border-white/10 bg-white/[0.04] backdrop-blur-3xl min-w-[220px]">
                                <p className="text-slate-400 text-sm">Total Accumulated Stock</p>
                                <h3 className="text-3xl font-bold mt-2">{totalStock}</h3>
                            </div>

                            <div className="px-6 py-5 rounded-[30px] border border-red-500/20 bg-red-500/5 backdrop-blur-3xl min-w-[220px]">
                                <p className="text-red-400 text-sm flex items-center gap-2">
                                    <AlertTriangle size={16} /> Low Stock Warnings
                                </p>
                                <h3 className="text-3xl font-bold mt-2 text-red-400">{lowStockCount}</h3>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ================= SEARCH BAR ================= */}
                <div className="relative mt-14">
                    <Search className="absolute left-5 top-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search stock by product or warehouse..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-[28px] bg-white/[0.04] border border-white/10 p-5 pl-14 outline-none text-lg backdrop-blur-2xl focus:border-violet-500 transition-all"
                    />
                </div>

                {/* ================= SECTION HEADER ================= */}
                <div className="flex items-center justify-between mt-12">
                    <div>
                        <h2 className="text-3xl font-bold">Inventory Overview</h2>
                        <p className="text-slate-400 mt-2">Monitor all physical products stored across warehouses.</p>
                    </div>

                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setShowModal(true);
                        }}
                        className="flex items-center gap-3 px-7 py-4 rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition-all shadow-[0_0_40px_rgba(139,92,246,0.35)]"
                    >
                        <Plus size={20} />
                        Add Inventory
                    </button>
                </div>

                {/* ================= CARDS GRID ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => {
                            const isLowStock = Number(item.stockQuantity) < 10;
                            return (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ y: -8 }}
                                    className="rounded-[36px] border border-white/10 bg-gradient-to-br from-[#111827]/90 to-[#0B1120]/90 backdrop-blur-3xl p-8 shadow-[0_0_80px_rgba(139,92,246,0.08)] hover:shadow-[0_0_100px_rgba(139,92,246,0.18)] transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="absolute top-[-60px] right-[-60px] w-44 h-44 bg-violet-500/10 blur-[100px] rounded-full" />

                                    {/* Header */}
                                    <div className="flex justify-between items-center">
                                        <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                                            <ClipboardList className="text-violet-400" />
                                        </div>

                                        <div
                                            className={`px-4 py-2 rounded-2xl text-sm flex items-center gap-1.5 ${
                                                isLowStock
                                                    ? "bg-red-500/10 text-red-300 border border-red-500/20"
                                                    : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                                            }`}
                                        >
                                            {isLowStock ? (
                                                <>
                                                    <AlertTriangle size={14} />
                                                    Low Stock
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle size={14} />
                                                    Optimal
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Title */}
                                    <h2 className="text-2xl font-bold mt-8 text-white">
                                        {item.product?.productName || "Unknown Product"}
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-1">SKU: {item.product?.sku || "N/A"}</p>

                                    {/* Details */}
                                    <div className="space-y-4 mt-8 border-t border-white/5 pt-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Warehouse Node</span>
                                            <span className="text-white font-medium">
                                                {item.warehouse?.warehouseName || "N/A"}
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Warehouse Location</span>
                                            <span className="text-slate-300">
                                                {item.warehouse?.location || "N/A"}
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Status</span>
                                            <span className="text-white">{item.status}</span>
                                        </div>

                                        <div className="flex justify-between items-center text-sm bg-white/5 p-4 rounded-2xl border border-white/5 mt-5">
                                            <span className="text-slate-400">Stock Level</span>
                                            <span className={`text-2xl font-black ${isLowStock ? 'text-red-400' : 'text-emerald-400'}`}>
                                                {item.stockQuantity}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 mt-8">
                                        <button
                                            onClick={() => openEditModal(item)}
                                            className="flex-1 py-4 rounded-2xl bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2 font-medium"
                                        >
                                            <Pencil size={18} />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDeleteInventory(item.id)}
                                            className="flex-1 py-4 rounded-2xl bg-red-500/10 text-red-300 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 font-medium"
                                        >
                                            <Trash2 size={18} />
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[36px] py-20 bg-white/[0.03]">
                            <ClipboardList size={60} className="text-slate-500" />
                            <h2 className="text-2xl font-bold mt-5">No Inventory Items Found</h2>
                            <p className="text-slate-400 mt-2">Add an inventory item or check your connections.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ================= MODAL ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0B1120] overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.25)]"
                    >
                        {/* Header */}
                        <div className="p-10 border-b border-white/10">
                            <h2 className="text-4xl font-bold">
                                {isEditing ? "Edit Stock Level" : "Allocate Inventory"}
                            </h2>
                            <p className="text-slate-400 mt-2">
                                {isEditing ? "Update stock quantities." : "Allocate product instances to warehouse node."}
                            </p>
                        </div>

                        {/* Form */}
                        <div className="p-10 grid gap-5">
                            {/* Product Dropdown (disabled during edit) */}
                            <div>
                                <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                                    Product Node
                                </label>
                                <select
                                    disabled={isEditing}
                                    value={newItem.productId}
                                    onChange={(e) => setNewItem({ ...newItem, productId: e.target.value })}
                                    className="w-full bg-[#111827] text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select Product...</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.productName} (SKU: {p.sku})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Warehouse Dropdown (disabled during edit) */}
                            <div>
                                <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                                    Warehouse Destination
                                </label>
                                <select
                                    disabled={isEditing}
                                    value={newItem.warehouseId}
                                    onChange={(e) => setNewItem({ ...newItem, warehouseId: e.target.value })}
                                    className="w-full bg-[#111827] text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select Warehouse...</option>
                                    {warehouses.map((w) => (
                                        <option key={w.id} value={w.id}>
                                            {w.warehouseName} ({w.location})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantity Input */}
                            <div>
                                <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    placeholder="Quantity to store..."
                                    value={newItem.stockQuantity}
                                    onChange={(e) => setNewItem({ ...newItem, stockQuantity: e.target.value })}
                                    className="w-full bg-[#111827] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-all"
                                />
                            </div>

                            {/* Status Input */}
                            <div>
                                <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">
                                    Availability Status
                                </label>
                                <select
                                    value={newItem.status}
                                    onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                                    className="w-full bg-[#111827] text-white border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition-all appearance-none cursor-pointer"
                                >
                                    <option value="Available">Available</option>
                                    <option value="Reserved">Reserved</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                    <option value="Damaged">Damaged</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={resetForm}
                                    className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={isEditing ? handleUpdateInventory : handleAddInventory}
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition-all font-semibold"
                                >
                                    {isEditing ? "Update Stock" : "Allocate Stock"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default InventoryPage;
