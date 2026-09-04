import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Hash } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ComplaintCard = ({ complaint }) => {
  const formattedDate = new Date(complaint.complaintDate).toLocaleDateString();

  return (
    <div className="card flex-col" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold" title={complaint.complaintType} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
          {complaint.complaintType}
        </h3>
        <StatusBadge status={complaint.status} />
      </div>
      
      <p className="text-muted text-sm mb-4" style={{ flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {complaint.description}
      </p>

      <div className="mb-4" style={{ background: 'var(--bg-main)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem' }}>
        <div className="flex items-center gap-2 mb-2">
          <Hash className="h-4 w-4 text-primary" />
          <span>Route: <strong>{complaint.routeNumber}</strong></span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-danger" />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{complaint.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-success" />
          <span>{formattedDate}</span>
        </div>
      </div>

      <Link 
        to={`/complaints/${complaint.id}`}
        className="btn btn-outline" style={{ width: '100%', marginTop: 'auto' }}
      >
        View Details
      </Link>
    </div>
  );
};

export default ComplaintCard;
