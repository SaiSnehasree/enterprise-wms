import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Package2,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

function ProductsPage() {

    const [products, setProducts] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [showModal,
        setShowModal] =
        useState(false);

    const [isEditing,
        setIsEditing] =
        useState(false);

    const [selectedId,
        setSelectedId] =
        useState(null);

    const [newProduct,
        setNewProduct] =
        useState({
            productName: "",
            price: "",
            quantity: "",
            description: "",
            sku: "",
        });

    useEffect(() => {
        fetchProducts();
    }, []);


// FETCH PRODUCTS
    const fetchProducts =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await axios.get(
                        "http://localhost:8080/products",
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                setProducts(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };


// ADD PRODUCT
    const handleAddProduct =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const productData = {
                    ...newProduct,

                    price: Number(
                        newProduct.price
                    ),

                    quantity: Number(
                        newProduct.quantity
                    ),
                };

                await axios.post(
                    "http://localhost:8080/products",
                    productData,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

                fetchProducts();

                resetForm();

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to add product ❌"
                );
            }
        };


// DELETE PRODUCT
    const handleDeleteProduct =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    "Delete this product?"
                );

            if (!confirmDelete)
                return;

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                await axios.delete(
                    `http://localhost:8080/products/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

                fetchProducts();

            } catch (error) {

                console.log(error);

                alert(
                    "Delete failed ❌"
                );
            }
        };


// OPEN EDIT MODAL
    const openEditModal =
        (product) => {

            setIsEditing(true);

            setSelectedId(
                product.id
            );

            setNewProduct({
                productName:
                product.productName,
                price:
                product.price,
                quantity:
                product.quantity,
                description:
                product.description,
                sku:
                product.sku,
            });

            setShowModal(true);
        };


// UPDATE PRODUCT
    const handleUpdateProduct =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const updatedProduct = {
                    ...newProduct,

                    price: Number(
                        newProduct.price
                    ),

                    quantity: Number(
                        newProduct.quantity
                    ),
                };

                await axios.put(
                    `http://localhost:8080/products/${selectedId}`,
                    updatedProduct,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

                fetchProducts();

                resetForm();

            } catch (error) {

                console.log(error);

                alert(
                    "Update failed ❌"
                );
            }
        };


// RESET FORM
    const resetForm = () => {

        setShowModal(false);

        setIsEditing(false);

        setSelectedId(null);

        setNewProduct({
            productName: "",
            price: "",
            quantity: "",
            description: "",
            sku: "",
        });
    };


