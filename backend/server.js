const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

const db = require('./db');

//Middleware

app.use(cors());
app.use(express.json());

//Test Route
app.get('/api/health', (req,res)=>{
    res.send("API Running...");
});

// Get all products
app.get('/api/products', (req,res) => {
    db.query('SELECT * FROM products',(err,results) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json(results);
    });
});

// Post products
app.post('/api/products',(req,res)=>{
    const { name, category, price, stock, status } = req.body;

    const sql = 'INSERT INTO products (name, category, price, stock, status) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, [name, category, price, stock, status], (err, result) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({message: "Product added successfully!", id: result.insertId});
    });
});

// Update product
app.put('/api/products/:id', (req,res)=>{
    const { id } = req.params;
    const { name, category, price, stock, status } = req.body;

    const sql = 'UPDATE products SET name=?, category=?, price=?, stock=?, status=? WHERE id=?';

    db.query(sql, [name, category, price, stock, status, id], (err, result) =>{
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({message: "Product updated successfully!"});
    });
});

//delete product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM products WHERE id=?', [id], (err, result) => {
        if(err){
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Product deleted successfully!" });
    });
});

//Start server
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});