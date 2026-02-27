import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-[#1a2847] last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-[#00d9ff]' : 'text-white group-hover:text-[#00d9ff]/80'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-[#00d9ff] bg-[#00d9ff] text-[#0a0e27]' : 'border-[#1a2847] text-[#00d9ff]'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[#c0c0c0] text-lg leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = React.useState(0);

  const faqs = [
    {
      question: t('microapps.faq.q1'),
      answer: t('microapps.faq.a1'),
    },
    {
      question: t('microapps.faq.q2'),
      answer: t('microapps.faq.a2'),
    },
    {
      question: t('microapps.faq.q3'),
      answer: t('microapps.faq.a3'),
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#0a0e27]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-xs font-bold uppercase tracking-widest mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t('microapps.faq.title')}
          </h2>
          <div className="w-24 h-1 bg-[#00d9ff] mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1a2847]/30 rounded-2xl p-8 md:p-12 border border-[#1a2847]"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[#c0c0c0] mb-6">{t('microapps.faq.cta')}</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[#00d9ff] font-bold hover:underline"
          >
            {t('contact.cta2')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
