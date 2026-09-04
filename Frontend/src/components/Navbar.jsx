import { Link, useLocation } from 'react-router-dom';
import { Bus, Home, Info, PlusCircle, List, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="nav-brand">
            <Bus className="h-6 w-6" />
            <span>TransitCare LK</span>
          </Link>
          
          <div className="nav-links">
            <Link to="/" className={isActive('/')}>
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/submit" className={isActive('/submit')}>
              <PlusCircle className="h-4 w-4" />
              <span>Report</span>
            </Link>
            <Link to="/complaints" className={isActive('/complaints')}>
              <List className="h-4 w-4" />
              <span>Complaints</span>
            </Link>
            <Link to="/dashboard" className={isActive('/dashboard')}>
              <BarChart2 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/about" className={isActive('/about')}>
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <span className="text-sm font-semibold">Menu</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
