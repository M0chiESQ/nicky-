import React, { useEffect, useRef, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, ControlPosition, MapControl, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Sparkles, Navigation as NavIcon, Search, MapPin as PinIcon, Wand2 } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

function AutocompleteControl({ onPlaceSelect }: { onPlaceSelect: (place: google.maps.places.Place) => void }) {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const containerRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<any>(null);

  useEffect(() => {
    if (!placesLib || !containerRef.current) return;

    // Use the PlaceAutocompleteElement (Web Component)
    const autocomplete = document.createElement('gmp-place-autocomplete');
    // Set properties directly on the element (CF8)
    (autocomplete as any).onPlaceSelect = (event: any) => {
      onPlaceSelect(event.place);
      if (event.place.location) {
        map?.panTo(event.place.location);
        map?.setZoom(15);
      }
    };
    
    containerRef.current.appendChild(autocomplete);
    autocompleteRef.current = autocomplete;

    return () => {
      if (autocompleteRef.current) {
        containerRef.current?.removeChild(autocompleteRef.current);
      }
    };
  }, [placesLib, onPlaceSelect, map]);

  return (
    <MapControl position={ControlPosition.TOP_LEFT}>
      <div ref={containerRef} className="m-6 min-w-[300px] md:min-w-[400px] bg-white border-4 border-black p-2 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
         <Wand2 className="w-5 h-5 ml-2 text-gryffindor-gold" />
      </div>
    </MapControl>
  );
}

export default function NavigationView({ region }: { region: string }) {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.Place | null>(null);

  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-white border-4 border-black rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-20 h-20 bg-gryffindor-gold border-4 border-black rounded-full flex items-center justify-center mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <NavIcon className="w-10 h-10 text-white animate-pulse" />
        </div>
        <h2 className="text-3xl font-black mb-4 uppercase italic">Magic Compass Offline</h2>
        <p className="text-zinc-500 font-bold mb-8 max-w-md">
          To activate the navigation spell, you must provide your Google Maps API Key in the secret vault.
        </p>
        <div className="text-left space-y-4 bg-zinc-50 p-6 rounded-2xl border-2 border-black font-medium text-sm">
          <p><strong>1.</strong> <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" className="text-sky-500 underline">Get an API Key</a></p>
          <p><strong>2.</strong> Add it as a secret in AI Studio:</p>
          <ul className="list-disc pl-5 space-y-2 text-xs">
            <li>Settings (⚙️) → <strong>Secrets</strong></li>
            <li>Key: <code>GOOGLE_MAPS_PLATFORM_KEY</code></li>
            <li>Value: [Your API Key]</li>
          </ul>
        </div>
      </div>
    );
  }

  const center = region === 'taiwan' ? { lat: 25.0330, lng: 121.5654 } : region === 'usa' ? { lat: 34.0522, lng: -118.2437 } : { lat: 0, lng: 0 };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-4 italic uppercase underline decoration-gryffindor-gold">Destination Scryer</h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Navigate the {region === 'taiwan' ? 'Hogwarts Express' : 'Indigo League Path'}</p>
      </header>

      <div className="h-[70vh] w-full rounded-[40px] border-4 border-black overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative bg-zinc-100">
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={center}
            defaultZoom={13}
            mapId="DEMO_MAP_ID"
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            className="w-full h-full"
            disableDefaultUI={false}
          >
            <AutocompleteControl onPlaceSelect={(place) => setSelectedPlace(place)} />
            
            {selectedPlace && (
               <AdvancedMarker position={selectedPlace.location}>
                  <Pin background="#740001" glyphColor="#D3A625" borderColor="#000" />
               </AdvancedMarker>
            )}

            <div className="absolute bottom-8 left-8 right-8 pointer-events-none flex justify-center">
              {selectedPlace ? (
                <div className="bg-white border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-auto flex flex-col md:flex-row items-center gap-6 max-w-2xl w-full">
                   <div className="w-16 h-16 bg-gryffindor-gold border-4 border-black rounded-2xl flex items-center justify-center shrink-0">
                      <PinIcon className="w-8 h-8 text-white" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black uppercase tracking-tighter truncate">{selectedPlace.displayName}</h3>
                      <p className="text-xs text-zinc-500 font-bold truncate">{selectedPlace.formattedAddress}</p>
                   </div>
                   <button className="spell-button !py-2 !px-4 !text-[10px]">
                      SET PORTKEY
                   </button>
                </div>
              ) : (
                <div className="bg-black text-white px-8 py-3 rounded-full border-2 border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-[10px] uppercase tracking-[0.2em] inline-block text-center">
                   Speak the destination into the scryer scroll above...
                </div>
              )}
            </div>
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}
