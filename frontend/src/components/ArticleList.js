// ArticleList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditArticleForm from './EditArticleForm';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    console.log(`Deleting article with ID: ${id}`);
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      console.log(`Article with ID ${id} deleted successfully`);
      setArticles(articles.filter(article => article._id !== id));
    } catch (error) {
      console.error('Error deleting article:', error);
      console.error('Error response:', error.response);
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setEditMode(true);
  };

  

  return (
      <div className="container mt-5 mx-auto">
      {editMode && selectedArticle ? (
            <EditArticleForm article={selectedArticle} />
          ) : (  
      <div className="row justify-content-center">
        {articles.map((article) => (
          <div className="col-md-4 mb-4" key={article._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.content}</p>
                <p className="card-text"><small className="text-muted">Kategoria: {article.category}</small></p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </button>
                <button
                    className="btn btn-primary mr-2"
                    onClick={() => handleEdit(article)}
                  >
                    Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default ArticleList;