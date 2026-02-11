import { useState } from "react";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import '../styles/dashboard.css'
import ProductFormModal from "../components/ProductFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function Dashboard() {

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState(null);


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

    const handleDelete = (id) => {
        setSelectedProductId(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setProducts(products.filter(p => p.id !== selectedProductId));
        setShowDeleteModal(false);
    };


    return (
        <>
            <div className="dashboard-container">
                <Header />
                <div className="dashboard-actions">
                    <input
                        type="text"
                        placeholder="search products..."
                        className="search-input"
                    />
                    <button className="add-button"
                        onClick={() => setShowFormModal(true)}
                    >Add Product</button>
                    <ProductFormModal
                        isOpen={showFormModal}
                        onClose={() => setShowFormModal(false)}
                    />
                    <ConfirmDeleteModal
                        isOpen={showDeleteModal}
                        onClose={() => setShowDeleteModal(false)}

                        onConfirm={handleConfirmDelete}
                    />
                </div>
                <ProductTable products={products} onDelete={handleDelete} />
            </div>
        </>
    );
};

export default Dashboard;