import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async () => {

        try {

            const response =
                await axios.get(
                    "http://localhost:8080/auth/login"
                );

            const token =
                response.data.token;

            localStorage.setItem(
                "token",
                token
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                "Login Failed ❌"
            );

            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-[#03040A] text-white flex overflow-hidden relative">

            {/* Cinematic Glow */}
            <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-violet-700/30 blur-[180px] rounded-full" />

            <div className="absolute bottom-[-200px] right-[-150px] w-[450px] h-[450px] bg-slate-400/20 blur-[180px] rounded-full" />

            <div className="absolute top-[35%] left-[35%] w-[300px] h-[300px] bg-fuchsia-500/10 blur-[140px] rounded-full" />

            {/* Left Side */}
            <div className="flex-1 flex flex-col justify-center px-20 relative z-10">

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="uppercase tracking-[8px]
          text-slate-400 mb-5"
                >
                    Enterprise Platform
                </motion.p>

                <motion.h1
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
                    className="text-[90px]
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
                </motion.h1>

                <p className="text-slate-400 text-xl mt-8 max-w-2xl leading-9">
                    Manage inventory, warehouses,
                    products and real-time stock
                    operations through a cinematic
                    futuristic enterprise platform.
                </p>
            </div>

            {/* Login Panel */}
            <motion.div
                initial={{
                    x: 100,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,
                }}
                className="w-[480px]
        m-10 rounded-[45px]
        border border-white/10
        bg-white/[0.05]
        backdrop-blur-3xl
        p-10 shadow-2xl
        relative z-10"
            >

                <h2 className="text-4xl font-bold">
                    Welcome Back 👋
                </h2>

                <p className="text-slate-400 mt-3">
                    Sign in to access your
                    futuristic dashboard
                </p>

                <div className="mt-10 space-y-6">

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        className="w-full p-5 rounded-2xl
            bg-white/[0.05]
            border border-white/10
            outline-none text-white"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full p-5 rounded-2xl
            bg-white/[0.05]
            border border-white/10
            outline-none text-white"
                    />

                    <motion.button
                        whileHover={{
                            scale: 1.03,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        onClick={handleLogin}
                        className="w-full p-5 rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-600
            font-semibold text-lg
            shadow-[0_0_50px_rgba(168,85,247,0.4)]"
                    >
                        Enter Platform
                    </motion.button>

                </div>
            </motion.div>
        </div>
    );
}

export default LoginPage;