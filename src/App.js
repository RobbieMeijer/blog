import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import BlogForm from './components/BlogForm';
import BlogPreview from './components/BlogPreview';
import BlogArchive from './components/BlogArchive';
import logo from './assets/logo.svg';

const App = () => {
  return (
    <Router>
      <div className="blog">
        <header className="blog__header">
          <img src={logo} alt="Logo" className="blog__logo" />
          <Navigation />
        </header>
        <div className="blog__content">
          <aside className="blog__sidebar">
            <Routes>
              <Route path="/" element={<BlogForm />} />
            </Routes>
          </aside>
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
