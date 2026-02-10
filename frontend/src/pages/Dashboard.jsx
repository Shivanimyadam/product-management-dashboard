import { useState } from "react";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import '../styles/dashboard.css'

function Dashboard(){

    const [products, setProducts] = useState([
        {
            id: 1,
            name: "iPhone 15",
            category: "Mobile",
            price: 80000,
            stock: 12,
    status: "In Stock",
        },
        {
            id: 2,
            name: "MacBook Air",
            category: "Laptop",
            price: 120000,
            stock: 0,
    status: "Out of Stock",
        }
    ]);

    return (
        <>
        <div className="dashboard-container">
        <Header/>
        <div className="dashboard-actions">
            <input
            type="text"
            placeholder="search products..."
            className="search-input"
            />
            <button className="add-button">Add Product</button>
        </div>
        <ProductTable products={products}/>
        </div>
        </>
    );
};

export default Dashboard;