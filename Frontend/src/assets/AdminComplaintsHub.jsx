import { useMemo } from 'react'

const adminNavItems = [
  { label: 'All Complaints', active: true },
  { label: 'Submitted', active: false },
  { label: 'In Review', active: false },
  { label: 'Resolved', active: false },
  { label: 'Rejected', active: false },
]

const statusClassName = (status) => `status-${String(status).toLowerCase().replace(/\s+/g, '-')}`

const statusLabel = (status) => String(status).replace(/([a-z])([A-Z])/g, '$1 $2')

const formatDate = (value) =>
  new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
  }).format(new Date(value))

export default function AdminComplaintsHub({
  session,
  filters,
  onFiltersChange,
  complaints,
  loading,
  error,
  onRefresh,
  onReset,
}) {
  const summary = useMemo(
    () =>
      complaints.reduce(
        (acc, complaint) => {
          acc.total += 1
          acc[complaint.status] = (acc[complaint.status] || 0) + 1
          return acc
        },
        { total: 0 },
      ),
    [complaints],
  )

  const activeFilters = [
    filters.keyword.trim(),
    filters.complaintType !== 'All',
    filters.routeNumber !== 'All',
    filters.location !== 'All',
    filters.status !== 'All',
    filters.date,
  ].filter(Boolean).length

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-brand-block">
            <span className="admin-brand">Complaint Control Hub</span>
            <p className="admin-brand-sub">Admin inventory & monitoring mode</p>
          </div>

          <nav className="admin-nav">
            {adminNavItems.map((item) => (
              <button key={item.label} type="button" className={item.active ? 'admin-nav-item active' : 'admin-nav-item'}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="admin-sidebar-footer">
          <p className="admin-muted">Signed in as</p>
          <strong>{session.name || 'Admin'}</strong>
          <span>{session.role || 'Admin'}</span>
        </div>
      </aside>

      <section className="admin-content">
        <header className="admin-header">
          <div>
            <p className="eyebrow">Admin dashboard</p>
            <h1>All complaints by users</h1>
            <p className="admin-subtitle">
              Search and filter every complaint from the same place, with visible user id, complaint status, and dates.
            </p>
          </div>

          <div className="admin-profile">
            <div className="admin-profile-copy">
              <strong>{session.name || 'Admin user'}</strong>
              <span>{session.userId || 'ID unavailable'}</span>
            </div>
            <div className="admin-avatar">{(session.name || 'A').slice(0, 1).toUpperCase()}</div>
          </div>
        </header>

        <section className="admin-metrics">
          <div className="metric-card metric-blue">
            <span>All complaints</span>
            <strong>{summary.total}</strong>
          </div>
          <div className="metric-card metric-green">
            <span>Submitted</span>
            <strong>{summary.Submitted || 0}</strong>
          </div>
          <div className="metric-card metric-orange">
            <span>In review</span>
            <strong>{summary.InReview || 0}</strong>
          </div>
          <div className="metric-card metric-red">
            <span>Resolved</span>
            <strong>{summary.Resolved || 0}</strong>
          </div>
        </section>

        <section className="admin-table-card">
          <div className="admin-table-head">
            <div>
              <p className="eyebrow">Global complaint registry</p>
              <h2>Search complaints</h2>
            </div>

            <div className="admin-head-actions">
              <button type="button" className="secondary-btn" onClick={onRefresh} disabled={loading || !session.token}>
                {loading ? 'Loading...' : 'Refresh'}
              </button>
              <button type="button" className="primary-btn" onClick={onReset}>
                Clear filters
              </button>
            </div>
          </div>

          <div className="admin-toolbar">
            <label className="admin-search">
              <span>Search complaints</span>
              <input
                type="search"
                value={filters.keyword}
                onChange={(event) => onFiltersChange({ keyword: event.target.value })}
                placeholder="Search by keyword, user id, route, status..."
              />
            </label>

            <div className="admin-filter-row">
              <label className="field">
                <span>Type</span>
                <input
                  type="text"
                  value={filters.complaintType}
                  onChange={(event) => onFiltersChange({ complaintType: event.target.value })}
                  placeholder="All"
                />
              </label>
              <label className="field">
                <span>Route</span>
                <input
                  type="text"
                  value={filters.routeNumber}
                  onChange={(event) => onFiltersChange({ routeNumber: event.target.value })}
                  placeholder="120"
                />
              </label>
              <label className="field">
                <span>Location</span>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(event) => onFiltersChange({ location: event.target.value })}
                  placeholder="Colombo Fort"
                />
              </label>
              <label className="field">
                <span>Status</span>
                <input
                  type="text"
                  value={filters.status}
                  onChange={(event) => onFiltersChange({ status: event.target.value })}
                  placeholder="Submitted"
                />
              </label>
              <label className="field">
                <span>Date</span>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(event) => onFiltersChange({ date: event.target.value })}
                />
              </label>
            </div>
          </div>

          <div className="admin-summary-line">
            <span>{activeFilters} active filters</span>
            <span>{complaints.length} complaints shown</span>
          </div>

          {error ? <p className="error-box">{error}</p> : null}

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>User</th>
                  <th>Complaint details</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state compact">
                        <h3>No complaints found</h3>
                        <p>Try different search terms or remove filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : null}

                {complaints.map((complaint) => (
                  <tr key={complaint.id}>
                    <td>
                      <strong>{complaint.referenceNumber}</strong>
                    </td>
                    <td>
                      <div className="admin-user-cell">
                        <strong>{complaint.userName}</strong>
                        <span>{complaint.userId}</span>
                      </div>
                    </td>
                    <td>
                      <div className="admin-detail-cell">
                        <strong>{complaint.title}</strong>
                        <span>
                          {complaint.category} | Route {complaint.routeOrLocation} | {complaint.district}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${statusClassName(complaint.status)}`}>
                        {statusLabel(complaint.status)}
                      </span>
                    </td>
                    <td>{formatDate(complaint.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </section>
  )
}
