import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditArticleForm = ({ article}) => {
  const [formData, setFormData] = useState({
    title: article.title,
    content: article.content,
    category: article.category,
  });

  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Fetch categories when component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run the effect only once

  // const handleUpdate = async (formData) => {
  //   try {
  //     console.log('Article ID:', article._id);
  //     const response = await axios.put(`http://localhost:5000/articles/${article._id}`, formData);
  //     if (response.status === 200) {
  //       setSuccessMessage('Article updated successfully');
  //     } else {
  //       console.error('Error updating article:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error updating article:', error);
  //   }
  // };
  const handleUpdate = async (formData) => {
    try {
      const response = await axios.put(`http://localhost:5000/articles/edit/${article._id}`, formData);

      if (response.status === 200) {
        setSuccessMessage('Article updated successfully');

        // Reset form fields
          setFormData({
            title: '',
            content: '',
            category: '',
          });

          // Clear success message after 4 seconds
          setTimeout(() => {
            setSuccessMessage('');
          }, 4000);

      } else {
        console.error('Error updating article:', response);
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea
          className="form-control"
          name="content"
          value={formData.content}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select
          className="form-control"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Update Article
      </button>
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
    </form>
  );
};

export default EditArticleForm;
