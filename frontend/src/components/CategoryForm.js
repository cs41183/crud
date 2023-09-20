// CategoryForm.js
import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const[successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/categories', {
        name,
      });

      console.log('Category created:', response.data);

      //Reset the input field after successful submission
      setName('');

      //Display success message
      setSuccessMessage('Category was added succesfully');


      // Clear the success message after a few seconds (optional)
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear after 5 seconds (adjust the time as needed)

    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Add Category</h2>
            {successMessage && <p className="text-success text-center">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
