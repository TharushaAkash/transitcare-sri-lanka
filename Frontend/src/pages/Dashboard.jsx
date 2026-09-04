import React, { useState, useEffect } from 'react';
import { complaintsApi } from '../services/api';
import { BarChart2, Activity, CheckCircle, Clock, AlertTriangle, Map } from 'lucide-react';

const StatCard = ({ title, value, icon, colorClass }) => (
  <div className="card flex justify-between items-center">
    <div>
      <p className="text-sm font-semibold text-muted uppercase mb-2">{title}</p>
      <p className="text-4xl font-extrabold">{value}</p>
    </div>
    <div className={`card-icon-wrapper ${colorClass}`} style={{ marginBottom: 0 }}>
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await complaintsApi.getDashboardStats();
        setStats(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard statistics.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-red-200">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in flex-col gap-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-primary" />
          Complaint Analytics Dashboard
        </h1>
      </div>

      <div className="grid md-grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Complaints" 
          value={stats.totalComplaints} 
          icon={<Activity className="h-7 w-7 text-primary" />}
          colorClass="icon-primary"
        />
        <StatCard 
          title="Pending" 
          value={stats.pendingComplaints} 
          icon={<Clock className="h-7 w-7" style={{color: 'var(--warning)'}} />}
          colorClass="icon-warning"
        />
        <StatCard 
          title="Under Review" 
          value={stats.underReviewComplaints} 
          icon={<AlertTriangle className="h-7 w-7" style={{color: '#9333ea'}} />}
          colorClass="icon-primary"
        />
        <StatCard 
          title="Resolved" 
          value={stats.resolvedComplaints} 
          icon={<CheckCircle className="h-7 w-7 text-success" />}
          colorClass="icon-success"
        />
      </div>

      <div className="grid md-grid-cols-2 gap-6">
        {/* Most Common Issue */}
        <div className="card">
          <h3 className="text-xl font-bold border-b pb-4 mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-danger" />
            Most Common Issue
          </h3>
          <div className="py-8 text-center">
            <p className="text-5xl font-extrabold text-danger mb-4">{stats.mostCommonComplaintType}</p>
            <p className="text-muted font-medium">This issue receives the highest volume of reports.</p>
          </div>
        </div>

        {/* Most Problematic Route */}
        <div className="card">
          <h3 className="text-xl font-bold border-b pb-4 mb-4 flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            Most Problematic Route
          </h3>
          <div className="py-8 text-center">
            <p className="text-5xl font-extrabold text-primary mb-4">Route {stats.mostReportedRoute}</p>
            <p className="text-muted font-medium">This route has the highest number of complaints filed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
