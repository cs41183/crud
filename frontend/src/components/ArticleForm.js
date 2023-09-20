// ArticleForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //       const response = await axios.post('http://localhost:5000/articles', {
  //       title,
  //       content,
  //       category,
  //   });

  //     console.log('Article created:', response.data);

  //     // Clear the input fields
  //     setTitle('');
  //     setContent('');
  //     setCategory('');

  //     // Show success message
  //     setSuccessMessage('Article was created successfully');

  //     // Clear the success message after a few seconds (optional)
  //     setTimeout(() => {
  //       setSuccessMessage('');
  //     }, 3000); // Clear after 5 seconds (adjust the time as needed)

  //   } catch (error) {
  //     console.error('Error creating article:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/articles', {
        title,
        content,
        category,
      });
  
      console.log('Article created:', response.data);
  
      // Fetch the category name based on the selected category ID
      const selectedCategory = categories.find(cat => cat._id === category);
  
      // Show success message with the category name
      setSuccessMessage(`Article was created successfully in category: ${selectedCategory.name}`);
  
      // Clear the input fields
      setTitle('');
      setContent('');
      setCategory('');
  
      // Clear the success message after a few seconds (optional)
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear after 3 seconds (adjust the time as needed)
  
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };
  

  return (
      <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Add Article</h2>
            {successMessage && <p className="text-success text-center">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <textarea
                  className="form-control"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="category">Select Category:</label>
                <select
                  id="category"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
