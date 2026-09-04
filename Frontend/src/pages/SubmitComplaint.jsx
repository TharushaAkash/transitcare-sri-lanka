import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintsApi } from '../services/api';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const COMPLAINT_TYPES = [
  "Overcharging",
  "Reckless Driving",
  "Overcrowding",
  "Bus Did Not Stop",
  "Poor Staff Behaviour",
  "Poor Vehicle Condition",
  "Other"
];

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    complaintType: '',
    routeNumber: '',
    location: '',
    complaintDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    description: '',
    contactNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.complaintType) newErrors.complaintType = "Please select a complaint type.";
    if (!formData.routeNumber) newErrors.routeNumber = "Please enter the route number.";
    if (!formData.location) newErrors.location = "Please enter the location.";
    if (!formData.complaintDate) newErrors.complaintDate = "Please enter the date.";
    
    if (!formData.description) {
      newErrors.description = "Please enter a description.";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    if (formData.contactNumber) {
      // Basic phone format validation (Sri Lanka formats or generic digits)
      const phoneRegex = /^[0-9+\-\s()]{9,15}$/;
      if (!phoneRegex.test(formData.contactNumber)) {
        newErrors.contactNumber = "Please enter a valid contact number.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await complaintsApi.create({
        ...formData,
        // Ensure date is formatted properly for C# DateTime
        complaintDate: new Date(formData.complaintDate).toISOString()
      });
      setSubmitSuccess(true);
      setFormData({
        complaintType: '',
        routeNumber: '',
        location: '',
        complaintDate: new Date().toISOString().split('T')[0],
        description: '',
        contactNumber: ''
      });
    } catch (err) {
      console.error(err);
      setServerError(err.response?.data?.title || "Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-sm text-center border border-emerald-100">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Complaint submitted successfully!</h2>
        <p className="text-slate-600 mb-6">Thank you for helping improve public transport. Your report has been recorded.</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Submit Another
          </button>
          <button 
            onClick={() => navigate('/complaints')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            View Complaints
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card max-w-3xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6 pb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>Report a Complaint</h1>
      
      {serverError && (
        <div className="card mb-6 flex items-start gap-2" style={{ background: 'var(--danger-light)', borderColor: 'var(--danger-light)' }}>
          <AlertCircle className="h-5 w-5 text-danger mt-1 flex-shrink-0" />
          <p className="text-danger">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex-col gap-6">
        <div className="grid md-grid-cols-2 gap-6 form-group mb-6">
          {/* Complaint Type */}
          <div>
            <label className="form-label">
              Complaint Type <span className="text-danger">*</span>
            </label>
            <select
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              className={`form-control ${errors.complaintType ? 'border-red-500' : ''}`}
              style={errors.complaintType ? { borderColor: 'var(--danger)' } : {}}
            >
              <option value="">-- Select Type --</option>
              {COMPLAINT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.complaintType && <p className="text-danger text-sm mt-1">{errors.complaintType}</p>}
          </div>

          {/* Route Number */}
          <div>
            <label className="form-label">
              Route Number <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="routeNumber"
              placeholder="e.g. 138"
              value={formData.routeNumber}
              onChange={handleChange}
              className="form-control"
              style={errors.routeNumber ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.routeNumber && <p className="text-danger text-sm mt-1">{errors.routeNumber}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="form-label">
              Location <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Nugegoda"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
              style={errors.location ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.location && <p className="text-danger text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="form-label">
              Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="complaintDate"
              value={formData.complaintDate}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className="form-control"
              style={errors.complaintDate ? { borderColor: 'var(--danger)' } : {}}
            />
            {errors.complaintDate && <p className="text-danger text-sm mt-1">{errors.complaintDate}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="form-group mb-6">
          <label className="form-label">
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Please provide details about what happened..."
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            style={errors.description ? { borderColor: 'var(--danger)' } : {}}
          ></textarea>
          {errors.description && <p className="text-danger text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Contact Number */}
        <div className="form-group mb-6">
          <label className="form-label">
            Contact Number <span className="text-muted text-sm font-normal">(Optional)</span>
          </label>
          <input
            type="tel"
            name="contactNumber"
            placeholder="e.g. 0712345678"
            value={formData.contactNumber}
            onChange={handleChange}
            className="form-control"
            style={{ width: '50%', ...(errors.contactNumber ? { borderColor: 'var(--danger)' } : {}) }}
          />
          {errors.contactNumber && <p className="text-danger text-sm mt-1">{errors.contactNumber}</p>}
        </div>

        {/* Submit Button */}
        <div className="pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: '100%', maxWidth: '200px' }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitComplaint;
