import React from 'react';

const About = () => {
  return (
    <div className="card mt-8" style={{ maxWidth: '48rem', margin: '2rem auto' }}>
      <h1 className="text-4xl mb-6 text-primary">About TransitCare Sri Lanka</h1>
      
      <div className="flex-col gap-6 text-muted">
        <section className="mb-6">
          <h2 className="text-2xl mb-2">The Project</h2>
          <p>
            TransitCare Sri Lanka is a 3rd-year university software engineering hackathon project. 
            It is designed to address a common local problem: the lack of a structured, accessible 
            way for passengers to report issues they face while using public transportation in Sri Lanka.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-2">The Problem</h2>
          <p>
            Passengers frequently encounter issues such as overcharging, reckless driving, overcrowding, 
            or buses not stopping at designated halts. Without a centralized system to report and track 
            these incidents, it's difficult for authorities to identify problematic routes and take corrective action.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-2">Our Solution</h2>
          <p>
            TransitCare provides a simple, transparent platform where users can:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li>Submit detailed complaints (Type, Route, Location, Date, Description).</li>
            <li>Search and filter through existing complaints to see if others face similar issues.</li>
            <li>Track the status of complaints (Pending, Under Review, Resolved).</li>
            <li>View a dashboard that highlights key statistics and problematic routes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl mb-2">Technology Stack</h2>
          <p>This full-stack application was built using modern web technologies:</p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', listStyleType: 'disc' }}>
            <li><strong>Frontend:</strong> React, Vite, Vanilla CSS (Premium)</li>
            <li><strong>Backend:</strong> ASP.NET Core Web API, C#</li>
            <li><strong>Database:</strong> PostgreSQL, Entity Framework Core</li>
            <li><strong>Architecture:</strong> REST API</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
