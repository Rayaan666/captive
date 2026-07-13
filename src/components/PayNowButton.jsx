import { CreditCard, LoaderCircle } from 'lucide-react';

const PayNowButton = ({ isLoading }) => (
  <button
    type="submit"
    disabled={isLoading}
    className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[linear-gradient(90deg,#dc2626_0%,#f97316_52%,#facc15_100%)] py-4 shadow-[0_10px_30px_rgba(249,115,22,0.28)] transition-transform hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70 disabled:hover:scale-100"
  >
    <span className="relative z-10 text-sm font-bold uppercase tracking-widest text-white drop-shadow-md">
      {isLoading ? 'Preparing secure checkout' : 'Pay Now'}
    </span>
    {isLoading ? (
      <LoaderCircle size={18} className="relative z-10 animate-spin text-white" />
    ) : (
      <CreditCard size={18} className="relative z-10 text-white transition-transform group-hover:translate-x-1" />
    )}
  </button>
);

export default PayNowButton;
