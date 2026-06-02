import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LoginPage
    from "./pages/LoginPage";

import DashboardPage
    from "./pages/DashboardPage";

import ProductsPage
    from "./pages/ProductsPage";

import WarehousePage
    from "./pages/WarehousePage";

import InventoryPage
    from "./pages/InventoryPage";

import ProtectedRoute
    from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={
                        <LoginPage />
                    }
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* Products */}
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductsPage />
                        </ProtectedRoute>
                    }
                />

                {/* Warehouse */}
                <Route
                    path="/warehouse"
                    element={
                        <ProtectedRoute>
                            <WarehousePage />
                        </ProtectedRoute>
                    }
                />

                {/* Inventory */}
                <Route
                    path="/inventory"
                    element={
                        <ProtectedRoute>
                            <InventoryPage />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;