
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ContactForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    email: '',
    serviceInterest: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.organizationName.trim()) newErrors.organizationName = t('contact.errors.orgRequired');
    if (!formData.email.trim()) newErrors.email = t('contact.errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('contact.errors.emailInvalid');
    if (!formData.serviceInterest) newErrors.serviceInterest = t('contact.errors.serviceRequired');
    if (!formData.message.trim()) newErrors.message = t('contact.errors.messageRequired');
    else if (formData.message.trim().length < 10) newErrors.message = t('contact.errors.messageMin');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: t('contact.errors.validation'), description: t('contact.errors.validationDesc'), variant: "destructive" });
      return;
    }
    setLoading(true);

    const subject = encodeURIComponent(`[Co.De Aerospace Inquiry] ${formData.serviceInterest} — ${formData.organizationName}`);
    const body = encodeURIComponent(
      `Organization: ${formData.organizationName}\nEmail: ${formData.email}\nService Interest: ${formData.serviceInterest}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:contacto@codeaerospace.com?subject=${subject}&body=${body}`;

    await new Promise(resolve => setTimeout(resolve, 400));
    window.location.href = mailtoLink;

    toast({ title: t('contact.emailOpened'), description: t('contact.emailOpenedDesc'), duration: 6000 });
    setSubmitted(true);
    setLoading(false);

    setTimeout(() => {
      setFormData({ organizationName: '', email: '', serviceInterest: '', message: '' });
      setSubmitted(false);
    }, 5000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <CheckCircle className="w-16 h-16 text-[#00d9ff] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">{t('contact.thankYou')}</h3>
        <p className="text-[#c0c0c0]">{t('contact.thankYouMsg')}</p>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-[#1a2a4a] text-white border ${errors[field] ? 'border-red-500' : 'border-[#00d9ff]/20'} rounded-lg shadow-sm focus:outline-none focus:border-[#00d9ff] focus:ring-1 focus:ring-[#00d9ff] transition-all`;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="organizationName" className="block text-[#c0c0c0] mb-2 font-medium">{t('contact.orgName')}</label>
        <input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleChange} className={inputClass('organizationName')} placeholder={t('contact.orgPlaceholder')} />
        {errors.organizationName && <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-[#c0c0c0] mb-2 font-medium">{t('contact.email')}</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="contact@example.com" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="serviceInterest" className="block text-[#c0c0c0] mb-2 font-medium">{t('contact.serviceInterest')}</label>
        <select id="serviceInterest" name="serviceInterest" value={formData.serviceInterest} onChange={handleChange} className={inputClass('serviceInterest')}>
          <option value="">{t('contact.selectService')}</option>
          <option value="Enterprise Web Platforms">Enterprise Web Platforms</option>
          <option value="AI & Agentic Automation">AI & Agentic Automation</option>
          <option value="Full-Stack Mobile Apps">Full-Stack Mobile Apps</option>
          <option value="Industrial VR Training">Industrial VR Training</option>
          <option value="Industrial IoT & Control">Industrial IoT & Control</option>
          <option value="Custom Project Engineering">Custom Project Engineering</option>
          <option value="MicroApp Solution">MicroApp Solution</option>
          <option value="Other">Other</option>
        </select>
        {errors.serviceInterest && <p className="text-red-500 text-sm mt-1">{errors.serviceInterest}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-[#c0c0c0] mb-2 font-medium">{t('contact.message')}</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className={`${inputClass('message')} resize-none`} placeholder={t('contact.messagePlaceholder')} />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {loading ? t('contact.submitting') : (<><Send className="w-4 h-4" />{t('contact.submit')}</>)}
      </button>

      <p className="text-center text-xs text-[#64748b]">{t('contact.emailNote')}</p>
    </form>
  );
};

export default ContactForm;
