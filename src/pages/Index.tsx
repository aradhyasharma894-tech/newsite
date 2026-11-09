import { useEffect, useRef, useState, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Cpu, ShieldCheck, Sparkles, Wallet, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { QuoteFormSection } from "@/components/QuoteFormSection";

const media = {
  hero: "https://images.pexels.com/photos/3981749/pexels-photo-3981749.jpeg?auto=compress&cs=tinysrgb&w=2400",
  phone: "https://images.pexels.com/photos/36324071/pexels-photo-36324071.jpeg?auto=compress&cs=tinysrgb&w=1800",
  phone2: "https://images.pexels.com/photos/6278761/pexels-photo-6278761.jpeg?auto=compress&cs=tinysrgb&w=1600",
  laptop: "https://images.pexels.com/photos/6968093/pexels-photo-6968093.jpeg?auto=compress&cs=tinysrgb&w=1800",
  laptop2: "https://images.pexels.com/photos/102061/pexels-photo-102061.jpeg?auto=compress&cs=tinysrgb&w=1600",
  console: "https://images.pexels.com/photos/10997627/pexels-photo-10997627.jpeg?auto=compress&cs=tinysrgb&w=1600",
  xbox: "https://images.pexels.com/photos/16776031/pexels-photo-16776031.jpeg?auto=compress&cs=tinysrgb&w=1600",
  headphones: "https://images.pexels.com/photos/18743222/pexels-photo-18743222.jpeg?auto=compress&cs=tinysrgb&w=1600",
  drone: "https://images.pexels.com/photos/20339624/pexels-photo-20339624.jpeg?auto=compress&cs=tinysrgb&w=1600",
  camera: "https://images.pexels.com/photos/4243662/pexels-photo-4243662.jpeg?auto=compress&cs=tinysrgb&w=1600",
  watch: "https://images.pexels.com/photos/32977237/pexels-photo-32977237.jpeg?auto=compress&cs=tinysrgb&w=1600",
  tablet: "https://images.pexels.com/photos/10535365/pexels-photo-10535365.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

const categories = [
  { name: "Phones", detail: "iPhone · Samsung · Google", path: "/phones", image: media.phone, number: "01" },
  { name: "Laptops", detail: "MacBook · Windows · Gaming", path: "/laptops", image: media.laptop, number: "02" },
  { name: "Gaming", detail: "PlayStation · Xbox · Nintendo", path: "/gaming-consoles", image: media.console, number: "03" },
  { name: "Tablets", detail: "iPad · Galaxy Tab · Surface", path: "/tablets", image: media.tablet, number: "04" },
  { name: "Cameras", detail: "DSLR · Mirrorless · Lenses", path: "/cameras", image: media.camera, number: "05" },
  { name: "Audio", detail: "Headphones · Speakers · Earbuds", path: "/headphones", image: media.headphones, number: "06" },
  { name: "Wearables", detail: "Apple Watch · Galaxy Watch", path: "/smart-watches", image: media.watch, number: "07" },
  { name: "Drones", detail: "DJI · Camera drones · FPV", path: "/drones", image: media.drone, number: "08" },
];

const Reveal = ({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("is-visible");
        observer.unobserve(node);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const travel = el.offsetHeight - window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / Math.max(1, travel)));
        setProgress(p);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const chapter = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
  const chapterTitles = [
    <><span>Good tech</span><br /><em>deserves</em> more.</>,
    <><span>Value should</span><br /><em>keep moving.</em></>,
    <><span>A smarter kind</span><br /><em>of upgrade.</em></>,
  ];
  return (
    <section ref={sectionRef} className="story-scroll" id="why-road2resell">
      <div className="story-sticky">
        <div className="story-gridline" />
        <div className="story-copy">
          <div className="eyebrow eyebrow-light"><span /> A better afterlife for technology</div>
          <div className="story-chapter" key={chapter}>
            <span className="story-index">0{chapter + 1} / 03</span>
            <h2>{chapterTitles[chapter]}</h2>
            <p>{["The device you no longer reach for could be exactly what someone else is looking for. We make that next chapter effortless.", "We bring sellers and buyers together through a simpler, more considered way to move pre-loved technology.", "Keep great devices in circulation. Get value back. Make your next move with a lighter footprint."][chapter]}</p>
          </div>
          <div className="story-progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
          <div className="story-scroll-hint"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></div>
        </div>
        <div className="story-visual">
          <div className="story-orbit orbit-one" /><div className="story-orbit orbit-two" />
          <div className="story-glow" />
          <img className={`story-device story-device-a ${chapter === 0 ? "active" : ""}`} src={media.phone2} alt="Premium smartphone" />
          <img className={`story-device story-device-b ${chapter === 1 ? "active" : ""}`} src={media.laptop2} alt="Laptop computer" />
          <img className={`story-device story-device-c ${chapter === 2 ? "active" : ""}`} src={media.headphones} alt="Wireless headphones" />
          <div className="story-caption"><span>THE CIRCULAR TECH ECONOMY</span><b>KEEP GOOD TECH IN PLAY.</b></div>
        </div>
      </div>
    </section>
  );
}

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const move = (event: PointerEvent) => {
      const r = node.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      node.style.setProperty("--mx", `${x * 24}px`);
      node.style.setProperty("--my", `${y * 20}px`);
    };
    const reset = () => { node.style.setProperty("--mx", "0px"); node.style.setProperty("--my", "0px"); };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", reset);
    return () => { node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", reset); };
  }, []);
  const faqs = [
    ["What devices can I sell to Road2Resell?", "We accept a wide range of electronics including smartphones, laptops, tablets, gaming consoles, cameras, drones, smartwatches, headphones and more. If you're unsure about a device, send us the details and we'll take a look."],
    ["How do I get an offer for my device?", "Complete the quote form with your device model and condition. Our team reviews the information and contacts you with an offer. There is no obligation to accept."],
    ["Do you offer pickup?", "Road2Resell coordinates convenient pickup options across Canada. Share your location in your quote request and our team will confirm the available arrangements."],
    ["When do I get paid?", "Once the device has been checked and the offer is accepted, our team confirms the payment method and next steps with you."],
  ];

  return (
    <>
      <Helmet>
        <title>Road2Resell — Technology, given another life.</title>
        <meta name="description" content="Buy, sell and trade quality pre-owned electronics across Canada. Discover a smarter way to keep great technology in circulation with Road2Resell." />
        <meta name="theme-color" content="#f4f3ef" />
        <meta property="og:title" content="Road2Resell — Technology, given another life." />
        <meta property="og:description" content="A better way to buy, sell and keep great technology in circulation." />
        <meta property="og:image" content={media.hero} />
        <link rel="preconnect" href="https://images.pexels.com" />
      </Helmet>
      <div className="rr-site">
        <Header />
        <main>
          <section className="hero-stage" id="home" ref={heroRef}>
            <div className="hero-grain" />
            <div className="hero-topline"><span>THE NEXT CHAPTER OF TECH</span><span>CANADA · EST. FOR WHAT'S NEXT</span></div>
            <div className="hero-content">
              <div className="hero-title-wrap">
                <div className="eyebrow"><span /> THE SMARTER WAY TO MOVE TECHNOLOGY</div>
                <h1>Good tech.<br /><em>Great</em> second<br />acts<span className="hero-period">.</span></h1>
                <p className="hero-subtitle">Buy better. Sell smarter. Keep the things worth keeping in motion.</p>
                <div className="hero-actions">
                  <a href="#get-quote" className="button-primary">Sell your device <ArrowUpRight size={17} /></a>
                  <Link to="/shop" className="button-quiet">Explore the shop <ArrowRight size={17} /></Link>
                </div>
                <div className="hero-proof"><span className="proof-stars">★★★★★</span><span>Thoughtful tech. Straightforward service.</span></div>
              </div>
              <div className="hero-art" aria-label="A curated collection of electronics">
                <div className="hero-art-halo" />
                <div className="hero-image-main"><img src={media.hero} alt="A curated collection of modern electronics" loading="eager" /></div>
                <div className="hero-device-float phone-float"><img src={media.phone} alt="Smartphone" /></div>
                <div className="hero-device-float watch-float"><img src={media.watch} alt="Smartwatch" /></div>
                <div className="hero-device-float audio-float"><img src={media.headphones} alt="Wireless headphones" /></div>
                <div className="hero-note note-top"><span>01 / REUSE</span><b>More life.<br />Less waste.</b></div>
                <div className="hero-note note-bottom"><span>THE GOOD TECH CYCLE</span><b>Pass it forward <ArrowUpRight size={15} /></b></div>
                <div className="hero-art-index">R2R / 001</div>
              </div>
            </div>
            <div className="hero-bottomline"><span>DESIGNED FOR A WORLD THAT MOVES</span><a href="#the-cycle">DISCOVER THE CYCLE <ArrowDown size={13} /></a><span>SCROLL TO BEGIN</span></div>
          </section>

          <section className="ticker-band" aria-label="Road2Resell services">
            <div className="ticker-track"><span>BUY WITH CONFIDENCE</span><i>✳</i><span>SELL WITH EASE</span><i>✳</i><span>TECH THAT CIRCULATES</span><i>✳</i><span>BUY WITH CONFIDENCE</span><i>✳</i><span>SELL WITH EASE</span><i>✳</i><span>TECH THAT CIRCULATES</span><i>✳</i></div>
          </section>

          <section className="intro-section section-pad" id="the-cycle">
            <div className="section-kicker"><span>01</span> THE ROAD2RESELL POINT OF VIEW</div>
            <div className="intro-layout">
              <Reveal className="intro-heading"><h2>Not everything<br />needs to be <em>new.</em></h2></Reveal>
              <Reveal className="intro-body" delay={120}><p className="intro-lead">Some of the best technology is already out there.</p><p>We make it easier to give great devices another life — and make your next move feel like a smart one. A more considered way to buy, sell and pass technology forward.</p><a href="#why-road2resell" className="text-link">Why the cycle matters <ArrowUpRight size={16} /></a></Reveal>
            </div>
            <div className="intro-stats">
              <div><b>01</b><span>One place to buy<br />and sell tech</span></div><div><b>∞</b><span>More life for<br />great devices</span></div><div><b>CA</b><span>Built to serve<br />across Canada</span></div>
            </div>
          </section>

          <ScrollStory />

          <section className="category-section section-pad" id="devices">
            <div className="section-heading-row"><div><div className="section-kicker"><span>02</span> THE DEVICE INDEX</div><h2>Find your next<br /><em>favourite.</em></h2></div><p>From everyday essentials to serious gear. Explore the categories we bring back into play.</p></div>
            <div className="category-grid">
              {categories.map((item, i) => <Reveal key={item.name} delay={i * 55} className={`category-card category-card-${i + 1}`}><Link to={item.path} className="category-card-link"><div className="category-image"><img src={item.image} alt={`${item.name} electronics`} loading="lazy" /><span className="category-number">{item.number}</span><span className="category-arrow"><ArrowUpRight size={20} /></span></div><div className="category-meta"><div><h3>{item.name}</h3><p>{item.detail}</p></div><ArrowRight size={18} /></div></Link></Reveal>)}
            </div>
            <div className="category-foot"><span>THE RIGHT DEVICE IS OUT THERE.</span><Link to="/accepted-devices" className="text-link">See all accepted devices <ArrowUpRight size={16} /></Link></div>
          </section>

          <section className="feature-sell">
            <div className="feature-sell-image"><img src={media.phone2} alt="Premium smartphone ready for a new owner" loading="lazy" /><div className="image-index">A DEVICE. A NEW DESTINATION. / 001</div></div>
            <div className="feature-sell-copy"><div className="section-kicker section-kicker-light"><span>03</span> THE SELL EXPERIENCE</div><h2>Your old tech<br />has <em>somewhere</em><br />to be.</h2><p>That phone in your drawer. The laptop you've upgraded from. The console that deserves a new player. Turn unused tech into something useful again — and get value back while you're at it.</p><a href="#get-quote" className="button-light">Get a free quote <ArrowUpRight size={17} /></a><div className="sell-assurance"><span><Check size={14} /> No obligation</span><span><Check size={14} /> Simple process</span><span><Check size={14} /> Real human support</span></div></div>
          </section>

          <section className="buy-feature section-pad">
            <div className="buy-copy"><div className="section-kicker"><span>04</span> THE BUY EXPERIENCE</div><h2>More device.<br /><em>Less compromise.</em></h2><p>Find the technology you want without paying full-new prices. Browse our live inventory and discover devices ready for their next owner.</p><Link to="/shop" className="button-primary">Shop available tech <ArrowUpRight size={17} /></Link><div className="buy-micro"><span><ShieldCheck size={17} /> Carefully reviewed</span><span><Wallet size={17} /> Value-led pricing</span></div></div>
            <div className="buy-image-composition"><div className="buy-image-large"><img src={media.laptop} alt="Laptop computer" loading="lazy" /></div><div className="buy-image-small"><img src={media.xbox} alt="Gaming console" loading="lazy" /></div><div className="buy-image-tag"><span>GOOD TECH</span><b>FOUND AGAIN.</b></div></div>
          </section>

          <section className="quality-section">
            <div className="quality-backdrop"><img src={media.camera} alt="Camera equipment detail" loading="lazy" /></div>
            <div className="quality-content"><div className="section-kicker section-kicker-light"><span>05</span> THE ROAD2RESELL STANDARD</div><h2>Second-hand<br />shouldn't mean<br /><em>second-best.</em></h2><p>Every great device deserves a clear story. We focus on making the details, condition and next steps easier to understand — so you can make a decision with confidence.</p><div className="quality-points"><div><ShieldCheck /><span><b>Clarity first</b><small>Know what you're looking at.</small></span></div><div><Cpu /><span><b>Tech worth passing on</b><small>Keep useful devices in circulation.</small></span></div><div><Sparkles /><span><b>A better experience</b><small>Less friction at every step.</small></span></div></div></div>
          </section>

          <section className="process-section section-pad" id="how-it-works">
            <div className="section-kicker"><span>06</span> THE SIMPLE PART</div><div className="process-heading"><h2>Three steps.<br /><em>One smart move.</em></h2><p>From first details to final handoff, we keep the process clear and uncomplicated.</p></div>
            <div className="process-steps"><div className="process-step"><span className="step-no">01</span><div className="step-icon"><Cpu /></div><h3>Tell us what<br />you have.</h3><p>Share the device, model and condition. A few details are all we need to get started.</p><span className="step-line" /></div><div className="process-step"><span className="step-no">02</span><div className="step-icon"><Zap /></div><h3>Get a clear<br />next step.</h3><p>Our team reviews your details and follows up with an offer or the best way forward.</p><span className="step-line" /></div><div className="process-step"><span className="step-no">03</span><div className="step-icon"><Wallet /></div><h3>Make the<br />handoff.</h3><p>If everything works for you, confirm the details and move your device on.</p><span className="step-line" /></div></div>
            <div className="process-cta"><a href="#get-quote" className="button-primary">Start with a free quote <ArrowUpRight size={17} /></a><span>NO PRESSURE. NO OBLIGATION.</span></div>
          </section>

          <section className="quote-banner"><div className="quote-banner-orb" /><div className="quote-banner-copy"><div className="section-kicker section-kicker-light"><span>07</span> READY WHEN YOU ARE</div><h2>Give good tech<br />a <em>next chapter.</em></h2><p>Tell us what you've got. We'll take it from there.</p></div><a href="#get-quote" className="quote-circle"><span>GET YOUR<br />FREE QUOTE</span><ArrowUpRight size={25} /></a></section>

          <div className="quote-form-wrap"><QuoteFormSection /></div>

          <section className="faq-section section-pad" id="faq"><div className="faq-intro"><div className="section-kicker"><span>08</span> GOOD QUESTIONS</div><h2>Before you<br /><em>make a move.</em></h2><p>A few things worth knowing before your device finds its next home.</p><a href="mailto:road2reselltoronto@gmail.com" className="text-link">Still have a question? Talk to us <ArrowUpRight size={16} /></a></div><div className="faq-list">{faqs.map(([q, a], i) => <div className={`faq-item ${activeFaq === i ? "open" : ""}`} key={q}><button onClick={() => setActiveFaq(activeFaq === i ? null : i)} aria-expanded={activeFaq === i}><span className="faq-no">0{i + 1}</span><b>{q}</b><ChevronDown size={18} /></button><div className="faq-answer"><p>{a}</p></div></div>)}</div></section>

          <section className="final-stage"><div className="final-stage-image"><img src={media.hero} alt="Electronics ready for their next chapter" loading="lazy" /></div><div className="final-stage-copy"><span>ROAD2RESELL / THE NEXT CHAPTER</span><h2>Technology<br />moves forward.<br /><em>So should we.</em></h2><div className="final-actions"><Link to="/shop" className="button-light">Explore the shop <ArrowUpRight size={17} /></Link><a href="#get-quote" className="final-text-link">Sell a device <ArrowRight size={16} /></a></div></div><div className="final-wordmark">R2R<span>®</span></div></section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
