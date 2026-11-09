import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

type Order = {
  order_number: string | null; status: string; currency: string; subtotal_cents: number;
  customer_name: string | null; customer_email: string | null; customer_phone: string | null;
  shipping_address_line1: string | null; shipping_address_line2: string | null;
  shipping_city: string | null; shipping_province: string | null; shipping_postal_code: string | null;
  shipping_country: string | null; confirmation_email_status: string | null;
};
type Item = { item_title: string; unit_amount_cents: number; inventory_id: string };
type Verification = { success: boolean; payment_status: string; order: Order; items: Item[] };
const money = (cents: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(cents / 100);

export default function OrderConfirmation() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id") ?? "";
  const [data, setData] = useState<Verification | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let timer: number | undefined;
    let attempts = 0;
    async function verify() {
      if (!sessionId || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
        if (active) { setError("We couldn't find your checkout session. Please check your confirmation email or contact Road2Resell."); setLoading(false); }
        return;
      }
      try {
        const res = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/verify-checkout-session-live`, {
          method: "POST",
          headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
          body: JSON.stringify({ session_id: sessionId }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || json.success !== true) throw new Error(typeof json.error === "string" ? json.error : "Order verification failed.");
        if (!active) return;
        setData(json as Verification);
        setError("");
        setLoading(false);
        // The Stripe webhook can arrive just after the browser redirect.
        // Poll briefly until it marks the order paid and finishes email processing.
        if ((json.payment_status === "processing" || json.order?.status !== "paid") && attempts < 8) {
          attempts += 1;
          timer = window.setTimeout(verify, 2500);
        }
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : "We couldn't verify your order.");
        setLoading(false);
      }
    }
    void verify();
    return () => { active = false; if (timer) window.clearTimeout(timer); };
  }, [sessionId]);

  const paid = data?.payment_status === "paid" && data.order.status === "paid";
  const address = data?.order ? [data.order.shipping_address_line1, data.order.shipping_address_line2, [data.order.shipping_city, data.order.shipping_province, data.order.shipping_postal_code].filter(Boolean).join(", "), data.order.shipping_country].filter(Boolean) : [];

  return <>
    <Helmet><title>Order Confirmation | Road2Resell</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <div className="min-h-screen bg-[#f8f8f6] text-[#181a18]"><Header />
      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="border border-[#e2e4dc] bg-white p-6 sm:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#718a72]">Road2Resell / Order status</p>
          {loading ? <><h1 className="mt-5 text-3xl font-light">Verifying your payment…</h1><p className="mt-3 text-sm leading-6 text-neutral-600">Please keep this page open while we confirm your order.</p></> : error ? <><h1 className="mt-5 text-3xl font-light">We couldn't verify your order</h1><p role="alert" className="mt-3 text-sm leading-6 text-red-700">{error}</p><button onClick={() => window.location.reload()} className="mt-6 bg-[#172119] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white">Try again</button></> : data ? <>
            <div className="mt-5 flex items-start gap-3"><div className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${paid ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>{paid ? "✓" : "…"}</div><div><h1 className="text-3xl font-light">{paid ? "Thank you for your order." : "Payment is being confirmed."}</h1><p className="mt-2 text-sm leading-6 text-neutral-600">{paid ? "Your payment has been verified." : "Stripe reports your payment, and we're waiting for our order system to finish processing it. This page will check again automatically."}</p></div></div>
            <div className="mt-8 grid gap-4 border-y border-[#e8e8e2] py-5 sm:grid-cols-2"><div><p className="text-[10px] uppercase tracking-widest text-neutral-400">Order number</p><p className="mt-1 font-medium">{data.order.order_number || "Generating…"}</p></div><div><p className="text-[10px] uppercase tracking-widest text-neutral-400">Payment status</p><p className="mt-1 font-medium capitalize">{paid ? "Paid — verified" : data.payment_status}</p></div></div>
            <h2 className="mt-7 text-xs font-semibold uppercase tracking-[0.16em]">Order summary</h2>
            <div className="mt-3 divide-y divide-[#eeeeea]">{data.items.map((item, i) => <div key={`${item.inventory_id}-${i}`} className="flex justify-between gap-4 py-3 text-sm"><span>{item.item_title}</span><span className="shrink-0">{money(item.unit_amount_cents)}</span></div>)}</div>
            <div className="flex justify-between border-t border-[#e8e8e2] pt-4 text-sm font-semibold"><span>Total paid</span><span>{money(data.order.subtotal_cents)}</span></div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2"><div><h2 className="text-xs font-semibold uppercase tracking-[0.16em]">Customer</h2><p className="mt-3 text-sm leading-6">{data.order.customer_name || ""}<br />{data.order.customer_email || ""}<br />{data.order.customer_phone || ""}</p></div><div><h2 className="text-xs font-semibold uppercase tracking-[0.16em]">Shipping address</h2><p className="mt-3 text-sm leading-6">{address.map((line, i) => <span key={i}>{line}<br /></span>)}</p></div></div>
            <div className="mt-7 border-t border-[#e8e8e2] pt-5 text-sm leading-6 text-neutral-600">{data.order.confirmation_email_status === "sent" ? `A confirmation email with your PDF invoice was sent to ${data.order.customer_email || "your email address"}.` : data.order.confirmation_email_status === "failed" ? "Your order is recorded, but the confirmation email could not be sent yet. Please contact Road2Resell if you need the invoice urgently." : "Your confirmation email and PDF invoice will be sent after order processing completes."}</div>
          </> : null}
          <Link to="/shop" className="mt-8 inline-flex border-b border-[#9ba89a] pb-2 text-xs font-semibold uppercase tracking-[0.15em]">Continue shopping →</Link>
        </div>
      </main><Footer /></div>
  </>;
}
