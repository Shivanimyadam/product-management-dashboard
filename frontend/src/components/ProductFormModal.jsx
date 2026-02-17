import { useEffect, useState } from 'react';
import '../styles/modal.css'


function ProductFormModal({ isOpen, onClose, onSubmit, editingProduct }) {
  console.log("wditing produvt", editingProduct);
  if (!isOpen) return null;

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



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      ...formData,
      id: editingProduct ? editingProduct.id : crypto.randomUUID(),
    };

    onSubmit(product);
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()} >
          <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
          {/* <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input id="name" type="text" placeholder="Enter product name" />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input id="category" type="text" placeholder="Enter category" />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input id="price" type="number" placeholder="Enter price" />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input id="stock" type="number" placeholder="Enter stock" />
          </div> */}

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


