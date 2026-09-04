import React, { useState, useEffect } from 'react';
import { complaintsApi } from '../services/api';
import ComplaintCard from '../components/ComplaintCard';
import { Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';

const COMPLAINT_TYPES = [
  "Overcharging", "Reckless Driving", "Overcrowding", 
  "Bus Did Not Stop", "Poor Staff Behaviour", "Poor Vehicle Condition", "Other"
];

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [route, setRoute] = useState('');
  const [status, setStatus] = useState('');
  
  const fetchComplaints = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (search) params.search = search;
      if (type) params.type = type;
      if (route) params.route = route;
      if (status) params.status = status;

      const response = await complaintsApi.getAll(params);
      setComplaints(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load complaints. Please check if the server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial load only, manual trigger for filters to avoid excessive API calls while typing

  const handleSearch = (e) => {
    e.preventDefault();
    fetchComplaints();
  };

  const handleReset = () => {
    setSearch('');
    setType('');
    setRoute('');
    setStatus('');
    // Need to fetch without filters, but state updates are async, so we pass empty params directly
    setIsLoading(true);
    complaintsApi.getAll({})
      .then(res => setComplaints(res.data))
      .catch(() => setError("Unable to load complaints."))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Complaints Database</h1>
      </div>

      {/* Filter Section */}
      <div className="card mb-6">
        <form onSubmit={handleSearch} className="flex-col gap-4">
          <div className="grid md-grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '0 auto 0 0', paddingLeft: '0.75rem', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
                <Search className="h-4 w-4 text-muted" />
              </div>
              <input
                type="text"
                placeholder="Search keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>

            {/* Type Filter */}
            <div>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="form-control"
              >
                <option value="">All Types</option>
                {COMPLAINT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="form-control"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Route Filter */}
            <div>
              <input
                type="text"
                placeholder="Route (e.g. 138)"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button 
              type="button" 
              onClick={handleReset}
              className="btn btn-secondary"
            >
              <RefreshCw className="h-4 w-4" /> Reset
            </button>
            <button 
              type="submit"
              className="btn btn-primary"
            >
              <Filter className="h-4 w-4" /> Apply Filters
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {error && (
        <div className="card mb-6 flex items-start gap-2" style={{ background: 'var(--danger-light)', borderColor: 'var(--danger-light)' }}>
          <AlertCircle className="h-5 w-5 text-danger mt-1 flex-shrink-0" />
          <p className="text-danger">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div style={{ width: '3rem', height: '3rem', border: '2px solid var(--border-color)', borderBottomColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <span className="text-muted font-medium" style={{ marginLeft: '1rem' }}>Loading complaints...</span>
        </div>
      ) : !error && complaints.length === 0 ? (
        <div className="card text-center py-12" style={{ borderStyle: 'dashed' }}>
          <p className="text-muted text-lg">No complaints found matching your criteria.</p>
          <button 
            onClick={handleReset}
            className="text-primary mt-4" style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {complaints.map(complaint => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Complaints;
