import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/AdminProducts.css';

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(AppContext);
  const [form, setForm] = useState({ id: null, name: '', price: 0, description: '', category: '', image: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      updateProduct(form);
    } else {
      addProduct(form);
    }
    setForm({ id: null, name: '', price: 0, description: '', category: '', image: '' });
  };

  const edit = (p) => setForm(p);

  return (
    <div className="admin-products">
      <h2>Admin Products</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
        <button type="submit" className="btn">{form.id ? 'Update' : 'Add'} Product</button>
      </form>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
            <button onClick={() => edit(p)}>Edit</button>
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;