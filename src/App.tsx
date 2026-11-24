import { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  ArrowRight,
  Check,
  Menu,
  X,
} from 'lucide-react';
import {
  SITE_CONFIG,
  HERO_IMAGE,
  ABOUT_IMAGE,
  SERVICES,
  buildWhatsAppUrl,
} from './data/siteConfig';
import { ResilientImage } from './components/ResilientImage';
import { LocationMapSection } from './components/LocationMapSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { CallToActionSection } from './components/CallToActionSection';

export default function App() {
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceFilter, setServiceFilter] = useState<
    'all' | 'families-couples' | 'girls' | 'private'
  >('all');

  useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredServices =
    serviceFilter === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === serviceFilter);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B1B3A] overflow-x-hidden">
      {/* Demo Key Quota Exceeded Banner (Google Maps Platform Case A) */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0F295C] whitespace-nowrap shrink-0"
          >
            Royal Tower Mohali
          </a>

          {/* Zone 2: 4 Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#about"
              className="hover:text-[#0F295C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-[#0F295C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#location"
              className="hover:text-[#0F295C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Location
            </a>
            <a
              href="#reviews"
              className="hover:text-[#0F295C] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl(
                'Hello Royal Tower Mohali, I would like to book a room in Mohali.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 bg-[#0F295C] text-white text-sm font-semibold rounded-lg hover:bg-[#173B82] transition-colors whitespace-nowrap shrink-0"
            >
              Book Your Room
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-slate-200 text-[#0F295C] hover:bg-slate-50 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 shadow-md">
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1 text-base font-medium text-slate-700">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-2 flex items-center rounded-lg hover:bg-slate-50 hover:text-[#0F295C]"
              >
                About
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-2 flex items-center rounded-lg hover:bg-slate-50 hover:text-[#0F295C]"
              >
                Services
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-2 flex items-center rounded-lg hover:bg-slate-50 hover:text-[#0F295C]"
              >
                Location
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] px-2 flex items-center rounded-lg hover:bg-slate-50 hover:text-[#0F295C]"
              >
                Reviews
              </a>
              <div className="pt-3 grid grid-cols-2 gap-2.5">
                <a
                  href={SITE_CONFIG.phoneHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-[#B88924] hover:bg-[#9A7018] text-white text-sm font-bold rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4 text-white" />
                  Call Now
                </a>
                <a
                  href={buildWhatsAppUrl(
                    'Hello Royal Tower Mohali, I would like to book a room in Mohali.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] inline-flex items-center justify-center px-3 py-2.5 bg-[#0F295C] text-white text-sm font-semibold rounded-lg"
                >
                  Book Room
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* 1. Hero Section */}
        <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center py-1 sm:py-2">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#9A7018]">
                  <span>Sector 78, Sohana, Mohali</span>
                  <span aria-hidden="true">·</span>
                  <span>Families, Couples &amp; Girls Room for Rent</span>
                </div>

                <h1
                  className="mt-3 font-serif font-bold text-[#0B1B3A] tracking-tight leading-[1.12] text-balance"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
                >
                  Best Room Rental Services in Mohali
                </h1>

                <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-semibold text-[#0F295C] leading-snug text-balance">
                  Neat, Clean &amp; Furnished Rooms for Rent at Affordable Prices.
                </p>

                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  Find comfortable and well-maintained rooms for rent for families, couples and girls at Royal Tower Mohali. Enjoy a clean, peaceful and welcoming living environment at budget-friendly prices.
                </p>

                <div className="mt-7 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3">
                  <a
                    href="#services"
                    className="col-span-2 sm:col-span-1 min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F295C] text-white text-sm font-semibold rounded-lg hover:bg-[#173B82] transition-colors whitespace-nowrap shrink-0"
                  >
                    Book Your Room
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 bg-[#B88924] text-white text-sm font-bold rounded-lg hover:bg-[#9A7018] transition-colors whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    Call Now
                  </a>

                  <a
                    href={buildWhatsAppUrl(
                      'Hello Royal Tower Mohali, I am interested in booking a neat and clean room for rent in Mohali.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 bg-[#189A48] text-white text-sm font-semibold rounded-lg hover:bg-[#14823C] transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 flex">
                <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[430px]">
                  <ResilientImage
                    src={HERO_IMAGE.src}
                    alt={HERO_IMAGE.alt}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#081838]/75 via-[#081838]/30 to-transparent pointer-events-none" />
                  <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 flex flex-wrap items-center justify-between gap-2 text-white text-xs sm:text-sm font-medium">
                    <span>Royal Tower Mohali</span>
                    <span className="text-[#F2D68B]">Short &amp; Long-Term Rooms for Rent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Highlights Strip Below Hero Split */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              <div>
                <p className="text-xs font-semibold text-[#9A7018] tabular-nums">01</p>
                <p className="mt-1 font-serif text-base font-semibold text-[#0B1B3A]">
                  Family &amp; Couple Friendly
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Private rooms with a respectful, peaceful residential atmosphere.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#9A7018] tabular-nums">02</p>
                <p className="mt-1 font-serif text-base font-semibold text-[#0B1B3A]">
                  Dedicated Girls Room Wing
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Safe, bright rooms for rent suited for students and working women.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#9A7018] tabular-nums">03</p>
                <p className="mt-1 font-serif text-base font-semibold text-[#0B1B3A]">
                  Neat &amp; Clean Rooms
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Spotless bedrooms, fresh bedding, and hygienic attached washrooms.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#9A7018] tabular-nums">04</p>
                <p className="mt-1 font-serif text-base font-semibold text-[#0B1B3A]">
                  Flexible Rental Stays
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Affordable short-term visits and long-term monthly rental plans.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. About Royal Tower Mohali */}
        <section
          id="about"
          className="py-14 sm:py-16 md:py-24 bg-[#F8FAFC] border-t border-slate-200/80"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[4/3]">
                  <ResilientImage
                    src={ABOUT_IMAGE.src}
                    alt={ABOUT_IMAGE.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#9A7018]">
                  About Royal Tower Mohali
                </p>
                <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1B3A] tracking-tight text-balance">
                  A Welcoming, Clean &amp; Affordable Stay in Mohali
                </h2>
                <p className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Finding trustworthy rooms for rent in Mohali that feel clean, peaceful, and reasonably priced can be challenging. Royal Tower Mohali was established to bridge that gap — providing well-kept furnished rental rooms where families, couples, and girls feel genuinely comfortable from day one.
                </p>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Whether you are shifting to Mohali for work, pursuing higher studies, visiting relatives, or seeking a private room with flexible tenure, our team focuses on everyday cleanliness, responsive support, and transparent rental options that fit your budget.
                </p>

                <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-6 border-t border-slate-200">
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#9A7018] shrink-0 mt-1" />
                    <span className="text-sm font-medium text-[#0B1B3A]">
                      Clean, move-in ready rooms
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#9A7018] shrink-0 mt-1" />
                    <span className="text-sm font-medium text-[#0B1B3A]">
                      Budget-friendly rental plans
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#9A7018] shrink-0 mt-1" />
                    <span className="text-sm font-medium text-[#0B1B3A]">
                      Safe environment for girls &amp; families
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#9A7018] shrink-0 mt-1" />
                    <span className="text-sm font-medium text-[#0B1B3A]">
                      Short-term &amp; long-term flexibility
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Accommodation Services — Balanced 2x2 Grid */}
        <section id="services" className="py-14 sm:py-16 md:py-24 bg-white border-t border-slate-200/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#9A7018]">
                  Our Accommodation Services
                </p>
                <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1B3A] tracking-tight text-balance">
                  Tailored Rooms for Rent in Mohali
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Choose from dedicated family rooms for rent, couple-friendly suites, safe girls rooms for rent, and affordable private rental rooms for short-term and long-term stays.
                </p>
              </div>

              {/* Interactive Filter Controls — Zero Horizontal Scrollbar on Mobile */}
              <div
                role="tablist"
                aria-label="Filter accommodation services"
                className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-full sm:w-auto self-start lg:self-auto"
              >
                {[
                  { id: 'all', label: 'All Rooms' },
                  { id: 'families-couples', label: 'Family & Couple' },
                  { id: 'girls', label: 'Girls Rooms' },
                  { id: 'private', label: 'Private & Budget' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={serviceFilter === tab.id}
                    type="button"
                    onClick={() =>
                      setServiceFilter(
                        tab.id as 'all' | 'families-couples' | 'girls' | 'private'
                      )
                    }
                    className={`min-h-[40px] px-3 sm:px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      serviceFilter === tab.id
                        ? 'bg-[#0F295C] text-white'
                        : 'text-slate-600 hover:text-[#0B1B3A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
              {filteredServices.map((service) => (
                <article
                  key={service.id}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white flex flex-col justify-between transition-colors hover:border-[#0F295C]/40"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                      <ResilientImage
                        src={service.image}
                        alt={service.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-[#9A7018] tabular-nums">
                          {service.number}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{service.seoSubtitle}</span>
                      </div>

                      <h3 className="mt-2 font-serif text-xl font-bold text-[#0B1B3A]">
                        {service.title}
                      </h3>

                      <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="mt-4 space-y-2 pt-4 border-t border-slate-100">
                        {service.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-xs sm:text-sm text-[#0B1B3A]"
                          >
                            <Check className="w-4 h-4 text-[#9A7018] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                    <a
                      href={buildWhatsAppUrl(
                        `Hello Royal Tower Mohali, I would like to enquire about ${service.title}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#0F295C] text-[#0F295C] text-sm font-semibold rounded-lg hover:bg-[#0F295C] hover:text-white transition-colors whitespace-nowrap shrink-0"
                    >
                      Enquire on WhatsApp
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Location Section (Google Maps Platform) */}
        <LocationMapSection quotaExceeded={quotaExceeded} />

        {/* 5. Customer Reviews */}
        <CustomerReviewsSection />

        {/* 6. Call To Action */}
        <CallToActionSection />
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#081838] text-slate-300 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 sm:pb-10 border-b border-white/10">
            <div className="md:col-span-5">
              <p className="font-serif text-xl font-bold text-white">Royal Tower Mohali</p>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-sm">
                Comfortable, neat, and affordable rooms for rent in Mohali for families, couples, and girls, offering short-term and long-term rental stays.
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F2D68B]">
                Room for Rent
              </p>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li>
                  <a href="#services" className="hover:text-white transition-colors inline-block py-0.5">
                    Family Room for Rent in Mohali
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors inline-block py-0.5">
                    Couple Room for Rent in Mohali
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors inline-block py-0.5">
                    Girls Room for Rent in Mohali
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-white transition-colors inline-block py-0.5">
                    Customer Reviews
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F2D68B]">
                Quick Contact
              </p>
              <ul className="mt-3 space-y-2.5 text-sm">
                <li>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="hover:text-white transition-colors tabular-nums inline-block py-0.5"
                  >
                    Call: {SITE_CONFIG.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={buildWhatsAppUrl(
                      'Hello Royal Tower Mohali, I would like to enquire about rooms for rent.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors tabular-nums inline-block py-0.5"
                  >
                    WhatsApp: {SITE_CONFIG.whatsappDisplay}
                  </a>
                </li>
                <li className="text-slate-400 leading-relaxed">{SITE_CONFIG.addressLine2}</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 pb-16 sm:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Royal Tower Mohali. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#top" className="hover:text-white transition-colors py-1">
                Back to Top
              </a>
              <span aria-hidden="true">·</span>
              <a href="/sitemap.xml" className="hover:text-white transition-colors py-1">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Subtle Floating WhatsApp Quick-Chat Button (<= 48px, compliant with 15% mobile sticky cap) */}
      <a
        href={buildWhatsAppUrl(
          'Hello Royal Tower Mohali, I am looking for a room for rent in Mohali.'
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Royal Tower Mohali on WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-30 w-12 h-12 rounded-full bg-[#189A48] text-white border border-[#14823C] shadow-lg flex items-center justify-center hover:bg-[#14823C] transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}
