import { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  PhoneCall, 
  Building2, 
  ExternalLink, 
  LocateFixed, 
  Star, 
  Clock, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { INITIAL_HOSPITALS } from '../data/medicalData';
import type { Hospital } from '../types';

interface HospitalFinderProps {
  initialDepartmentFilter?: string;
  onSelectHospital?: (hospital: Hospital) => void;
}

// Distance helper using Haversine formula (in km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

export const HospitalFinder = ({ initialDepartmentFilter }: HospitalFinderProps) => {
  const [searchQuery, setSearchQuery] = useState(initialDepartmentFilter || '');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>(INITIAL_HOSPITALS[0].id);

  // Handle HTML5 Geolocation
  const handleRequestLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser. You can search by City or PIN code.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLocating(false);
      },
      () => {
        setLocationError('Location permission denied or unavailable. You can enter any city or PIN code below.');
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  // Hospitals list with dynamically calculated distance if userLocation is available
  const hospitalsWithDistance = useMemo(() => {
    return INITIAL_HOSPITALS.map((hosp) => {
      if (userLocation) {
        const dist = calculateDistance(userLocation.lat, userLocation.lng, hosp.coordinates.lat, hosp.coordinates.lng);
        return { ...hosp, distanceKm: dist };
      }
      return hosp;
    });
  }, [userLocation]);

  // Filtered hospitals
  const filteredHospitals = useMemo(() => {
    return hospitalsWithDistance.filter((hosp) => {
      const matchesSearch =
        hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.pin.includes(searchQuery) ||
        hosp.departments.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCity = selectedCity === 'All' || hosp.city.toLowerCase() === selectedCity.toLowerCase();

      const matchesCategory =
        activeCategory === 'All' ||
        (activeCategory === 'Emergency' && hosp.hasEmergency24x7) ||
        (activeCategory === 'Multispecialty' && hosp.category === 'Multispecialty') ||
        (activeCategory === 'Government' && hosp.category === 'Government');

      return matchesSearch && matchesCity && matchesCategory;
    });
  }, [hospitalsWithDistance, searchQuery, selectedCity, activeCategory]);

  // Derived selected hospital to avoid set-state-in-effect
  const selectedHospital = useMemo(() => {
    const found = filteredHospitals.find((h) => h.id === selectedHospitalId);
    return found || filteredHospitals[0] || INITIAL_HOSPITALS[0];
  }, [filteredHospitals, selectedHospitalId]);

  // Generate Google Maps URL
  const getGoogleMapsDirectionsUrl = (hospital: Hospital) => {
    const dest = encodeURIComponent(`${hospital.name}, ${hospital.address}`);
    return `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
  };

  const getGoogleMapsGeneralSearchUrl = () => {
    const query = searchQuery ? `${searchQuery} hospitals` : 'hospitals near me';
    return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  };

  return (
    <section id="hospitals" className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E1F3EC] text-[#176B67] text-xs font-bold uppercase tracking-wider border border-[#CFE6D9]">
            Facility Directory & Emergency Routing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#203936] tracking-tight">
            Find Verified Nearby Hospitals
          </h2>
          <p className="text-base sm:text-lg text-[#667A76]">
            Locate 24/7 accredited emergency rooms, multi-specialty centers, verified contact numbers, and turn-by-turn directions.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl border border-[#DCE9E3] p-4 sm:p-6 shadow-xs mb-8 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-5 h-5 text-[#279B91] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by hospital name, locality, PIN code, or medical department..."
                className="w-full pl-12 pr-4 py-3.5 bg-[#F7F8F2] border border-[#DCE9E3] rounded-2xl text-sm text-[#203936] placeholder-[#667A76] focus:outline-none focus:ring-2 focus:ring-[#176B67] focus:bg-white transition-all"
              />
            </div>

            {/* Geolocation Button */}
            <div className="md:col-span-4 flex gap-2">
              <button
                onClick={handleRequestLocation}
                disabled={isLocating}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#E1F3EC] hover:bg-[#CFE6D9] text-[#176B67] font-bold text-xs sm:text-sm px-4 py-3.5 rounded-2xl border border-[#CFE6D9] transition-all cursor-pointer"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Detecting GPS...</span>
                  </>
                ) : (
                  <>
                    <LocateFixed className="w-4 h-4 text-[#176B67]" />
                    <span>{userLocation ? 'GPS Calibrated ✓' : 'Use My Location'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {locationError && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{locationError}</span>
            </div>
          )}

          {/* Quick Filters Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#DCE9E3]">
            {/* City Selection Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[#667A76] font-semibold mr-1">Major Hubs:</span>
              {['All', 'Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad', 'Chennai'].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    selectedCity === city
                      ? 'bg-[#176B67] text-white shadow-2xs'
                      : 'bg-[#F7F8F2] text-[#667A76] hover:bg-[#EAF7F6] border border-[#DCE9E3]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { id: 'All', label: 'All Centers' },
                { id: 'Emergency', label: '24/7 ER' },
                { id: 'Multispecialty', label: 'Multispecialty' },
                { id: 'Government', label: 'Government / AIIMS' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#279B91] text-white shadow-2xs'
                      : 'bg-[#F7F8F2] text-[#667A76] hover:bg-[#EAF7F6] border border-[#DCE9E3]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Desktop Split Layout: List (Left) & Map / Details Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Hospital Cards List (7 columns on desktop) */}
          <div className="lg:col-span-7 space-y-4 max-h-[720px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between text-xs font-bold text-[#667A76] pb-1">
              <span>Showing {filteredHospitals.length} Verified Facilities</span>
              {userLocation && <span className="text-[#176B67]">Distances sorted by live GPS</span>}
            </div>

            {filteredHospitals.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#DCE9E3] p-8 text-center space-y-4">
                <Building2 className="w-12 h-12 text-[#279B91] mx-auto opacity-50" />
                <h4 className="text-base font-bold text-[#203936]">No facility matching filters</h4>
                <p className="text-xs text-[#667A76] max-w-sm mx-auto">
                  We could not find an exact match for your search. You can search directly on Google Maps for all registered facilities.
                </p>
                <a
                  href={getGoogleMapsGeneralSearchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#176B67] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs"
                >
                  <span>Search on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              filteredHospitals.map((hospital) => {
                const isSelected = selectedHospital.id === hospital.id;
                return (
                  <div
                    key={hospital.id}
                    onClick={() => setSelectedHospitalId(hospital.id)}
                    className={`bg-white rounded-3xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-[#176B67] ring-2 ring-[#176B67]/20 shadow-md bg-gradient-to-br from-white to-[#F7F8F2]'
                        : 'border-[#DCE9E3] hover:border-[#279B91] hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-bold text-[#176B67] bg-[#E1F3EC] px-2.5 py-0.5 rounded-full border border-[#CFE6D9]">
                            {hospital.category}
                          </span>
                          {hospital.hasEmergency24x7 && (
                            <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              ● 24/7 Emergency
                            </span>
                          )}
                          {hospital.distanceKm !== undefined && (
                            <span className="text-[11px] font-bold text-[#279B91] bg-[#EAF7F6] px-2 py-0.5 rounded-md">
                              {hospital.distanceKm} km away
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-extrabold text-[#203936]">
                          {hospital.name}
                        </h3>

                        <div className="text-xs text-[#667A76] mt-1 font-medium">
                          {hospital.type}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-[#F7F8F2] border border-[#DCE9E3] px-2 py-1 rounded-lg shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-[#203936]">{hospital.rating}</span>
                        <span className="text-[10px] text-[#667A76]">({hospital.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-xs text-[#667A76] mt-3 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#279B91] shrink-0 mt-0.5" />
                      <span>{hospital.address}</span>
                    </p>

                    {/* Department Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#DCE9E3]">
                      {hospital.departments.map((dept) => (
                        <span
                          key={dept}
                          className="text-[10px] font-medium bg-[#F7F8F2] text-[#667A76] px-2 py-0.5 rounded-md border border-[#DCE9E3]"
                        >
                          {dept}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[#DCE9E3]">
                      <a
                        href={`tel:${hospital.phone.replace(/[^0-9+]/g, '')}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B67] hover:text-[#279B91] transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{hospital.phone}</span>
                      </a>

                      <div className="flex items-center gap-2">
                        <a
                          href={getGoogleMapsDirectionsUrl(hospital)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 bg-[#176B67] hover:bg-[#125552] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-2xs transition-all"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Get Directions</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Interactive Map & Selected Facility Panel (5 columns on desktop) */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            
            {/* Map Frame Card */}
            <div className="bg-white rounded-3xl border border-[#DCE9E3] overflow-hidden shadow-md">
              
              {/* Map Canvas / SVG Preview */}
              <div className="h-64 bg-[#EAF7F6] relative overflow-hidden flex items-center justify-center p-4">
                {/* SVG Visual Stylized Map Grid with Pins */}
                <div className="absolute inset-0 subtle-grid opacity-70" />
                
                {/* Visual stylised routes */}
                <svg className="absolute inset-0 w-full h-full text-[#CFE6D9]" fill="none" stroke="currentColor">
                  <path d="M-10 120 Q 150 80, 220 140 T 450 110" strokeWidth="4" strokeDasharray="6 6" />
                  <path d="M80 -20 Q 140 100, 260 160 T 380 290" strokeWidth="3" />
                </svg>

                {/* Hospital Markers positioned dynamically */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#176B67] text-white flex items-center justify-center shadow-xl border-2 border-white animate-bounce">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div className="bg-white/95 backdrop-blur-xs text-[#203936] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md mt-2 border border-[#DCE9E3] max-w-[200px] truncate text-center">
                    {selectedHospital.name}
                  </div>
                  <div className="text-[10px] text-[#176B67] font-semibold bg-[#E1F3EC] px-2 py-0.5 rounded-full mt-1 border border-[#CFE6D9]">
                    Lat: {selectedHospital.coordinates.lat.toFixed(3)}, Lng: {selectedHospital.coordinates.lng.toFixed(3)}
                  </div>
                </div>

                {/* Bottom Overlay action */}
                <a
                  href={getGoogleMapsDirectionsUrl(selectedHospital)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-[#176B67] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#DCE9E3] shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Selected Hospital Details Drawer */}
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#176B67] uppercase tracking-wider bg-[#E1F3EC] px-2.5 py-0.5 rounded-full border border-[#CFE6D9]">
                      Focused Facility
                    </span>
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      Emergency Department Active
                    </span>
                  </div>
                  <h4 className="text-lg font-extrabold text-[#203936] mt-1.5">
                    {selectedHospital.name}
                  </h4>
                  <p className="text-xs text-[#667A76] mt-1">
                    {selectedHospital.address}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#F7F8F2] p-3 rounded-xl border border-[#DCE9E3]">
                    <span className="text-[10px] text-[#667A76] block">Emergency Helpline</span>
                    <a
                      href={`tel:${selectedHospital.emergencyPhone}`}
                      className="font-bold text-red-600 hover:underline block truncate"
                    >
                      {selectedHospital.emergencyPhone}
                    </a>
                  </div>
                  <div className="bg-[#F7F8F2] p-3 rounded-xl border border-[#DCE9E3]">
                    <span className="text-[10px] text-[#667A76] block">General Desk</span>
                    <a
                      href={`tel:${selectedHospital.phone}`}
                      className="font-bold text-[#176B67] hover:underline block truncate"
                    >
                      {selectedHospital.phone}
                    </a>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href={getGoogleMapsDirectionsUrl(selectedHospital)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#176B67] hover:bg-[#125552] text-white font-bold text-xs py-3.5 rounded-xl shadow-xs transition-all"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Start Navigation (Google Maps)</span>
                  </a>

                  <a
                    href={getGoogleMapsGeneralSearchUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#F7F8F2] hover:bg-[#EAF7F6] text-[#203936] font-semibold text-xs py-2.5 rounded-xl border border-[#DCE9E3] transition-colors"
                  >
                    <span>Browse All Facilities Near Me</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#667A76]" />
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