// SEARCH
    const filteredProducts =
        products.filter(
            (product) =>
                product.productName
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );
    return (
        <div className="min-h-screen bg-[#03040A] text-white relative overflow-hidden p-10">

            {/* Background Glow */}
            <div className="absolute top-[-180px] left-[-180px] w-[550px] h-[550px] bg-violet-700/20 blur-[180px] rounded-full" />

            <div className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] bg-fuchsia-500/10 blur-[180px] rounded-full" />

            <div className="relative z-10">

                {/* Hero */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="flex justify-between items-center"
                >

                    <div>

                        <p className="uppercase tracking-[8px] text-slate-500 mb-4">
                            Enterprise Inventory
                        </p>

                        <h1
                            className="text-[72px]
              font-black
              leading-[0.95]
              tracking-[-3px]"
                        >
                            Product
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
                        </h1>

                        <p className="text-slate-400 text-lg mt-6 max-w-xl">
                            Manage enterprise inventory
                            with a premium command
                            center experience.
                        </p>

                    </div>

                    <motion.button
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        onClick={() => {

                            setIsEditing(false);

                            setNewProduct({
                                productName: "",
                                price: "",
                                quantity: "",
                                description: "",
                                sku: "",
                            });

                            setShowModal(true);
                        }}
                        className="flex items-center gap-3
            px-7 py-4 rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-600
            font-medium
            shadow-[0_0_40px_rgba(139,92,246,0.25)]"
                    >
                        <Plus size={20} />
                        Add Product
                    </motion.button>

                </motion.div>

                {/* Search */}
                <div className="relative mt-12">

                    <Search
                        className="absolute
            left-5 top-5
            text-slate-500"
                    />

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full
            rounded-[28px]
            bg-white/[0.04]
            border border-white/10
            p-5 pl-14
            outline-none
            text-lg"
                    />

                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-3 gap-8 mt-12">

                    {filteredProducts.map(
                        (product, index) => (

                            <motion.div
                                key={index}
                                whileHover={{
                                    y: -8,
                                }}
                                className="rounded-[32px]
              border border-white/10
              bg-[#0B1120]/90
              p-8 shadow-2xl"
                            >

                                <div className="flex justify-between items-center">

                                    <div
                                        className="w-14 h-14
                  rounded-2xl
                  bg-violet-500/10
                  border border-violet-500/20
                  flex items-center
                  justify-center"
                                    >
                                        <Package2 />
                                    </div>

                                    <div
                                        className="px-4 py-2
                  rounded-2xl
                  bg-emerald-500/10
                  text-emerald-300
                  text-sm"
                                    >
                                        Active
                                    </div>

                                </div>

                                <h2 className="text-2xl font-bold mt-8">
                                    {product.productName}
                                </h2>

                                <p className="text-slate-500 mt-2">
                                    ID: {product.id}
                                </p>

                                <div className="space-y-4 mt-8">

                                    <div className="flex justify-between">
                  <span className="text-slate-400">
                    Price
                  </span>

                                        <span>
                    ₹{product.price}
                  </span>
                                    </div>

                                    <div className="flex justify-between">
                  <span className="text-slate-400">
                    Quantity
                  </span>

                                        <span>
                    {product.quantity}
                  </span>
                                    </div>

                                </div>

                                <div className="flex gap-4 mt-10">

                                    <button
                                        onClick={() =>
                                            openEditModal(product)
                                        }
                                        className="flex-1 py-4 rounded-2xl
    bg-blue-500/10
    text-blue-300
    flex items-center
    justify-center gap-2"
                                    >
                                        <Pencil size={18} />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDeleteProduct(
                                                product.id
                                            )
                                        }
                                        className="flex-1 py-4 rounded-2xl
    bg-red-500/10
    text-red-300
    flex items-center
    justify-center gap-2"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>

                                </div>

                            </motion.div>
                        ))}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 px-6">

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-[#0B1120] overflow-hidden"
                    >

                        <div className="p-10 border-b border-white/10">

                            <h2 className="text-4xl font-bold">
                                {isEditing
                                    ? "Edit Product"
                                    : "Add Product"}
                            </h2>

                            <p className="text-slate-400 mt-3">
                                {isEditing
                                    ? "Update product details"
                                    : "Create new inventory item"}
                            </p>

                        </div>

                        <div className="p-10">

                            <div className="grid grid-cols-2 gap-5">

                                <input
                                    placeholder="Product Name"
                                    value={newProduct.productName}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            productName:
                                            e.target.value,
                                        })
                                    }
                                    className="bg-[#111827]
                        border border-white/10
                        rounded-2xl
                        px-5 py-4
                        outline-none"
                                />

                                <input
                                    placeholder="SKU"
                                    value={newProduct.sku}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            sku:
                                            e.target.value,
                                        })
                                    }
                                    className="bg-[#111827]
                        border border-white/10
                        rounded-2xl
                        px-5 py-4
                        outline-none"
                                />

                                <input
                                    type="number"
                                    placeholder="Price"
                                    value={newProduct.price}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            price:
                                            e.target.value,
                                        })
                                    }
                                    className="bg-[#111827]
                        border border-white/10
                        rounded-2xl
                        px-5 py-4
                        outline-none"
                                />

                                <input
                                    type="number"
                                    placeholder="Quantity"
                                    value={newProduct.quantity}
                                    onChange={(e) =>
                                        setNewProduct({
                                            ...newProduct,
                                            quantity:
                                            e.target.value,
                                        })
                                    }
                                    className="bg-[#111827]
                        border border-white/10
                        rounded-2xl
                        px-5 py-4
                        outline-none"
                                />

                            </div>

                            <textarea
                                rows={4}
                                placeholder="Description"
                                value={newProduct.description}
                                onChange={(e) =>
                                    setNewProduct({
                                        ...newProduct,
                                        description:
                                        e.target.value,
                                    })
                                }
                                className="w-full mt-5
                    bg-[#111827]
                    border border-white/10
                    rounded-2xl
                    px-5 py-4
                    outline-none
                    resize-none"
                            />

                            <div className="flex justify-end gap-4 mt-8">

                                <button
                                    onClick={resetForm}
                                    className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5"
                                >
                                    Cancel
                                </button>

                                <motion.button
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    onClick={() =>
                                        isEditing
                                            ? handleUpdateProduct()
                                            : handleAddProduct()
                                    }
                                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600"
                                >
                                    {isEditing
                                        ? "Update Product"
                                        : "Add Product"}
                                </motion.button>

                            </div>

                        </div>

                    </motion.div>

                </div>
            )}
        </div>
    );
}

export default ProductsPage;