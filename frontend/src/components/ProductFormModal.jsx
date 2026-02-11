import '../styles/modal.css'


function ProductFormModal({isOpen, onClose}){
    if(!isOpen) return null;
    return (
        <>
            <div className="modal-backdrop">
                <div className="modal-card">
                    <h3>Add/Edit Product</h3>
                    <div className="form-group">
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
        </div>
                     <div className="modal-actions">
                    <button className="btn cancel" onClick={onClose}>Cancel</button>
                    <button className="btn primary">Save</button>
                </div>
                </div>
            </div>
        </>
    );
};

export default ProductFormModal;