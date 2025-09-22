import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 4000;
const DATA_FILE = './products.json';

app.use(cors());
app.use(bodyParser.json());

// Helper to read/write products
function readProducts() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function writeProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
}

// Get all products
app.get('/api/products', (req, res) => {
  res.json(readProducts());
});

// Get product by id
app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => String(p.id) === req.params.id);
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

// Add new product
app.post('/api/products', (req, res) => {
  const products = readProducts();
  const newProduct = { ...req.body, id: Date.now().toString() };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// Update product (including stock/quantity)
app.put('/api/products/:id', (req, res) => {
  let products = readProducts();
  const idx = products.findIndex(p => String(p.id) === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  products[idx] = { ...products[idx], ...req.body };
  writeProducts(products);
  res.json(products[idx]);
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  let products = readProducts();
  products = products.filter(p => String(p.id) !== req.params.id);
  writeProducts(products);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
