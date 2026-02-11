import '../styles/ProductTable.css'

function ProductTable({ products, onDelete }) {

    return (
        <>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" className='empty-text'>
                                    No products available
                                </td>
                            </tr>) : (
                            products.map((products) => (
                                <tr key={products.id}>
                                    <td>{products?.id}</td>
                                    <td>{products?.name}</td>
                                    <td>{products?.category}</td>
                                    <td>{products?.price}</td>
                                    <td>{products?.stock}</td>
                                    <td>
                                        <span
                                            className={`status-badge ${products.status === "In Stock" ? "in-stock" : "out-stock"
                                                }`}
                                        >
                                            {products.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className='table-btn'>Edit</button>
                                        <button className='table-btn delete' onClick={() => onDelete(products.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProductTable;