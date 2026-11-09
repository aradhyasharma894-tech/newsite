import { useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Sell", href: "/#get-quote" },
  { label: "Shop", href: "/shop" },
  { label: "Devices", href: "/accepted-devices" },
  { label: "Our approach", href: "/#why-road2resell" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const goTo = (href: string) => {
    setOpen(false); setMega(false);
    if (href.startsWith("/#") && isHome) document.querySelector(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    else window.location.href = href;
  };
  return (
    <header className="rr-header">
      <div className="rr-header-inner">
        <Link to="/" className="rr-brand" aria-label="Road2Resell home"><span className="rr-brand-mark">R<span>2</span>R</span><span className="rr-brand-name">ROAD2RESELL<small>TECH, IN CIRCULATION.</small></span></Link>
        <nav className="rr-nav" aria-label="Main navigation">
          <button className="rr-nav-item" onClick={() => goTo("/#get-quote")}>Sell your tech</button>
          <Link className={`rr-nav-item ${location.pathname === "/shop" ? "active" : ""}`} to="/shop">Shop</Link>
          <div className="rr-nav-menu" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button className="rr-nav-item" onClick={() => setMega(!mega)}>Explore devices <ChevronDown size={13} /></button>
            {mega && <div className="rr-mega"><div className="rr-mega-heading"><span>THE DEVICE INDEX</span><b>Find your next favourite.</b></div><div className="rr-mega-links"><Link to="/phones">All phones</Link><Link to="/phones/iphone">iPhone</Link><Link to="/phones/samsung">Samsung Galaxy</Link><Link to="/phones/google-pixel">Google Pixel</Link><Link to="/phones/motorola">Motorola</Link><Link to="/laptops">Laptops</Link><Link to="/tablets">Tablets</Link><Link to="/gaming-consoles">Gaming</Link><Link to="/cameras">Cameras</Link><Link to="/headphones">Audio</Link><Link to="/smart-watches">Wearables</Link><Link to="/drones">Drones</Link></div><Link className="rr-mega-all" to="/accepted-devices">View all devices <ArrowUpRight size={15} /></Link></div>}
          </div>
          <button className="rr-nav-item" onClick={() => goTo("/#how-it-works")}>How it works</button>
        </nav>
        <div className="rr-header-actions"><a href="tel:+19426603737" className="rr-header-call">Talk to our team</a><button className="rr-header-cta" onClick={() => goTo("/#get-quote")}>Get a quote <ArrowUpRight size={15} /></button></div>
        <button className="rr-mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <div className="rr-mobile-menu"><button onClick={() => goTo("/#get-quote")}>Sell your tech <ArrowUpRight /></button><Link to="/shop" onClick={() => setOpen(false)}>Shop <ArrowUpRight /></Link><Link to="/accepted-devices" onClick={() => setOpen(false)}>Explore devices <ArrowUpRight /></Link><Link to="/how-it-works" onClick={() => setOpen(false)}>How it works <ArrowUpRight /></Link><Link to="/guides/phone-selling-checklist" onClick={() => setOpen(false)}>Selling guides <ArrowUpRight /></Link><button onClick={() => goTo("/#how-it-works")}>How it works <ArrowUpRight /></button><a href="tel:+19426603737">Talk to our team</a></div>}
    </header>
  );
};
