import { Link } from 'react-router-dom';
import { ShieldAlert, Users, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="animate-fade-in flex-col gap-8">
      {/* Hero Section */}
      <section className="text-center py-12 flex-col gap-6 items-center">
        <h1 className="text-5xl font-extrabold mb-4 hero-text-gradient">
          Public Transport Complaint System
        </h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          Empowering Sri Lankan passengers to report issues, track resolutions, and help improve our public transportation network.
        </p>
        <div className="flex flex-col md-flex-row justify-center gap-4">
          <Link to="/submit" className="btn btn-primary text-lg">
            <ShieldAlert className="h-5 w-5" />
            Report a Complaint
          </Link>
          <Link to="/complaints" className="btn btn-secondary text-lg">
            <Users className="h-5 w-5" />
            View Complaints
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md-grid-cols-3 gap-8 py-8 mt-8">
        <div className="card">
          <div className="card-icon-wrapper icon-danger">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Easy Reporting</h3>
          <p className="text-muted">Submit complaints quickly with details like route number, location, and issue type (e.g. overcharging, reckless driving).</p>
        </div>
        
        <div className="card">
          <div className="card-icon-wrapper icon-primary">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Transparent Tracking</h3>
          <p className="text-muted">Search and filter existing complaints. Watch as statuses move from Pending to Under Review, and finally Resolved.</p>
        </div>

        <div className="card">
          <div className="card-icon-wrapper icon-success">
            <TrendingUp className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-2">Data Insights</h3>
          <p className="text-muted">View real-time statistics on our dashboard to see the most common issues and problematic routes.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
