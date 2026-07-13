import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, LoaderCircle, RefreshCw } from 'lucide-react';
import { getPaymentStatus } from '../services/paymentApi';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [verification, setVerification] = useState({ status: 'loading', data: null, error: '' });
  const orderReference = useMemo(
    () => searchParams.get('ref') || searchParams.get('orderReference') || sessionStorage.getItem('ngeniusOrderReference'),
    [searchParams],
  );

  const fetchVerification = useCallback(async () => {
    if (!orderReference) {
      return { status: 'error', data: null, error: 'The payment return did not include an order reference.' };
    }

    try {
      const data = await getPaymentStatus(orderReference);
      if (data.isPaid) sessionStorage.removeItem('ngeniusOrderReference');
      return { status: data.isPaid ? 'success' : 'incomplete', data, error: '' };
    } catch (error) {
      return { status: 'error', data: null, error: error.message };
    }
  }, [orderReference]);

  useEffect(() => {
    let isActive = true;
    const verifyOnReturn = async () => {
      const result = await fetchVerification();
      if (isActive) setVerification(result);
    };
    verifyOnReturn();
    return () => {
      isActive = false;
    };
  }, [fetchVerification]);

  const verifyPayment = async () => {
    setVerification((current) => ({ ...current, status: 'loading', error: '' }));
    setVerification(await fetchVerification());
  };

  const isLoading = verification.status === 'loading';
  const isSuccess = verification.status === 'success';

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-brand-dark px-4 pb-20 pt-36">
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-[120px]" />
      <div className="glass relative z-10 w-full max-w-2xl rounded-3xl border border-white/10 p-8 text-center shadow-2xl sm:p-12">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
          {isLoading && <LoaderCircle className="animate-spin text-brand-orange" size={40} />}
          {isSuccess && <CheckCircle2 className="text-emerald-400" size={44} />}
          {!isLoading && !isSuccess && <AlertTriangle className="text-amber-400" size={42} />}
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">Secure payment verification</p>
        <h1 className="mb-5 text-3xl font-black uppercase text-white sm:text-5xl">
          {isLoading ? 'Checking payment' : isSuccess ? 'Booking confirmed' : 'Payment not confirmed'}
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg" aria-live="polite">
          {isLoading && 'Please wait while we securely verify your payment with Network International.'}
          {isSuccess && verification.data?.message}
          {verification.status === 'incomplete' && verification.data?.message}
          {verification.status === 'error' && verification.error}
        </p>

        {verification.data && (
          <div className="mb-8 grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-5 text-left sm:grid-cols-2">
            <div>
              <span className="block text-xs uppercase tracking-wider text-gray-500">Booking reference</span>
              <span className="break-all font-semibold text-white">{verification.data.bookingReference}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-gray-500">Amount</span>
              <span className="font-semibold text-white">{verification.data.amount.currency} {verification.data.amount.value}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          {!isLoading && !isSuccess && (
            <button
              type="button"
              onClick={verifyPayment}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange px-7 py-3 font-bold text-white"
            >
              <RefreshCw size={17} /> Check again
            </button>
          )}
          <Link to={isSuccess ? '/' : '/booking'} className="rounded-full border border-white/15 px-7 py-3 font-bold text-white transition-colors hover:border-brand-orange">
            {isSuccess ? 'Return home' : 'Return to booking'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
