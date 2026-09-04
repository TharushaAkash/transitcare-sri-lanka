# TransitCare Sri Lanka - Public Transport Complaint System

This is a complete full-stack web application built for a 3rd-year software engineering university hackathon. It allows passengers to report and track issues they face while using public transport.

## Technology Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: ASP.NET Core Web API, C#
- **Database**: PostgreSQL, Entity Framework Core

## 4 Main Functions
1. **Submit Complaint**: Form to submit detailed complaints.
2. **Search & Filter Complaints**: View complaints and filter by type, route, and status.
3. **Track & Update Status**: View a specific complaint and update its status (Pending, Under Review, Resolved).
4. **Complaint Dashboard**: View statistics (Total, Pending, Resolved, Most Common Type, Most Problematic Route).

## Local Development Setup

### Backend (ASP.NET Core)
1. Ensure you have the .NET 8 SDK installed.
2. Ensure you have a local PostgreSQL instance running or an external PostgreSQL database (e.g. Supabase, Neon).
3. Open `Backend/appsettings.json` and update the `DefaultConnection` string with your database credentials.
4. Open a terminal in the `Backend` directory and run:
   ```bash
   dotnet ef database update
   dotnet run
   ```
   The backend will start at `https://localhost:7054` (or similar).

### Frontend (React + Vite)
1. Ensure you have Node.js installed.
2. Open a terminal in the `Frontend` directory and run:
   ```bash
   npm install
   npm run dev
   ```
3. The frontend will start at `http://localhost:5173`.
4. Ensure the `Frontend/.env` file has `VITE_API_URL=https://localhost:7054` matching your backend port.

## Deployment Instructions (Free Tier)

### 1. Database (PostgreSQL)
- Create a free PostgreSQL database using Supabase, Neon, or Render.
- Get the external connection string.

### 2. Backend (Render)
- Connect your GitHub repository to Render.
- Create a new **Web Service**.
- **Environment**: `.NET`
- **Build Command**: `dotnet build Backend/Backend.csproj -c Release -o /app/build`
- **Start Command**: `dotnet run --project Backend/Backend.csproj` (or use Docker if preferred, but Render supports .NET natively).
- Add Environment Variable:
  - `DATABASE_CONNECTION_STRING` = `[Your PostgreSQL Connection String]`

### 3. Frontend (Vercel)
- Connect your GitHub repository to Vercel.
- Select the `Frontend` folder as the root directory.
- Vercel will automatically detect Vite.
- Add Environment Variable:
  - `VITE_API_URL` = `[Your Render Backend URL]` (e.g. `https://transitcare-api.onrender.com`)
- Deploy!

## Team Members & Responsibilities
- **Student 1**: Frontend UI, Navbar, Home, Responsive Design
- **Student 2**: Submit Complaint Form, Validation, POST API
- **Student 3**: Search, Filters, Complaint Details, Status Updates
- **Student 4**: Dashboard Analytics, Database Setup, Integrations, Deployment
