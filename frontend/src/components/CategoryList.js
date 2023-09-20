import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${categoryId}`);
      setCategories(prevCategories => prevCategories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Categories</h2>
            <ul className="list-group list-group-flush">
              {categories.map((category) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={category._id}>
                  {category.name}
                  <div>
                    <button className="btn btn-danger mx-2" onClick={() => handleDelete(category._id)}>Delete</button>
                    <button className="btn btn-primary">Edit</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
