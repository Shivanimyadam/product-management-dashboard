import '../styles/modal.css'

function ConfirmDeleteModal({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (
        <>
            <div className="modal-backdrop">
                <div className="modal-card">
                    <h3>Delete Product</h3>
                    <p>Are you sure you want to delete this product?</p>
                    <div className="modal-actions">
                        <button className="btn cancel" onClick={onClose}>Cancel</button>
                        <button className="btn danger">Delete</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ConfirmDeleteModal;