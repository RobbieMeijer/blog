import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import BlogForm from './components/BlogForm';
import BlogPreview from './components/BlogPreview';
import BlogArchive from './components/BlogArchive';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="blog">
        <header className="blog__header">
          <Navigation />
        </header>
        <aside className="blog__sidebar">
          <BlogForm />
        </aside>
        <main className="blog__main-content">
          <Routes>
            <Route path="/" element={<BlogPreview />} />
            <Route path="/blog" element={<BlogArchive />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
