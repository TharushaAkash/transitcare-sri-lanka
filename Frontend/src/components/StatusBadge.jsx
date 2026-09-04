import React from 'react';

const StatusBadge = ({ status }) => {
  let colorClass = "badge-primary"; // default

  switch (status) {
    case 'Pending':
      colorClass = "badge-warning";
      break;
    case 'Under Review':
      colorClass = "badge-primary";
      break;
    case 'Resolved':
      colorClass = "badge-success";
      break;
  }

  return (
    <span className={`badge ${colorClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
