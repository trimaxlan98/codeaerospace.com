
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    serviceInterest: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.serviceInterest) {
      newErrors.serviceInterest = 'Please select a service interest';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Thank you for your inquiry. We'll contact you shortly.",
        duration: 5000,
      });

      // Reset form
      setFormData({
        organizationName: '',
        email: '',
        serviceInterest: '',
        message: ''
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Organization Name */}
      <div>
        <label htmlFor="organizationName" className="block text-[#c0c0c0] mb-2 font-medium">
          Organization Name *
        </label>
        <input
          type="text"
          id="organizationName"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#1a2a4a] text-white border ${
            errors.organizationName ? 'border-red-500' : 'border-[#00d9ff]/20'
          } rounded-lg shadow-sm focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff] transition-all`}
          placeholder="Your Organization"
        />
        {errors.organizationName && (
          <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
        )}
      </div>

      {/* Contact Email */}
      <div>
        <label htmlFor="email" className="block text-[#c0c0c0] mb-2 font-medium">
          Contact Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#1a2a4a] text-white border ${
            errors.email ? 'border-red-500' : 'border-[#00d9ff]/20'
          } rounded-lg shadow-sm focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff] transition-all`}
          placeholder="contact@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Service Interest */}
      <div>
        <label htmlFor="serviceInterest" className="block text-[#c0c0c0] mb-2 font-medium">
          Service Interest *
        </label>
        <select
          id="serviceInterest"
          name="serviceInterest"
          value={formData.serviceInterest}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#1a2a4a] text-white border ${
            errors.serviceInterest ? 'border-red-500' : 'border-[#00d9ff]/20'
          } rounded-lg shadow-sm focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff] transition-all`}
        >
          <option value="">Select a service</option>
          <option value="Ground Station Software">Ground Station Software</option>
          <option value="Space Cybersecurity">Space Cybersecurity</option>
          <option value="Telemetry & Mission Analytics">Telemetry & Mission Analytics</option>
          <option value="Other">Other</option>
        </select>
        {errors.serviceInterest && (
          <p className="text-red-500 text-sm mt-1">{errors.serviceInterest}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-[#c0c0c0] mb-2 font-medium">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-3 bg-[#1a2a4a] text-white border ${
            errors.message ? 'border-red-500' : 'border-[#00d9ff]/20'
          } rounded-lg shadow-sm focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff] transition-all resize-none`}
          placeholder="Tell us about your project requirements..."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {loading ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  );
};

export default ContactForm;
