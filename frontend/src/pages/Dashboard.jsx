import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import '../styles/dashboard.css'
import ProductFormModal from "../components/ProductFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import toast from "react-hot-toast";

function Dashboard() {

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch all products from API.
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    }, []);

    const handleDelete = (id) => {
        setSelectedProductId(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        // using delete api
        fetch(`${import.meta.env.VITE_API_URL}/api/products/${selectedProductId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                setProducts((prev) => prev.filter(p => p.id !== selectedProductId));
                setShowDeleteModal(false);
                setSelectedProductId(null);
                toast.success("Product deleted successfully!");  // ✅ add this
            })
            .catch(err => {
                console.error("Error deleting products:", err);
                toast.error("Failed to delete product!");
            });
    };
    // handle add 
    const handleAdd = () => {
        setEditingProduct(null);
        setShowFormModal(true);

    };
    // handle edit
    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowFormModal(true);
    };

    const handleSaveProduct = (product) => {
        if (editingProduct) {
            // using edit 'PUT' api
            fetch(`${import.meta.env.VITE_API_URL}/api/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            })
                .then(res => res.json())
                .then(() => {
                    setProducts((prev) =>
                        prev.map(item => item.id === product.id ? product : item)
                    );
                    toast.success("Product updated successfully!");  // ✅ add this
                })
                .catch(err => {
                    console.error("Error updating products:", err);
                    toast.error("Failed to update product!");

                });

        } else {
            // using 'POST'- adding api
            fetch(`${import.meta.env.VITE_API_URL}/api/products/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            })
                .then(res => res.json())
                .then((data) => {
                    setProducts((prev) => [...prev, { ...product, id: data.id }]);
                    toast.success("Product added successfully!");  // ✅ add this
                })
                .catch(err => {
                    console.error("Error adding products:", err);
                    toast.error("Failed to add product!");

                });
        }
        // setShowFormModal(false);
    };

    const handleCloseForm = () => {
        setShowFormModal(false);
        setEditingProduct(null); // 🔥 VERY IMPORTANT
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="dashboard-container">
                <Header />
                <div className="dashboard-actions">
                    <input
                        type="text"
                        placeholder="search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="add-button"
                        onClick={handleAdd}
                    >Add Product</button>
                </div>
                <ProductTable
                    products={filteredProducts} //products
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
                <ProductFormModal
                    isOpen={showFormModal}
                    onClose={handleCloseForm}
                    onSubmit={handleSaveProduct}
                    editingProduct={editingProduct}
                />
                <ConfirmDeleteModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirmDelete}
                />
            </div>
        </>
    );
};

export default Dashboard;