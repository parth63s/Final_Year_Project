import React, { useState } from 'react';
import { 
  Restaurant, 
  Add,
  Edit,
  Delete,
} from '@mui/icons-material';

function ServiceMenu() {
    const [menuItems, setMenuItems] = useState([
        {
          id: 1,
          name: 'Dal Makhani',
          category: 'Main Course',
          price: 120,
          available: true
        },
        {
          id: 2,
          name: 'Paneer Butter Masala',
          category: 'Main Course',
          price: 150,
          available: true
        }
      ]);
    return ( 
        <section className="dashboard-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="section-title">
                <Restaurant className="me-2" />
                Menu Management
              </h2>
              <button className="btn btn-primary">
                <Add className="me-2" /> Add Menu Item
              </button>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="tables table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>₹{item.price}</td>
                          <td>
                            <span className={`badge ${item.available ? 'bg-success' : 'bg-danger'}`}>
                              {item.available ? 'Available' : 'Unavailable'}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              <Edit fontSize="small" />
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                            >
                              <Delete fontSize="small" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
     );
}

export default ServiceMenu;