import { Phone, ArrowRight } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../data/siteConfig';

const LEFT_CIRCLES = [
  {
    type: 'image' as const,
    src: '/src/assets/images/simple_pg_family_room_1795487766822.jpg',
    alt: 'Family Room for Rent at Royal Tower Mohali',
    positionClass: 'top-7 left-10 w-12 h-12',
  },
  {
    type: 'initials' as const,
    initials: 'JK',
    bgClass: 'bg-[#0F295C] text-[#F2D68B]',
    positionClass: 'top-4 left-36 w-16 h-16',
  },
  {
    type: 'image' as const,
    src: '/src/assets/images/simple_pg_couple_room_1795487767079.jpg',
    alt: 'Couple Room for Rent at Royal Tower Mohali',
    positionClass: 'top-1/2 -translate-y-1/2 left-20 w-14 h-14',
  },
  {
    type: 'initials' as const,
    initials: 'M',
    bgClass: 'bg-[#C89B3C] text-[#081838]',
    positionClass: 'bottom-6 left-10 w-10 h-10',
  },
  {
    type: 'image' as const,
    src: '/src/assets/images/simple_pg_girls_room_1795487767645.jpg',
    alt: 'Girls Room for Rent at Royal Tower Mohali',
    positionClass: 'bottom-5 left-48 w-16 h-16',
  },
];

const RIGHT_CIRCLES = [
  {
    type: 'image' as const,
    src: '/src/assets/images/simple_pg_building_1795487765724.jpg',
    alt: 'Royal Tower Mohali building exterior',
    positionClass: 'top-5 right-36 w-16 h-16',
  },
  {
    type: 'initials' as const,
    initials: 'JS',
    bgClass: 'bg-[#173B82] text-white',
    positionClass: 'top-8 right-10 w-11 h-11',
  },
  {
    type: 'image' as const,
    src: '/src/assets/images/simple_pg_clean_bathroom_1795487767486.jpg',
    alt: 'Clean bathroom at Royal Tower Mohali',
    positionClass: 'top-1/2 -translate-y-1/2 right-16 w-14 h-14',
  },
  {
    type: 'initials' as const,
    initials: 'Y',
    bgClass: 'bg-[#0F295C] text-white',
    positionClass: 'bottom-7 right-48 w-10 h-10',
  },
  {
    type: 'image' as const,
    src: '/src/assets/images/simple_pg_family_room_1795487766822.jpg',
    alt: 'Clean bedroom at Royal Tower Mohali',
    positionClass: 'bottom-5 right-24 w-16 h-16',
  },
];

export function CallToActionSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-[#0F295C] via-[#173B82] to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#F8FAFC] border border-slate-200/80 shadow-lg px-5 py-10 sm:px-8 sm:py-16 md:py-20 text-center">
          {/* Decorative Floating Left Circles (Desktop) */}
          <div className="hidden lg:block pointer-events-none" aria-hidden="true">
            {LEFT_CIRCLES.map((item, idx) =>
              item.type === 'image' ? (
                <div
                  key={`left-circle-${idx}`}
                  className={`absolute ${item.positionClass} rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  key={`left-circle-${idx}`}
                  className={`absolute ${item.positionClass} ${item.bgClass} rounded-full border-2 border-white shadow-md flex items-center justify-center font-serif font-bold text-base`}
                >
                  {item.initials}
                </div>
              )
            )}
          </div>

          {/* Decorative Floating Right Circles (Desktop) */}
          <div className="hidden lg:block pointer-events-none" aria-hidden="true">
            {RIGHT_CIRCLES.map((item, idx) =>
              item.type === 'image' ? (
                <div
                  key={`right-circle-${idx}`}
                  className={`absolute ${item.positionClass} rounded-full overflow-hidden border-2 border-white shadow-md bg-slate-200`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  key={`right-circle-${idx}`}
                  className={`absolute ${item.positionClass} ${item.bgClass} rounded-full border-2 border-white shadow-md flex items-center justify-center font-serif font-bold text-base`}
                >
                  {item.initials}
                </div>
              )
            )}
          </div>

          {/* Mobile & Tablet Compact Circle Cluster */}
          <div
            className="flex lg:hidden items-center justify-center -space-x-2 mb-5 pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-200">
              <img
                src="/src/assets/images/simple_pg_family_room_1795487766822.jpg"
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#0F295C] text-[#F2D68B] border-2 border-white shadow-sm flex items-center justify-center font-serif font-bold text-xs">
              JK
            </div>
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-200">
              <img
                src="/src/assets/images/simple_pg_couple_room_1795487767079.jpg"
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-[#C89B3C] text-[#081838] border-2 border-white shadow-sm flex items-center justify-center font-serif font-bold text-xs">
              JS
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-200">
              <img
                src="/src/assets/images/simple_pg_girls_room_1795487767645.jpg"
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Centered CTA Content */}
          <div className="relative z-10 max-w-lg mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1B3A] tracking-tight text-balance">
              Book Your Room Today!
            </h2>

            <p className="mt-2.5 sm:mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              Affordable &amp; Clean Rooms in Mohali.
            </p>

            <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
              Sector 78, Sohana, Landran Road · Family, Couple &amp; Girls Room for Rent
            </p>

            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={SITE_CONFIG.phoneHref}
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-7 py-3.5 bg-[#0F295C] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#173B82] transition-colors shadow-sm whitespace-nowrap shrink-0 tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#F2D68B] shrink-0" />
                Call Now: {SITE_CONFIG.phoneDisplay}
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Prefer messaging?{' '}
              <a
                href={buildWhatsAppUrl(
                  'Hello Royal Tower Mohali, I would like to book a clean and affordable room in Mohali.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0F295C] underline underline-offset-4 hover:text-[#9A7018] py-1 inline-block"
              >
                WhatsApp 98157 29900
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
