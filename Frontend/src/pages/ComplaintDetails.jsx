import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintsApi } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import { ArrowLeft, Clock, MapPin, Hash, CheckCircle } from 'lucide-react';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await complaintsApi.getById(id);
        setComplaint(response.data);
      } catch (err) {
        console.error(err);
        setError("Could not load complaint details. It may have been deleted or doesn't exist.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    setIsUpdating(true);
    try {
      await complaintsApi.updateStatus(id, newStatus);
      setComplaint(prev => ({ ...prev, status: newStatus, updatedAt: new Date().toISOString() }));
    } catch (err) {
      console.error(err);
      alert("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-red-200">
        <p className="text-red-500 text-lg">{error}</p>
        <button onClick={() => navigate('/complaints')} className="mt-4 text-blue-600 hover:underline">
          Back to Complaints
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex-col gap-6" style={{ maxWidth: '48rem', margin: '0 auto', gap: '1.5rem', display: 'flex' }}>
      <button 
        onClick={() => navigate('/complaints')}
        className="flex items-center gap-2 text-muted" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Complaints
      </button>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="text-2xl font-bold">{complaint.complaintType}</h1>
            <p className="text-muted text-sm mt-2">Complaint ID: #{complaint.id}</p>
          </div>
          <StatusBadge status={complaint.status} />
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          <h3 className="font-bold mb-4">Description</h3>
          <p className="text-muted mb-8" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}>
            {complaint.description}
          </p>

          <div className="grid md-grid-cols-2 gap-6 mb-8" style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div className="flex items-start gap-4">
              <Hash className="h-5 w-5 text-primary" style={{ marginTop: '0.2rem' }} />
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Route Number</p>
                <p className="font-bold">{complaint.routeNumber}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-danger" style={{ marginTop: '0.2rem' }} />
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Location</p>
                <p className="font-bold">{complaint.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-success" style={{ marginTop: '0.2rem' }} />
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Incident Date</p>
                <p className="font-bold">{new Date(complaint.complaintDate).toLocaleDateString()}</p>
              </div>
            </div>
            {complaint.contactNumber && (
              <div className="flex items-start gap-4">
                <CheckCircle className="h-5 w-5 text-primary" style={{ marginTop: '0.2rem' }} />
                <div>
                  <p className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Contact Number</p>
                  <p className="font-bold">{complaint.contactNumber}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <span>Reported on: {new Date(complaint.createdAt).toLocaleString()}</span>
            <span>Last updated: {new Date(complaint.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Admin / Status Update Section (Simplified for Hackathon) */}
      <div className="card" style={{ borderColor: 'var(--primary-light)' }}>
        <h3 className="font-bold mb-4">Update Status (Admin/Staff)</h3>
        <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <button
            onClick={() => handleStatusUpdate('Pending')}
            disabled={isUpdating || complaint.status === 'Pending'}
            className="btn btn-secondary"
            style={complaint.status === 'Pending' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            Mark Pending
          </button>
          <button
            onClick={() => handleStatusUpdate('Under Review')}
            disabled={isUpdating || complaint.status === 'Under Review'}
            className="btn btn-primary"
            style={complaint.status === 'Under Review' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            Mark Under Review
          </button>
          <button
            onClick={() => handleStatusUpdate('Resolved')}
            disabled={isUpdating || complaint.status === 'Resolved'}
            className="btn btn-secondary"
            style={complaint.status === 'Resolved' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            Mark Resolved
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
