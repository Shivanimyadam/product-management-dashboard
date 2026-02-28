import { useEffect, useState } from 'react';
import '../styles/modal.css'


function ProductFormModal({ isOpen, onClose, onSubmit, editingProduct }) {

  const emptyForm = {
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "In Stock",
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData(emptyForm);
    }
  }, [editingProduct, isOpen]);

    if (!isOpen) return null;


  const handleChange = (e) => {
   const { name, value } = e.target;
    
    let updatedForm = { ...formData, [name]: value };

    // If stock is 0 set status to Out of Stock automatically
    if (name === 'stock' && parseInt(value) === 0) {
        updatedForm.status = 'Out of Stock';
    }

    // If stock is more than 0 set status to In Stock automatically
    if (name === 'stock' && parseInt(value) > 0) {
        updatedForm.status = 'In Stock';
    }

    setFormData(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     const updatedForm = { ...formData };

    // If status is Out of Stock, set stock to 0
    if (updatedForm.status === 'Out of Stock') {
        updatedForm.stock = 0;
    }

    const product = editingProduct
      ? { ...updatedForm, id: editingProduct.id } // editing - keep id
      : { ...updatedForm }; // adding - no id, let MySQL generate it

    onSubmit(product);
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()} >
          <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
          <form onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />

            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />

            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
            <div className="modal-actions">
              <button type="button" className="btn cancel" onClick={onClose}>Cancel</button>
              <button className="btn primary" type="submit">{editingProduct ? "Update" : "Add"}</button>
            </div>

          </form>


        </div>
      </div>
    </>
  );
};

export default ProductFormModal;


