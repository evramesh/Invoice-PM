import { useState, useEffect } from "react";
import "./styles.css";

const InvoicePage = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    storeName: "",
    orderId: "",
    date: "",
    item: "",
    quantity: "",
    regularPrice: "",
    dealPrice: "",
    tax: "",
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setUsers(storedUsers);
    setInvoices(storedInvoices);
  }, []);

  const addUser = () => {
    if (username.trim() !== "") {
      const updatedUsers = [...users, { id: users.length + 1, name: username }];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsername("");
    }
  };

  const handleInputChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  const addInvoice = () => {
    if (invoiceData.storeName && invoiceData.orderId) {
      const newInvoice = {
        storeName: invoiceData.storeName,
        orders: [
          {
            orderId: invoiceData.orderId,
            date: invoiceData.date,
            item: invoiceData.item,
            quantity: parseInt(invoiceData.quantity),
            regularPrice: parseFloat(invoiceData.regularPrice),
            dealPrice: parseFloat(invoiceData.dealPrice),
            tax: parseFloat(invoiceData.tax),
          },
        ],
      };
      const updatedInvoices = [...invoices, newInvoice];
      setInvoices(updatedInvoices);
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

      setInvoiceData({
        storeName: "",
        orderId: "",
        date: "",
        item: "",
        quantity: "",
        regularPrice: "",
        dealPrice: "",
        tax: "",
      });
    }
  };

  return (
    <div className="container">
      <h1>Invoice Portal</h1>

      <div className="user-section">
        <h2>Add Store Owner</h2>
        <input
          type="text"
          placeholder="Enter store owner name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <div className="user-list">
        <h2>Store Owners</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

      <div className="invoice-section">
        <h2>Add Invoice</h2>
        <input
          type="text"
          name="storeName"
          placeholder="Store Name"
          value={invoiceData.storeName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={invoiceData.orderId}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={invoiceData.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="item"
          placeholder="Item Name"
          value={invoiceData.item}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={invoiceData.quantity}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="regularPrice"
          placeholder="Regular Price"
          value={invoiceData.regularPrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="dealPrice"
          placeholder="Deal Price"
          value={invoiceData.dealPrice}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="tax"
          placeholder="Tax"
          value={invoiceData.tax}
          onChange={handleInputChange}
        />
        <button onClick={addInvoice}>Add Invoice</button>
      </div>

      {invoices.map((store, index) => (
        <div key={index} className="invoice-card">
          <h2>{store.storeName}</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Regular Price</th>
                <th>Deal Price</th>
                <th>Item Total</th>
                <th>Tax</th>
              </tr>
            </thead>
            <tbody>
              {store.orders.map((order, idx) => (
                <tr key={idx}>
                  <td>{order.orderId}</td>
                  <td>{order.date}</td>
                  <td>{order.item}</td>
                  <td>{order.quantity}</td>
                  <td>${order.regularPrice}</td>
                  <td>${order.dealPrice}</td>
                  <td>${order.quantity * order.dealPrice}</td>
                  <td>${order.tax}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totals">
            <p>
              <strong>Grand Total (Without Tax):</strong> $
              {store.orders.reduce(
                (acc, order) => acc + order.quantity * order.dealPrice,
                0
              )}
            </p>
            <p>
              <strong>Grand Total (With Tax):</strong> $
              {store.orders.reduce(
                (acc, order) =>
                  acc + order.quantity * order.dealPrice + order.tax,
                0
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoicePage;
