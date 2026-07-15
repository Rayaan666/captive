import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CalendarDays, CheckCircle2, ChevronDown, LockKeyhole, ShieldCheck } from 'lucide-react';
import PayNowButton from '../components/PayNowButton';
import { createPaymentOrder, getPaymentConfig } from '../services/paymentApi';

const initialBooking = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  eventType: '',
  eventDate: '',
  eventLocation: '',
  guestCount: '',
  message: '',
  totalAmount: '',
};

const eventTypes = [
  'Corporate Event',
  'Exhibition & Expo Stand',
  'Brand Activation',
  'Roadshow',
  'Gala Dinner / Award Show',
  'Real Estate Event',
  'Luxury Nautical Experience',
  'Audio Visual Requirement',
  'Other',
];

const inputClass = 'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-brand-orange focus:bg-white/[0.06]';
const labelClass = 'mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-gray-400';

const localToday = () => {
  const date = new Date();
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return offsetDate.toISOString().split('T')[0];
};

const Booking = () => {
  const [booking, setBooking] = useState(initialBooking);
  const [paymentState, setPaymentState] = useState({ isLoading: false, error: '' });
  const [paymentConfig, setPaymentConfig] = useState({ isLoading: true, data: null, error: '' });

  useEffect(() => {
    let isActive = true;
    getPaymentConfig()
      .then((data) => {
        if (isActive) setPaymentConfig({ isLoading: false, data, error: '' });
      })
      .catch((error) => {
        if (isActive) setPaymentConfig({ isLoading: false, data: null, error: error.message });
      });
    return () => {
      isActive = false;
    };
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setBooking((current) => ({ ...current, [name]: value }));
    if (paymentState.error) setPaymentState((current) => ({ ...current, error: '' }));
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!paymentConfig.data) {
      setPaymentState({ isLoading: false, error: paymentConfig.error || 'Payment configuration is unavailable.' });
      return;
    }
    setPaymentState({ isLoading: true, error: '' });

    try {
      const order = await createPaymentOrder(booking);
      sessionStorage.setItem('ngeniusOrderReference', order.orderReference);
      window.location.assign(order.paymentUrl);
    } catch (error) {
      setPaymentState({ isLoading: false, error: error.message });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark pb-24 pt-32 selection:bg-brand-orange/30">
      <div className="absolute inset-x-0 top-0 h-[650px] bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.18),transparent_62%)]" />
      <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <LockKeyhole size={14} className="text-brand-orange" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300">Secure event booking</span>
          </div>
          <h1 className="mb-5 text-5xl font-black uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Book your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">event</span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-400">
            Share your event details and continue to Network International's secure hosted checkout. Your booking is confirmed only after payment is verified.
          </p>
        </motion.header>

        <div className="grid items-start gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass rounded-3xl border border-white/10 p-7 sm:p-9 lg:sticky lg:top-28"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">How it works</p>
            <h2 className="mb-8 text-3xl font-black uppercase text-white">A secure, simple checkout</h2>
            <div className="space-y-7">
              {[
                ['01', 'Complete your booking', 'Enter the event and contact details requested by our team.'],
                ['02', 'Pay securely', 'You will leave our website briefly for the N-Genius hosted payment page.'],
                ['03', 'Receive confirmation', 'We verify the settled payment before confirming your booking.'],
              ].map(([number, title, description]) => (
                <div key={number} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-orange text-xs font-black text-white">{number}</div>
                  <div>
                    <h3 className="mb-1 text-base font-bold text-white">{title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 flex items-start gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4">
              <ShieldCheck className="mt-0.5 shrink-0 text-emerald-400" size={21} />
              <p className="text-sm leading-relaxed text-gray-300">Card details are entered only on Network International's hosted page and never pass through this website.</p>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 -rotate-1 rounded-3xl bg-gradient-to-br from-brand-orange/10 to-brand-red/10 blur-2xl" />
            <div className="glass relative rounded-3xl border border-white/10 p-6 shadow-2xl sm:p-9 lg:p-11">
              <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10">
                  <CalendarDays className="text-brand-orange" size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase text-white">Booking details</h2>
                  <p className="text-sm text-gray-500">All fields marked with * are required.</p>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <label>
                    <span className={labelClass}>Full name *</span>
                    <input className={inputClass} type="text" name="fullName" value={booking.fullName} onChange={handleChange} autoComplete="name" maxLength={120} required />
                  </label>
                  <label>
                    <span className={labelClass}>Company name</span>
                    <input className={inputClass} type="text" name="companyName" value={booking.companyName} onChange={handleChange} autoComplete="organization" maxLength={160} />
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label>
                    <span className={labelClass}>Email address *</span>
                    <input className={inputClass} type="email" name="email" value={booking.email} onChange={handleChange} autoComplete="email" maxLength={254} required />
                  </label>
                  <label>
                    <span className={labelClass}>Phone number *</span>
                    <input className={inputClass} type="tel" name="phone" value={booking.phone} onChange={handleChange} autoComplete="tel" maxLength={25} required />
                  </label>
                </div>

                <label className="block">
                  <span className={labelClass}>Event type *</span>
                  <span className="relative block">
                    <select className={`${inputClass} appearance-none pr-11`} name="eventType" value={booking.eventType} onChange={handleChange} required>
                      <option value="" disabled className="bg-brand-dark">Select event type</option>
                      {eventTypes.map((eventType) => <option key={eventType} value={eventType} className="bg-brand-dark">{eventType}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  </span>
                </label>

                <div className="grid gap-6 md:grid-cols-3">
                  <label>
                    <span className={labelClass}>Event date *</span>
                    <input className={inputClass} type="date" name="eventDate" value={booking.eventDate} onChange={handleChange} min={localToday()} required />
                  </label>
                  <label>
                    <span className={labelClass}>Guest count *</span>
                    <input className={inputClass} type="number" name="guestCount" value={booking.guestCount} onChange={handleChange} min="1" max="1000000" step="1" required />
                  </label>
                  <label>
                    <span className={labelClass}>Location *</span>
                    <input className={inputClass} type="text" name="eventLocation" value={booking.eventLocation} onChange={handleChange} maxLength={200} required />
                  </label>
                </div>

                <label className="block">
                  <span className={labelClass}>Message / project brief *</span>
                  <textarea className={`${inputClass} min-h-32 resize-y`} name="message" value={booking.message} onChange={handleChange} maxLength={3000} required />
                </label>

                <label className="block">
                  <span className={labelClass}>Custom payment amount *</span>
                  <span className="relative block">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-black text-brand-orange">
                      {paymentConfig.data?.currency ?? 'AED'}
                    </span>
                    <input
                      className={`${inputClass} pl-16`}
                      type="number"
                      name="totalAmount"
                      value={booking.totalAmount}
                      onChange={handleChange}
                      min={paymentConfig.data?.minimumAmount ?? '1.00'}
                      max={paymentConfig.data?.maximumAmount ?? '9999999.99'}
                      step="0.01"
                      inputMode="decimal"
                      required
                    />
                  </span>
                  <p className="mt-2 text-xs leading-relaxed text-gray-500">
                    Enter the AED amount agreed with Captive Events. The exact amount is recorded and verified with the gateway.
                  </p>
                </label>

                {paymentConfig.error && (
                  <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
                    <AlertCircle size={19} className="mt-0.5 shrink-0 text-red-400" />
                    <span>{paymentConfig.error}</span>
                  </div>
                )}

                {paymentState.error && (
                  <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
                    <AlertCircle size={19} className="mt-0.5 shrink-0 text-red-400" />
                    <span>{paymentState.error}</span>
                  </div>
                )}

                <div className="border-t border-white/10 pt-7">
                  <PayNowButton isLoading={paymentState.isLoading} disabled={!paymentConfig.data} />
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <CheckCircle2 size={14} className="text-emerald-500" /> Secure hosted checkout powered by Network International
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
