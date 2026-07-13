import { Link } from 'react-router-dom';
import { ArrowLeft, XCircle } from 'lucide-react';

const PaymentCancelled = () => (
  <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-brand-dark px-4 pb-20 pt-36">
    <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-red/10 blur-[120px]" />
    <div className="glass relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 p-8 text-center shadow-2xl sm:p-12">
      <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
        <XCircle className="text-brand-red" size={44} />
      </div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">Checkout cancelled</p>
      <h1 className="mb-5 text-3xl font-black uppercase text-white sm:text-5xl">Booking not confirmed</h1>
      <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
        No booking has been confirmed. Return to the booking form whenever you are ready to try the secure checkout again.
      </p>
      <Link to="/booking" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange px-8 py-3 font-bold text-white">
        <ArrowLeft size={17} /> Return to booking
      </Link>
    </div>
  </section>
);

export default PaymentCancelled;
