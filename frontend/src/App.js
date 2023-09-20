// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleForm from './components/ArticleForm';
import CategoryForm from './components/CategoryForm';
import ArticleList from './components/ArticleList';
import CategoryList from './components/CategoryList';
// import EditArticleForm from './components/EditArticleForm';

const App = () => {
  return (
    <Router>
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className='container'>
        <Link className="navbar-brand" to="/articles">CRUD MERN</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/articles">Articles</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/articles/add">Shto nje artikull</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories/add">Shto nje kategori</Link>
          </li>
        </ul>
      </div>
        </div>
      
    </nav>
        <Routes>
          <Route path="/articles" element={<ArticleList/>} />
          <Route path="/articles/add" element={<ArticleForm/>} />
          <Route path="/categories"  element={<CategoryList/>} />
          <Route path="/categories/add" element={<CategoryForm/>} />
          {/* <Route path="/articles/edit/:id" element={<EditArticleForm/>} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
