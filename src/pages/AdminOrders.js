import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/AdminOrders.css';

const AdminOrders = () => {
  const { orders } = useContext(AppContext);

  return (
    <div className="admin-orders">
      <h2>Admin Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order ID: {order.id} - Total: ${order.total} - Customer: {order.customer.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;