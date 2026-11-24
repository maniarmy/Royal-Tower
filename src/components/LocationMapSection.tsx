import { useState, useCallback, useEffect } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
  useMap,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Clock, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

interface LocationMapSectionProps {
  quotaExceeded: boolean;
}

function RoyalTowerMapCanvas({ quotaExceeded }: { quotaExceeded: boolean }) {
  const status = useApiLoadingStatus();
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const [markerPosition, setMarkerPosition] = useState(SITE_CONFIG.coordinates);

  useEffect(() => {
    let active = true;
    async function resolveSector78Location() {
      if (!placesLib?.Place?.searchByText) return;
      try {
        const { places } = await placesLib.Place.searchByText({
          textQuery: 'Sector 78, Sohana, Landran Road, Mohali, Punjab',
          fields: ['location'],
          maxResultCount: 1,
        });
        const loc = places?.[0]?.location;
        if (active && loc) {
          const nextPos = { lat: loc.lat(), lng: loc.lng() };
          setMarkerPosition(nextPos);
          if (map) {
            map.panTo(nextPos);
            map.setZoom(15);
          }
        }
      } catch {
        // Keep default map center if Places search is unavailable
      }
    }
    resolveSector78Location();
    return () => {
      active = false;
    };
  }, [placesLib, map]);

  const handleMarkerClick = useCallback(() => {
    setInfoOpen((prev) => !prev);
  }, []);

  if (
    quotaExceeded ||
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <div className="w-full h-[300px] sm:h-[380px] md:h-[460px] bg-[#F8FAFC] border border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 sm:p-8 text-center">
        <MapPin className="w-10 h-10 text-[#0F295C] mb-3" strokeWidth={1.6} />
        <h3 className="font-serif text-xl font-semibold text-[#0B1B3A]">
          {SITE_CONFIG.businessName}
        </h3>
        <p className="text-sm text-slate-600 max-w-md mt-2 leading-relaxed">
          {SITE_CONFIG.addressLine2}
        </p>
        <a
          href={SITE_CONFIG.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F295C] text-white text-sm font-medium rounded-lg hover:bg-[#173B82] transition-colors whitespace-nowrap shrink-0"
        >
          <Navigation className="w-4 h-4" />
          Open Directions in Google Maps
        </a>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px] sm:h-[380px] md:h-[460px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        defaultCenter={SITE_CONFIG.coordinates}
        defaultZoom={14}
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={markerPosition}
          onClick={handleMarkerClick}
          title={SITE_CONFIG.businessName}
        >
          <Pin
            background="#0F295C"
            borderColor="#C89B3C"
            glyphColor="#F2D68B"
            scale={1.2}
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={260}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 text-[#0B1B3A]">
              <p className="font-serif font-semibold text-sm text-[#0F295C]">
                {SITE_CONFIG.businessName}
              </p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {SITE_CONFIG.addressLine2}
              </p>
              <a
                href={SITE_CONFIG.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F295C] hover:text-[#9A7018] mt-2 underline underline-offset-2"
              >
                Get Directions
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export function LocationMapSection({ quotaExceeded }: LocationMapSectionProps) {
  return (
    <section
      id="location"
      className="py-14 sm:py-16 md:py-24 bg-[#F8FAFC] border-t border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#9A7018]">
            Location &amp; Connectivity
          </p>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1B3A] tracking-tight text-balance">
            Conveniently Located Rooms for Rent in Sector 78, Sohana, Mohali
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Situated at Sector 78, Sohana on Landran Road in Mohali, Punjab, Royal Tower Mohali provides quick access to Chandigarh, Airport Road, IT hubs, hospitals, and local daily-need markets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          <div className="lg:col-span-7">
            {MAPS_API_KEY ? (
              <APIProvider apiKey={MAPS_API_KEY} language="en" region="IN">
                <RoyalTowerMapCanvas quotaExceeded={quotaExceeded} />
              </APIProvider>
            ) : (
              <div className="w-full h-[300px] sm:h-[380px] md:h-[460px] bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                <MapPin className="w-10 h-10 text-[#0F295C] mb-3" strokeWidth={1.6} />
                <h3 className="font-serif text-xl font-semibold text-[#0B1B3A]">
                  {SITE_CONFIG.businessName}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mt-2 leading-relaxed">
                  {SITE_CONFIG.addressLine2}
                </p>
                <a
                  href={SITE_CONFIG.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F295C] text-white text-sm font-medium rounded-lg hover:bg-[#173B82] transition-colors whitespace-nowrap shrink-0"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions on Google Maps
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-7 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#0B1B3A]">
                Visit Royal Tower Mohali
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Located right off Landran Road in Sector 78, Sohana, our property keeps daily commuting effortless for families, couples, students, and working professionals across Mohali and Chandigarh.
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200 space-y-5">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#9A7018] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#0B1B3A]">Property Address</p>
                    <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">
                      {SITE_CONFIG.addressLine1}
                      <br />
                      {SITE_CONFIG.addressLine2}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#9A7018] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#0B1B3A]">Room Inspection Hours</p>
                    <p className="text-sm text-slate-600 mt-0.5">{SITE_CONFIG.visitingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 sm:mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <a
                href={SITE_CONFIG.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0F295C] text-white text-sm font-semibold rounded-lg hover:bg-[#173B82] transition-colors whitespace-nowrap shrink-0 sm:flex-1"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href={SITE_CONFIG.googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 text-[#0B1B3A] text-sm font-medium rounded-lg hover:border-[#0F295C] hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
              >
                View on Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
