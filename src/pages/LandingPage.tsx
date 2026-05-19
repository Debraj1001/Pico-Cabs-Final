import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Car, ArrowRight, ShieldCheck, Clock, MapPin, Plane, Briefcase,
  CalendarHeart, Phone, Mail, Map, Menu, X, Star, Zap, Users, ChevronDown
} from 'lucide-react';

/* ─── tiny hook: intersection observer for scroll reveal ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── scroll reveal wrapper ─── */
const Reveal = ({
  children, delay = 0, className = '', style = {}
}: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};


const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cabTypes = [
    { label: 'Mini', icon: '🚗', desc: 'Compact & affordable', price: '₹8/km', eta: '3 min' },
    { label: 'Sedan', icon: '🚘', desc: 'Comfortable & spacious', price: '₹12/km', eta: '5 min' },
    { label: 'SUV', icon: '🚙', desc: 'Premium family ride', price: '₹18/km', eta: '7 min' },
    { label: 'Luxury', icon: '🏎️', desc: 'Executive experience', price: '₹28/km', eta: '10 min' },
  ];

  const services = [
    { icon: Plane, title: 'Airport Transfers', desc: 'Seamless pick-ups & drop-offs at all major airports. On-time, every time.' },
    { icon: Briefcase, title: 'Corporate Travel', desc: 'Priority booking, dedicated account management, and invoicing for businesses.' },
    { icon: Clock, title: 'Hourly Charter', desc: 'Flexible as-directed service with a vehicle and driver at your disposal.' },
    { icon: CalendarHeart, title: 'Special Events', desc: 'Elegant transportation for weddings, galas, and VIP occasions.' },
  ];


  const reviews = [
    { name: 'Arjun M.', loc: 'Bengaluru', text: 'Pico Cabs is my daily go-to. Clean cars, polite drivers, zero drama. Way better than the rest.', rating: 5 },
    { name: 'Priya S.', loc: 'Mumbai', text: 'Used the airport transfer at 4 AM. Driver was on time, car was spotless. Absolutely recommend!', rating: 5 },
    { name: 'Rahul K.', loc: 'Hyderabad', text: 'The luxury cab for my wedding was perfect. Professional and smooth. Will use again.', rating: 5 },
  ];

  return (
    <div className="lp-root">

      {/* ─── NAV ─── */}
      <header
        className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`}
      >
        <div className="lp-nav__inner">
          {/* Logo */}
          <div className="lp-logo">
            <div className="lp-logo__icon">
              <img src="/Pico Cabs- icon.png" alt="Pico Cabs" className="lp-logo__img" />
            </div>
            <span className="lp-logo__name">Pico Cabs</span>
          </div>

          {/* Desktop nav */}
          <nav className="lp-nav__links">
            <a href="#services">Services</a>
            <a href="#fleet">Fleet</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="lp-nav__actions">
            <a href="#contact" className="lp-btn lp-btn--ghost">Book a Ride</a>
            <Link to="/admin" className="lp-btn lp-btn--primary">Admin Portal</Link>
          </div>

          {/* Hamburger */}
          <button className="lp-hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lp-mobile-menu">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
            <a href="#fleet" onClick={() => setIsMobileMenuOpen(false)}>Fleet</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="lp-btn lp-btn--primary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>Book a Ride</a>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section className="lp-hero">

        <div className="lp-grid-bg" />

        <div className="lp-hero__content">
          <div className="lp-badge">
            <span className="lp-badge__dot" />
            Operating in 15+ Cities · 500K+ Rides
          </div>

          <h1 className="lp-hero__title">
            Go anywhere with<br />
            <span>Pico.</span>
          </h1>

          <p className="lp-hero__sub">
            Book reliable, safe, and affordable cabs in minutes. Pico Cabs connects you
            to professional drivers across India — anytime, anywhere.
          </p>

          <div className="lp-hero__cta">
            <a href="#fleet" className="lp-btn lp-btn--primary lp-btn--lg">
              Explore Fleet <ArrowRight size={18} />
            </a>
            <a href="#services" className="lp-btn lp-btn--outline lp-btn--lg">
              Our Services
            </a>
          </div>

          {/* Cab type picker */}
          <div className="lp-cab-picker">
            {cabTypes.map((c, i) => (
              <button
                key={i}
                className={`lp-cab-tab ${activeTab === i ? 'lp-cab-tab--active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                <span className="lp-cab-tab__icon">{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {/* Selected cab info */}
          <div className="lp-cab-detail">
            <div className="lp-cab-detail__info">
              <span className="lp-cab-detail__label">Type</span>
              <span className="lp-cab-detail__val">{cabTypes[activeTab].desc}</span>
            </div>
            <div className="lp-cab-detail__divider" />
            <div className="lp-cab-detail__info">
              <span className="lp-cab-detail__label">Starting from</span>
              <span className="lp-cab-detail__val lp-cab-detail__val--accent">{cabTypes[activeTab].price}</span>
            </div>
            <div className="lp-cab-detail__divider" />
            <div className="lp-cab-detail__info">
              <span className="lp-cab-detail__label">Avg ETA</span>
              <span className="lp-cab-detail__val">{cabTypes[activeTab].eta}</span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <a href="#services" className="lp-scroll-cue">
          <ChevronDown size={20} />
        </a>
      </section>


      {/* ─── SERVICES ─── */}
      <section className="lp-section" id="services">
        <Reveal className="lp-section__header">
          <div className="lp-eyebrow">What We Offer</div>
          <h2 className="lp-section__title">Built for every journey</h2>
          <p className="lp-section__sub">From daily commutes to airport runs, we've got the right ride for every occasion.</p>
        </Reveal>

        <div className="lp-grid lp-grid--4">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="lp-card lp-card--service">
                <div className="lp-card__icon-wrap">
                  <s.icon size={22} />
                </div>
                <h3 className="lp-card__title">{s.title}</h3>
                <p className="lp-card__desc">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── WHY PICO ─── */}
      <section className="lp-why">
        <div className="lp-why__inner">
          <Reveal className="lp-section__header" style={{ textAlign: 'left' }}>
            <div className="lp-eyebrow">Why Pico Cabs</div>
            <h2 className="lp-section__title" style={{ textAlign: 'left' }}>Safety, speed &amp; style</h2>
          </Reveal>
          <div className="lp-why__features">
            {[
              { icon: ShieldCheck, title: 'Verified Drivers', desc: 'Every driver is background-checked, trained, and rated by riders.' },
              { icon: Zap, title: 'Instant Booking', desc: 'Confirm your ride in under 30 seconds. No waiting, no friction.' },
              { icon: MapPin, title: 'Live Tracking', desc: 'Track your cab in real-time, share your trip with loved ones.' },
              { icon: Star, title: 'Top Rated', desc: '4.9 stars across 500K+ rides. Our riders love us — and we love them back.' },
              { icon: Users, title: 'Group Rides', desc: 'Travel together with SUVs and Tempo Travellers for groups.' },
              { icon: Car, title: 'Clean Fleet', desc: 'Well-maintained, sanitized vehicles inspected daily.' },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="lp-why__feat">
                  <div className="lp-why__feat-icon"><f.icon size={20} /></div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="lp-why__visual">
          <div className="lp-phone-mockup">
            <div className="lp-phone-mockup__notch" />
            <div className="lp-phone-mockup__map">
              <div className="lp-map-pin lp-map-pin--pickup">📍</div>
              <div className="lp-map-pin lp-map-pin--dropoff">🏁</div>
              <div className="lp-map-route" />
              <div className="lp-map-car">🚗</div>
            </div>
            <div className="lp-phone-mockup__card">
              <div className="lp-ride-card">
                <div className="lp-ride-card__row">
                  <span className="lp-ride-card__type">Sedan • ETA 4 min</span>
                  <span className="lp-ride-card__price">₹120</span>
                </div>
                <div className="lp-ride-card__driver">
                  <div className="lp-ride-card__avatar">R</div>
                  <div>
                    <div className="lp-ride-card__name">Ravi Kumar</div>
                    <div className="lp-ride-card__rating">★ 4.9 · KA 01 AB 1234</div>
                  </div>
                  <div className="lp-ride-card__confirm">Confirm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLEET ─── */}
      <section className="lp-section" id="fleet">
        <Reveal className="lp-section__header">
          <div className="lp-eyebrow">Our Vehicles</div>
          <h2 className="lp-section__title">A ride for every need</h2>
          <p className="lp-section__sub">Choose from our diverse fleet of well-maintained, sanitized vehicles.</p>
        </Reveal>

        <div className="lp-grid lp-grid--3">
          {[
            {
              name: 'Executive Sedan',
              tag: 'Most Popular',
              models: 'Toyota Etios, Honda Amaze',
              capacity: '4 Passengers',
              image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop',
              price: '₹12/km',
            },
            {
              name: 'Premium SUV',
              tag: 'Best for Groups',
              models: 'Innova Crysta, Ertiga',
              capacity: '6 Passengers',
              image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
              price: '₹18/km',
            },
            {
              name: 'Luxury Class',
              tag: 'VIP Experience',
              models: 'Mercedes E-Class, BMW 5',
              capacity: '3 Passengers',
              image: 'https://images.unsplash.com/photo-1503376760364-5a83a0050d24?q=80&w=600&auto=format&fit=crop',
              price: '₹28/km',
            },
          ].map((v, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="lp-fleet-card">
                <div className="lp-fleet-card__img-wrap">
                  <img src={v.image} alt={v.name} className="lp-fleet-card__img" />
                  <div className="lp-fleet-card__overlay" />
                  <span className="lp-fleet-card__tag">{v.tag}</span>
                </div>
                <div className="lp-fleet-card__body">
                  <div className="lp-fleet-card__top">
                    <h3 className="lp-fleet-card__name">{v.name}</h3>
                    <span className="lp-fleet-card__price">{v.price}</span>
                  </div>
                  <p className="lp-fleet-card__models">{v.models}</p>
                  <div className="lp-fleet-card__foot">
                    <span className="lp-fleet-card__cap"><Car size={13} /> {v.capacity}</span>
                    <a href="#contact" className="lp-fleet-card__book">Book Now <ArrowRight size={13} /></a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="lp-reviews">
        <Reveal className="lp-section__header">
          <div className="lp-eyebrow">Rider Stories</div>
          <h2 className="lp-section__title">Loved across India</h2>
        </Reveal>
        <div className="lp-grid lp-grid--3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="lp-review-card">
                <div className="lp-review-card__stars">{'★'.repeat(r.rating)}</div>
                <p className="lp-review-card__text">"{r.text}"</p>
                <div className="lp-review-card__author">
                  <div className="lp-review-card__avatar">{r.name[0]}</div>
                  <div>
                    <div className="lp-review-card__name">{r.name}</div>
                    <div className="lp-review-card__loc"><MapPin size={11} /> {r.loc}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── APP CTA ─── */}
      <section className="lp-app-cta">

        <Reveal className="lp-app-cta__inner">
          <div className="lp-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Download the App</div>
          <h2 className="lp-app-cta__title">Pico Cabs in your pocket</h2>
          <p className="lp-app-cta__sub">Book, track, and manage rides on the go. Available on iOS & Android.</p>
          <div className="lp-app-cta__btns">
            <a href="#" className="lp-store-btn">
              <span className="lp-store-btn__icon">🍎</span>
              <span><small>Download on the</small><strong>App Store</strong></span>
            </a>
            <a href="#" className="lp-store-btn">
              <span className="lp-store-btn__icon">▶</span>
              <span><small>Get it on</small><strong>Google Play</strong></span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ─── CONTACT ─── */}
      <section className="lp-section" id="contact">
        <Reveal className="lp-section__header">
          <div className="lp-eyebrow">Get in Touch</div>
          <h2 className="lp-section__title">Contact Pico Cabs</h2>
        </Reveal>

        <div className="lp-contact">
          <Reveal className="lp-contact__info" delay={0}>
            <div className="lp-contact__item">
              <div className="lp-contact__icon"><Phone size={20} /></div>
              <div>
                <div className="lp-contact__label">24/7 Dispatch</div>
                <a href="tel:+1234567890" className="lp-contact__val">+1 (555) 123-4567</a>
              </div>
            </div>
            <div className="lp-contact__item">
              <div className="lp-contact__icon"><Mail size={20} /></div>
              <div>
                <div className="lp-contact__label">Email Us</div>
                <a href="mailto:contact@picocabs.com" className="lp-contact__val">contact@picocabs.com</a>
              </div>
            </div>
            <div className="lp-contact__item">
              <div className="lp-contact__icon"><Map size={20} /></div>
              <div>
                <div className="lp-contact__label">Headquarters</div>
                <div className="lp-contact__val">100 Executive Blvd, Metropolis</div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lp-contact__form-wrap" delay={120}>
            <form className="lp-form" onSubmit={(e) => e.preventDefault()}>
              <div className="lp-form__row">
                <div className="lp-form__field">
                  <label>Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="lp-form__field">
                  <label>Email</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div className="lp-form__field">
                <label>Message</label>
                <textarea placeholder="How can we help you?" rows={5} />
              </div>
              <button type="submit" className="lp-btn lp-btn--primary lp-btn--full">
                Send Message <ArrowRight size={16} />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <div className="lp-footer__brand">
            <div className="lp-logo">
              <div className="lp-logo__icon">
                <img src="/Pico Cabs- icon.png" alt="Pico Cabs" className="lp-logo__img" />
              </div>
              <span className="lp-logo__name">Pico Cabs</span>
            </div>
            <p className="lp-footer__tagline">Reliable rides, everywhere you go.</p>
          </div>

          <div className="lp-footer__links">
            <div className="lp-footer__col">
              <div className="lp-footer__col-title">Services</div>
              <a href="#services">Airport Transfer</a>
              <a href="#services">Corporate Travel</a>
              <a href="#services">Hourly Charter</a>
              <a href="#services">Special Events</a>
            </div>
            <div className="lp-footer__col">
              <div className="lp-footer__col-title">Company</div>
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
            </div>
          </div>
        </div>

        <div className="lp-footer__bottom">
          <span>© 2026 Pico Cabs. All rights reserved.</span>
          <Link to="/admin" className="lp-footer__admin">
            Admin Portal <ArrowRight size={13} />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
