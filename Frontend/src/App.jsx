import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import SubmitComplaint from './pages/SubmitComplaint';
import Complaints from './pages/Complaints';
import ComplaintDetails from './pages/ComplaintDetails';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/submit" element={<SubmitComplaint />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/complaints/:id" element={<ComplaintDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} TransitCare Sri Lanka. A university hackathon project.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
