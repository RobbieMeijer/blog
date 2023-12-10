import Navigation from './components/Navigation';
import { Route, Router } from 'react-router-dom';
import BlogForm from './components/BlogForm';
import BlogPreview from './components/BlogPreview';
import BlogArchive from './components/BlogArchive';
import './App.css';

function App() {
  return (
    <Router>
      <div className="blog">
        <header className="blog__header">
          <Navigation />
        </header>
        <Route path="/" exact>
          <aside className="blog__sidebar">
            <BlogForm />
          </aside>
          <main className="blog__main-content">
            <BlogPreview />
          </main>
        </Route>
        <Route path="/archive">
          <BlogArchive />
        </Route>
      </div>
    </Router>
  );
}

export default App;
