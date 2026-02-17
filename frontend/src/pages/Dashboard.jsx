import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductTable from "../components/ProductTable";
import '../styles/dashboard.css'
import ProductFormModal from "../components/ProductFormModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function Dashboard() {

    const [showFormModal, setShowFormModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedProductId, setSelectedProductId] = useState(null);

    const [editingProduct, setEditingProduct] = useState(null);



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
        setProducts((prev) => prev.filter(p => p.id !== selectedProductId));
        setShowDeleteModal(false);
    };
    // handle add 
    const handleAdd = () => {
        setEditingProduct(null);
        setShowFormModal(true);

    };
    // handle edit
    const handleEdit = (product) => {
        console.log("prodcut sending eidt",product);
        setEditingProduct(product);
        setShowFormModal(true);
    };

    const handleSaveProduct = (product) => {
        if (editingProduct) {
            setProducts((prev) =>
                prev.map(item => item.id === product.id ? product : item)
            );
        } else {
            setProducts((prev) => [...prev, product]);
        }
        // setShowFormModal(false);
    };

    const handleCloseForm = () => {
        setShowFormModal(false);
        setEditingProduct(null); // 🔥 VERY IMPORTANT
      };

      useEffect(() => {
        console.log("showFormModal:", showFormModal);
      }, [showFormModal]);
      

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
                        onClick={handleAdd}
                    >Add Product</button>
                </div>
                <ProductTable
                    products={products}
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