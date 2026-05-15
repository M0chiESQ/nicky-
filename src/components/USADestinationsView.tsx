/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plane, Train, MapPin, Info, Car } from 'lucide-react';
import { motion } from 'motion/react';

interface USADestination {
  city: string;
  region: string;
  description: string;
  fromAirport: string;
  fromHub: string;
  color: string;
}

const USA_DESTINATIONS: USADestination[] = [
  {
    city: 'SACRAMENTO',
    region: 'California',
    description: 'The Golden States capital. Rich in Gold Rush history and farm-to-fork dining.',
    fromAirport: 'Fly into SMF. Take the 142 Bus or a quick rideshare to Downtown.',
    fromHub: 'Capitol Corridor Amtrak from San Francisco/San Jose stops at the old Depot.',
    color: 'bg-yellow-50'
  },
  {
    city: 'SAN GABRIEL AREA',
    region: 'SoCal',
    description: 'The SGV. Home to the best authentic Asian food and historic San Gabriel Mission.',
    fromAirport: 'Fly into LAX or ONT. A car is essential to navigate the many plazas.',
    fromHub: 'Metro A Line (Gold) stops nearby, but local buses/Uber are best for food hopping.',
    color: 'bg-red-50'
  },
  {
    city: 'HAWAII',
    region: 'Pacific',
    description: 'The Aloha State. Volcanic wonders, lush rainforests, and crystal blue waves.',
    fromAirport: 'Fly into HNL (Oahu), OGG (Maui), or KOA (Big Island).',
    fromHub: 'Inter-island flights (Southwest/Hawaiian) are your "Regional Trains".',
    color: 'bg-sky-50'
  },
  {
    city: 'SAN JOSE',
    region: 'Silicon Valley',
    description: 'The tech capital. Modern innovation meets diverse neighborhoods and great food.',
    fromAirport: 'Fly directly into SJC. It’s minutes away from the downtown core.',
    fromHub: 'Caltrain connects directly to SF and the Peninsula tech corridor.',
    color: 'bg-zinc-50'
  },
  {
    city: 'SF CHINATOWN',
    region: 'San Francisco',
    description: 'The largest and oldest Chinatown in North America. Red lanterns and hidden gems.',
    fromAirport: 'BART to Montgomery St, then a short walk or cable car ride.',
    fromHub: 'Muni buses and the new Central Subway (Rose Pak Station) serve the heart.',
    color: 'bg-rose-100'
  }
];

const USA_FLIGHT_TIPS = [
  { region: 'COAST TO COAST', airline: 'DELTA / UNITED / AA', tip: 'The "Big Three" carriers. Look for hubs like JFK, ATL, or LAX for the best international connections.' },
  { region: 'REGIONAL DEP.', airline: 'SOUTHWEST / JETBLUE', tip: 'Southwest offers free checked bags—great for long trips or road trip gear!' }
];

export default function USADestinationsView() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic">
          Across USA
        </h1>
        <div className="inline-block px-12 py-3 bg-pokemon-red border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white font-black text-xl uppercase tracking-[0.2em] -rotate-1">
          Continental Map
        </div>
      </header>

      {/* Flight Tips */}
      <div className="mb-12 grid md:grid-cols-2 gap-6">
        {USA_FLIGHT_TIPS.map((tip, i) => (
          <div key={i} className="bg-white border-4 border-black rounded-[30px] p-6 shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]">
            <div className="flex items-center gap-3 mb-3">
              <Plane className="w-6 h-6 text-red-500" />
              <h3 className="font-black text-xs uppercase tracking-widest">{tip.region}</h3>
            </div>
            <div className="text-[10px] font-black text-zinc-400 mb-2">{tip.airline}</div>
            <p className="text-xs font-bold leading-relaxed">{tip.tip}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8">
        {USA_DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.city}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`pokemon-card p-0 overflow-hidden group hover:scale-[1.01] transition-transform`}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* City Label */}
              <div className={`md:w-64 ${dest.color} border-b-4 md:border-b-0 md:border-r-4 border-black p-8 flex flex-col justify-between items-center md:items-start text-center md:text-left`}>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">{dest.region}</span>
                  <h2 className="text-3xl font-black italic underline tracking-tighter">{dest.city}</h2>
                </div>
                <div className="w-12 h-12 bg-white rounded-xl border-4 border-black flex items-center justify-center mt-6 rotate-3">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>

              {/* Guide Info */}
              <div className="flex-1 p-8 space-y-6">
                <p className="font-bold text-zinc-600 italic">"{dest.description}"</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sky-500">
                      <Plane className="w-4 h-4" />
                      From Core Airport
                    </div>
                    <p className="text-sm font-medium text-zinc-800 bg-sky-50 p-4 rounded-xl border-2 border-black">
                      {dest.fromAirport}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500">
                      <Train className="w-4 h-4" />
                      Regional Transit
                    </div>
                    <p className="text-sm font-medium text-zinc-800 bg-red-50 p-4 rounded-xl border-2 border-black">
                      {dest.fromHub}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="mt-12 bg-yellow-400 border-4 border-black rounded-[40px] p-10 flex flex-col items-center justify-center text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
           <Car className="w-12 h-12 mb-4" />
           <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">TRAINER TIP: THE CAR RULE</h3>
           <p className="max-w-xl font-bold leading-relaxed">
             Outside of NYC and Chicago, you often need a <span className="underline italic">Car (Personal Vehicle)</span> to explore. 
             Public transit is limited in many Southern and Western states!
           </p>
        </div>
      </div>
    </div>
  );
}
