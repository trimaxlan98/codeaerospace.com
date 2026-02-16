import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, CheckCircle, User, PawPrint, Sparkles, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WhatsAppIcon from '../WhatsAppIcon';

const STEPS = [
  { icon: User, key: 'step1' },
  { icon: PawPrint, key: 'step2' },
  { icon: Sparkles, key: 'step3' },
  { icon: Clock, key: 'step4' },
];

const timeSlots = [];
for (let h = 8; h <= 17; h++) {
  timeSlots.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 17) timeSlots.push(`${String(h).padStart(2, '0')}:30`);
}

const serviceOptions = [
  { value: 'bath', nameKey: 'serviceBath', priceKey: 'serviceBathPrice' },
  { value: 'full', nameKey: 'serviceFull', priceKey: 'serviceFullPrice' },
  { value: 'nails', nameKey: 'serviceNails', priceKey: 'serviceNailsPrice' },
  { value: 'spa', nameKey: 'serviceSpa', priceKey: 'serviceSpaPrice' },
];

const VetAppointmentForm = () => {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    ownerName: '', email: '', phone: '', petName: '', petType: '', breed: '',
    size: '', service: '', date: '', time: '', notes: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const selectService = (value) => {
    setForm(prev => ({ ...prev, service: value }));
    if (errors.service) setErrors(prev => ({ ...prev, service: '' }));
  };

  const validateStep = () => {
    const errs = {};
    const req = t('vetDemo.grooming.form.required');
    if (step === 0) {
      if (!form.ownerName.trim()) errs.ownerName = req;
      if (!form.phone.trim()) errs.phone = req;
    } else if (step === 1) {
      if (!form.petName.trim()) errs.petName = req;
      if (!form.petType) errs.petType = req;
      if (!form.size) errs.size = req;
    } else if (step === 2) {
      if (!form.service) errs.service = req;
    } else if (step === 3) {
      if (!form.date) errs.date = req;
      if (!form.time) errs.time = req;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

  const getServiceLabel = () => {
    const opt = serviceOptions.find(s => s.value === form.service);
    if (!opt) return '';
    return `${t(`vetDemo.grooming.form.${opt.nameKey}`)} - ${t(`vetDemo.grooming.form.${opt.priceKey}`)}`;
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    const waNumber = t('vetDemo.whatsapp.number');
    const sizeLabels = { small: t('vetDemo.grooming.form.sizeSmall'), medium: t('vetDemo.grooming.form.sizeMedium'), large: t('vetDemo.grooming.form.sizeLarge') };
    const petLabels = { dog: t('vetDemo.grooming.form.petTypeDog'), cat: t('vetDemo.grooming.form.petTypeCat'), other: t('vetDemo.grooming.form.petTypeOther') };
    const msg = lang === 'es'
      ? `Hola! Quiero agendar una cita de estetica canina.\n\n*Datos del dueno:*\nNombre: ${form.ownerName}\nTel: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ''}\n\n*Mascota:*\nNombre: ${form.petName}\nTipo: ${petLabels[form.petType] || form.petType}\nRaza: ${form.breed || 'N/A'}\nTamano: ${sizeLabels[form.size] || form.size}\n\n*Servicio:* ${getServiceLabel()}\n*Fecha:* ${form.date}\n*Hora:* ${form.time}\n${form.notes ? `\n*Notas:* ${form.notes}` : ''}`
      : `Hello! I want to book a grooming appointment.\n\n*Owner Info:*\nName: ${form.ownerName}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ''}\n\n*Pet:*\nName: ${form.petName}\nType: ${petLabels[form.petType] || form.petType}\nBreed: ${form.breed || 'N/A'}\nSize: ${sizeLabels[form.size] || form.size}\n\n*Service:* ${getServiceLabel()}\n*Date:* ${form.date}\n*Time:* ${form.time}\n${form.notes ? `\n*Notes:* ${form.notes}` : ''}`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setSuccess(true);
  };

  const reset = () => {
    setSuccess(false);
    setStep(0);
    setForm({ ownerName: '', email: '', phone: '', petName: '', petType: '', breed: '', size: '', service: '', date: '', time: '', notes: '' });
    setErrors({});
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-10 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('vetDemo.grooming.form.success')}</h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">{t('vetDemo.grooming.form.successMsg')}</p>
        <button onClick={reset} className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
          {t('vetDemo.grooming.form.successNewAppt')}
        </button>
      </motion.div>
    );
  }

  const inputCls = (name) =>
    `w-full px-4 py-3 rounded-xl border ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-800`;
  const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{t('vetDemo.grooming.form.title')}</h3>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === step;
          const isDone = i < step;
          return (
            <React.Fragment key={s.key}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-emerald-100 text-emerald-600 ring-2 ring-emerald-500' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isDone ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-[10px] sm:text-xs font-medium text-center leading-tight ${isActive ? 'text-emerald-600' : isDone ? 'text-emerald-500' : 'text-gray-400'}`}>
                  {t(`vetDemo.grooming.form.${s.key}`)}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 sm:mx-2 rounded transition-colors ${i < step ? 'bg-emerald-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="min-h-[240px]"
        >
          {/* Step 1: Personal Info */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className={labelCls}>{t('vetDemo.grooming.form.ownerName')} *</label>
                <input type="text" name="ownerName" value={form.ownerName} onChange={handleChange} placeholder={t('vetDemo.grooming.form.ownerNamePh')} className={inputCls('ownerName')} />
                {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('vetDemo.grooming.form.phone')} *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t('vetDemo.grooming.form.phonePh')} className={inputCls('phone')} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('vetDemo.grooming.form.email')}</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('vetDemo.grooming.form.emailPh')} className={inputCls('email')} />
              </div>
            </div>
          )}

          {/* Step 2: Pet Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className={labelCls}>{t('vetDemo.grooming.form.petName')} *</label>
                <input type="text" name="petName" value={form.petName} onChange={handleChange} placeholder={t('vetDemo.grooming.form.petNamePh')} className={inputCls('petName')} />
                {errors.petName && <p className="text-red-500 text-xs mt-1">{errors.petName}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{t('vetDemo.grooming.form.petType')} *</label>
                  <select name="petType" value={form.petType} onChange={handleChange} className={inputCls('petType')}>
                    <option value="">---</option>
                    <option value="dog">{t('vetDemo.grooming.form.petTypeDog')}</option>
                    <option value="cat">{t('vetDemo.grooming.form.petTypeCat')}</option>
                    <option value="other">{t('vetDemo.grooming.form.petTypeOther')}</option>
                  </select>
                  {errors.petType && <p className="text-red-500 text-xs mt-1">{errors.petType}</p>}
                </div>
                <div>
                  <label className={labelCls}>{t('vetDemo.grooming.form.breed')}</label>
                  <input type="text" name="breed" value={form.breed} onChange={handleChange} placeholder={t('vetDemo.grooming.form.breedPh')} className={inputCls('breed')} />
                </div>
              </div>
              <div>
                <label className={labelCls}>{t('vetDemo.grooming.form.size')} *</label>
                <div className="grid grid-cols-3 gap-3">
                  {['small', 'medium', 'large'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => { setForm(prev => ({ ...prev, size: s })); if (errors.size) setErrors(prev => ({ ...prev, size: '' })); }}
                      className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${form.size === s ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'}`}
                    >
                      {t(`vetDemo.grooming.form.size${s.charAt(0).toUpperCase() + s.slice(1)}`)}
                    </button>
                  ))}
                </div>
                {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Service Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <label className={labelCls}>{t('vetDemo.grooming.form.service')} *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectService(opt.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${form.service === opt.value ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                  >
                    <p className={`font-semibold ${form.service === opt.value ? 'text-emerald-700' : 'text-gray-800'}`}>
                      {t(`vetDemo.grooming.form.${opt.nameKey}`)}
                    </p>
                    <p className={`text-sm mt-0.5 ${form.service === opt.value ? 'text-emerald-600' : 'text-gray-500'}`}>
                      {t(`vetDemo.grooming.form.${opt.priceKey}`)}
                    </p>
                  </button>
                ))}
              </div>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
              <div>
                <label className={labelCls}>{t('vetDemo.grooming.form.notes')}</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} placeholder={t('vetDemo.grooming.form.notesPh')} rows={3} className={inputCls('notes')} />
              </div>
            </div>
          )}

          {/* Step 4: Date & Time + Summary */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{t('vetDemo.grooming.form.date')} *</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} min={today} className={inputCls('date')} />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className={labelCls}>{t('vetDemo.grooming.form.time')} *</label>
                  <select name="time" value={form.time} onChange={handleChange} className={inputCls('time')}>
                    <option value="">{t('vetDemo.grooming.form.selectTime')}</option>
                    {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                </div>
              </div>
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-bold text-gray-700 mb-2">{t('vetDemo.grooming.form.summary')}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-800">{t('vetDemo.grooming.form.ownerName')}:</span> {form.ownerName}</p>
                  <p><span className="font-medium text-gray-800">{t('vetDemo.grooming.form.petName')}:</span> {form.petName} ({t(`vetDemo.grooming.form.petType${form.petType.charAt(0).toUpperCase() + form.petType.slice(1)}`)})</p>
                  <p><span className="font-medium text-gray-800">{t('vetDemo.grooming.form.service')}:</span> {getServiceLabel()}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        {step > 0 ? (
          <button onClick={handleBack} className="flex items-center gap-2 px-5 py-3 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            {t('vetDemo.grooming.form.back')}
          </button>
        ) : <div />}

        {step < 3 ? (
          <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl">
            {t('vetDemo.grooming.form.next')}
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1fb855] transition-all shadow-lg hover:shadow-xl">
            <WhatsAppIcon className="w-5 h-5" />
            {t('vetDemo.grooming.form.submit')}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default VetAppointmentForm;
