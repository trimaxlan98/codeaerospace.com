import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, CheckCircle, User, Pill, ShoppingCart, Truck, ClipboardCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WhatsAppIcon from '../../vet-clinic/WhatsAppIcon';

const STEPS = [
  { icon: User, key: 'step1' },
  { icon: Pill, key: 'step2' },
  { icon: ShoppingCart, key: 'step3' },
  { icon: Truck, key: 'step4' },
  { icon: ClipboardCheck, key: 'step5' },
];

const productOptions = [
  { value: 'otc', nameKey: 'productOtc', priceKey: 'productOtcPrice' },
  { value: 'prescription', nameKey: 'productPrescription', priceKey: 'productPrescriptionPrice' },
  { value: 'vitamins', nameKey: 'productVitamins', priceKey: 'productVitaminsPrice' },
  { value: 'personal', nameKey: 'productPersonal', priceKey: 'productPersonalPrice' },
];

const timeSlots = [];
for (let h = 8; h <= 20; h++) {
  timeSlots.push(`${String(h).padStart(2, '0')}:00`);
  if (h < 20) timeSlots.push(`${String(h).padStart(2, '0')}:30`);
}

const PharmOrderForm = () => {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    customerName: '', email: '', phone: '',
    orderType: '', prescriptionDesc: '',
    products: '', productDetails: '',
    deliveryMethod: '', address: '', date: '', time: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const selectField = (fieldName, value) => {
    setForm(prev => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) setErrors(prev => ({ ...prev, [fieldName]: '' }));
  };

  const validateStep = () => {
    const errs = {};
    const req = t('pharmDemo.products.form.required');
    if (step === 0) {
      if (!form.customerName.trim()) errs.customerName = req;
      if (!form.phone.trim()) errs.phone = req;
    } else if (step === 1) {
      if (!form.orderType) errs.orderType = req;
    } else if (step === 2) {
      if (!form.products) errs.products = req;
    } else if (step === 3) {
      if (!form.deliveryMethod) errs.deliveryMethod = req;
      if (form.deliveryMethod === 'delivery' && !form.address.trim()) errs.address = req;
    } else if (step === 4) {
      if (!form.date) errs.date = req;
      if (!form.time) errs.time = req;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

  const getProductLabel = () => {
    const opt = productOptions.find(p => p.value === form.products);
    if (!opt) return '';
    return t(`pharmDemo.products.form.${opt.nameKey}`);
  };

  const getOrderTypeLabel = () => {
    const labels = {
      prescription: t('pharmDemo.products.form.orderPrescription'),
      otc: t('pharmDemo.products.form.orderOtc'),
      both: t('pharmDemo.products.form.orderBoth'),
    };
    return labels[form.orderType] || '';
  };

  const getDeliveryLabel = () => {
    const labels = {
      pickup: t('pharmDemo.products.form.deliveryPickup'),
      delivery: t('pharmDemo.products.form.deliveryHome'),
    };
    return labels[form.deliveryMethod] || '';
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    const waNumber = t('pharmDemo.whatsapp.number');
    const msg = lang === 'es'
      ? `Hola! Quiero hacer un pedido en la farmacia.\n\n*Datos del cliente:*\nNombre: ${form.customerName}\nTel: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ''}\n\n*Tipo de pedido:* ${getOrderTypeLabel()}${form.prescriptionDesc ? `\n*Receta:* ${form.prescriptionDesc}` : ''}\n\n*Productos:* ${getProductLabel()}${form.productDetails ? `\nDetalles: ${form.productDetails}` : ''}\n\n*Entrega:* ${getDeliveryLabel()}${form.address ? `\nDireccion: ${form.address}` : ''}\n*Fecha:* ${form.date}\n*Hora:* ${form.time}`
      : `Hello! I want to place a pharmacy order.\n\n*Customer Info:*\nName: ${form.customerName}\nPhone: ${form.phone}${form.email ? `\nEmail: ${form.email}` : ''}\n\n*Order Type:* ${getOrderTypeLabel()}${form.prescriptionDesc ? `\n*Prescription:* ${form.prescriptionDesc}` : ''}\n\n*Products:* ${getProductLabel()}${form.productDetails ? `\nDetails: ${form.productDetails}` : ''}\n\n*Delivery:* ${getDeliveryLabel()}${form.address ? `\nAddress: ${form.address}` : ''}\n*Date:* ${form.date}\n*Time:* ${form.time}`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    setSuccess(true);
  };

  const reset = () => {
    setSuccess(false);
    setStep(0);
    setForm({
      customerName: '', email: '', phone: '',
      orderType: '', prescriptionDesc: '',
      products: '', productDetails: '',
      deliveryMethod: '', address: '', date: '', time: '',
    });
    setErrors({});
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-10 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('pharmDemo.products.form.success')}</h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">{t('pharmDemo.products.form.successMsg')}</p>
        <button onClick={reset} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
          {t('pharmDemo.products.form.successNewOrder')}
        </button>
      </motion.div>
    );
  }

  const inputCls = (name) =>
    `w-full px-4 py-3 rounded-xl border ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800`;
  const labelCls = 'block text-sm font-semibold text-gray-700 mb-1.5';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{t('pharmDemo.products.form.title')}</h3>
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
                  isDone ? 'bg-blue-500 text-white' : isActive ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-400'
                }`}>
                  {isDone ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-[10px] sm:text-xs font-medium text-center leading-tight ${isActive ? 'text-blue-600' : isDone ? 'text-blue-500' : 'text-gray-400'}`}>
                  {t(`pharmDemo.products.form.${s.key}`)}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 sm:mx-2 rounded transition-colors ${i < step ? 'bg-blue-500' : 'bg-gray-200'}`} />
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
          {/* Step 1: Customer Info */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className={labelCls}>{t('pharmDemo.products.form.customerName')} *</label>
                <input type="text" name="customerName" value={form.customerName} onChange={handleChange} placeholder={t('pharmDemo.products.form.customerNamePh')} className={inputCls('customerName')} />
                {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('pharmDemo.products.form.phone')} *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t('pharmDemo.products.form.phonePh')} className={inputCls('phone')} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className={labelCls}>{t('pharmDemo.products.form.email')}</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('pharmDemo.products.form.emailPh')} className={inputCls('email')} />
              </div>
            </div>
          )}

          {/* Step 2: Order Type */}
          {step === 1 && (
            <div className="space-y-4">
              <label className={labelCls}>{t('pharmDemo.products.form.orderType')} *</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['prescription', 'otc', 'both'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => selectField('orderType', type)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${form.orderType === type ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                  >
                    <p className={`font-semibold ${form.orderType === type ? 'text-blue-700' : 'text-gray-800'}`}>
                      {t(`pharmDemo.products.form.order${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                    </p>
                  </button>
                ))}
              </div>
              {errors.orderType && <p className="text-red-500 text-xs mt-1">{errors.orderType}</p>}
              {(form.orderType === 'prescription' || form.orderType === 'both') && (
                <div>
                  <label className={labelCls}>{t('pharmDemo.products.form.prescriptionDesc')}</label>
                  <textarea name="prescriptionDesc" value={form.prescriptionDesc} onChange={handleChange} placeholder={t('pharmDemo.products.form.prescriptionDescPh')} rows={3} className={inputCls('prescriptionDesc')} />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Products */}
          {step === 2 && (
            <div className="space-y-4">
              <label className={labelCls}>{t('pharmDemo.products.form.productCategory')} *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {productOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectField('products', opt.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${form.products === opt.value ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                  >
                    <p className={`font-semibold ${form.products === opt.value ? 'text-blue-700' : 'text-gray-800'}`}>
                      {t(`pharmDemo.products.form.${opt.nameKey}`)}
                    </p>
                    <p className={`text-sm mt-0.5 ${form.products === opt.value ? 'text-blue-600' : 'text-gray-500'}`}>
                      {t(`pharmDemo.products.form.${opt.priceKey}`)}
                    </p>
                  </button>
                ))}
              </div>
              {errors.products && <p className="text-red-500 text-xs mt-1">{errors.products}</p>}
              <div>
                <label className={labelCls}>{t('pharmDemo.products.form.productDetails')}</label>
                <textarea name="productDetails" value={form.productDetails} onChange={handleChange} placeholder={t('pharmDemo.products.form.productDetailsPh')} rows={3} className={inputCls('productDetails')} />
              </div>
            </div>
          )}

          {/* Step 4: Delivery */}
          {step === 3 && (
            <div className="space-y-4">
              <label className={labelCls}>{t('pharmDemo.products.form.deliveryMethod')} *</label>
              <div className="grid grid-cols-2 gap-3">
                {['pickup', 'delivery'].map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => selectField('deliveryMethod', method)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${form.deliveryMethod === method ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 bg-gray-50 hover:border-gray-300'}`}
                  >
                    <p className={`font-semibold ${form.deliveryMethod === method ? 'text-blue-700' : 'text-gray-800'}`}>
                      {t(`pharmDemo.products.form.delivery${method.charAt(0).toUpperCase() + method.slice(1)}`)}
                    </p>
                  </button>
                ))}
              </div>
              {errors.deliveryMethod && <p className="text-red-500 text-xs mt-1">{errors.deliveryMethod}</p>}
              {form.deliveryMethod === 'delivery' && (
                <div>
                  <label className={labelCls}>{t('pharmDemo.products.form.address')} *</label>
                  <textarea name="address" value={form.address} onChange={handleChange} placeholder={t('pharmDemo.products.form.addressPh')} rows={2} className={inputCls('address')} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Confirm */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{t('pharmDemo.products.form.date')} *</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} min={today} className={inputCls('date')} />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className={labelCls}>{t('pharmDemo.products.form.time')} *</label>
                  <select name="time" value={form.time} onChange={handleChange} className={inputCls('time')}>
                    <option value="">{t('pharmDemo.products.form.selectTime')}</option>
                    {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                </div>
              </div>
              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-bold text-gray-700 mb-2">{t('pharmDemo.products.form.summary')}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-800">{t('pharmDemo.products.form.customerName')}:</span> {form.customerName}</p>
                  <p><span className="font-medium text-gray-800">{t('pharmDemo.products.form.orderType')}:</span> {getOrderTypeLabel()}</p>
                  <p><span className="font-medium text-gray-800">{t('pharmDemo.products.form.productCategory')}:</span> {getProductLabel()}</p>
                  <p><span className="font-medium text-gray-800">{t('pharmDemo.products.form.deliveryMethod')}:</span> {getDeliveryLabel()}</p>
                  {form.address && <p><span className="font-medium text-gray-800">{t('pharmDemo.products.form.address')}:</span> {form.address}</p>}
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
            {t('pharmDemo.products.form.back')}
          </button>
        ) : <div />}

        {step < 4 ? (
          <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
            {t('pharmDemo.products.form.next')}
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1fb855] transition-all shadow-lg hover:shadow-xl">
            <WhatsAppIcon className="w-5 h-5" />
            {t('pharmDemo.products.form.submit')}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PharmOrderForm;
