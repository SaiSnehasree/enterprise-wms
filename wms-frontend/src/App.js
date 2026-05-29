import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import WarehousePage from "./pages/WarehousePage";
import InventoryPage from "./pages/InventoryPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<LoginPage />}
                />
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />
                <Route
                    path="/products"
                    element={<ProductsPage />}
                />
                <Route
                    path="/warehouse"
                    element={<WarehousePage />}
                />
                <Route
                    path="/inventory"
                    element={<InventoryPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;