import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import BlogForm from './components/BlogForm';
import BlogPreview from './components/BlogPreview';
import BlogArchive from './components/BlogArchive';

const App = () => {
  return (
    <Router>
      <div className="blog">
        <header className="blog__header">
          <div className="blog__header-container">
            <Navigation />
          </div>
          <Routes>
            <Route
              path="/blog"
              element={<h1 className="blog__header-title">Blog</h1>}
            />
          </Routes>
        </header>
        <div className="blog__content">
          <Routes>
            <Route path="/" element={<BlogForm />} />
          </Routes>
          <main className="blog__main-content">
            <Routes>
              <Route path="/" element={<BlogPreview />} />
              <Route path="/blog" element={<BlogArchive />} />
            </Routes>
          </main>
        </div>
        <footer className="blog__footer">copyright text</footer>
      </div>
    </Router>
  );
};

export default App;
