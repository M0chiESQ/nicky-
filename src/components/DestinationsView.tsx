/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Train, Bus, Plane, MapPin, ChevronRight, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface Destination {
  city: string;
  region: string;
  description: string;
  fromAirport: string;
  fromTaipei: string;
  color: string;
}

const DESTINATIONS: Destination[] = [
  {
    city: 'CHANGHUA',
    region: 'Central',
    description: 'Famous for the Great Buddha of Baguashan and incredible meatballs (Ba-wan).',
    fromAirport: 'HSR from Taoyuan to Taichung, then local TRA train to Changhua (15m).',
    fromTaipei: 'HSR to Taichung then local train, or direct TRA Express (approx 2h).',
    color: 'bg-rose-50'
  },
  {
    city: 'KAOHSIUNG',
    region: 'South',
    description: 'The port city of the south. Famous for art piers and harbor views.',
    fromAirport: 'Take the MRT to TAIPEI MAIN, then HSR to ZUOYING (approx 1.5h).',
    fromTaipei: 'High Speed Rail (HSR) from Taipei Main Station to Zuoying Station.',
    color: 'bg-red-100'
  },
  {
    city: 'TAINAN',
    region: 'South',
    description: 'The ancient capital. The heart of Taiwanese culture and street food.',
    fromAirport: 'HSR from Taoyuan Station to Tainan Station (requires shuttle from TPE).',
    fromTaipei: 'HSR for speed (1.5h) or TRA express trains for a scenic vibe.',
    color: 'bg-yellow-100'
  },
  {
    city: 'TAICHUNG',
    region: 'Central',
    description: 'A modern hub of design, bubble tea origins, and night markets.',
    fromAirport: 'Airport Bus directly to Taichung, or HSR from Taoyuan Station.',
    fromTaipei: 'HSR (45m) or many Kuo-Kuang buses from Taipei Bus Station.',
    color: 'bg-sky-100'
  },
  {
    city: 'HSINCHU',
    region: 'North-West',
    description: 'The Silicon Valley of Taiwan, known for wind and tech.',
    fromAirport: 'Bus or Taxi directly (very close), or HSR to Hsinchu Station.',
    fromTaipei: 'TRA local trains or HSR (only 30 mins).',
    color: 'bg-green-100'
  },
  {
    city: 'YILAN',
    region: 'East',
    description: 'Lush plains, hot springs, and amazing cold onion pancakes.',
    fromAirport: 'Airport Bus directly to Yilan/Luodong via the mountain tunnel.',
    fromTaipei: 'Kamalan Bus from Taipei Main or TRA trains through the coast.',
    color: 'bg-emerald-50'
  },
  {
    city: 'KEELUNG',
    region: 'North',
    description: 'The rainy port city with the best seafood night market in Taiwan.',
    fromAirport: 'Bus 1968 to Taipei, then TRA local train to Keelung Station.',
    fromTaipei: 'TRA local train (40 mins) or Bus 2088 from Keelung Road.',
    color: 'bg-blue-50'
  },
  {
    city: 'MIAOLI',
    region: 'Central',
    description: 'Hakkan heartland with beautiful woodcarving and mountain views.',
    fromAirport: 'HSR from Taoyuan Station to Miaoli HSR station.',
    fromTaipei: 'TRA Express trains stop at Miaoli Station; HSR for Hakkan museum.',
    color: 'bg-orange-50'
  },
  {
    city: 'TOUFEN',
    region: 'Central',
    description: 'A bustling hub in Miaoli, perfect for exploring northern mountains.',
    fromAirport: 'Bus to Hsinchu, then local bus or taxi to Toufen.',
    fromTaipei: 'Intercity buses (Kuo-Kuang) go directly to Toufen Central.',
    color: 'bg-zinc-50'
  }
];

const AIRPORT_TIPS = [
  { airport: 'TAOYUAN (TPE)', airline: 'EVA AIR / CHINA AIRLINES', tip: 'Most international flights land here. Take the MRT Express (Purple) to Taipei Main in 35 mins.' },
  { airport: 'SONGSHAN (TSA)', airline: 'STARLUX / ANA / JAL', tip: 'Located right in the city. Perfect for regional flights from Tokyo/Seoul/Shanghai.' }
];

export default function DestinationsView() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic">
          Beyond Taipei
        </h1>
        <div className="inline-block px-12 py-3 bg-pokemon-blue border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white font-black text-xl uppercase tracking-[0.2em] -rotate-1">
          Regional Map
        </div>
      </header>

      {/* Arrival Tips */}
      <div className="mb-12 grid md:grid-cols-2 gap-6">
        {AIRPORT_TIPS.map((tip, i) => (
          <div key={i} className="bg-white border-4 border-black rounded-[30px] p-6 shadow-[6px_6px_0px_0px_rgba(56,189,248,1)]">
            <div className="flex items-center gap-3 mb-3">
              <Plane className="w-6 h-6 text-sky-500" />
              <h3 className="font-black text-xs uppercase tracking-widest">{tip.airport}</h3>
            </div>
            <div className="text-[10px] font-black text-zinc-400 mb-2">{tip.airline}</div>
            <p className="text-xs font-bold leading-relaxed">{tip.tip}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8">
        {DESTINATIONS.map((dest, i) => (
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
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">{dest.region} Taiwan</span>
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
                      From TPE Airport
                    </div>
                    <p className="text-sm font-medium text-zinc-800 bg-sky-50 p-4 rounded-xl border-2 border-black">
                      {dest.fromAirport}
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500">
                      <Train className="w-4 h-4" />
                      From Taipei Main
                    </div>
                    <p className="text-sm font-medium text-zinc-800 bg-red-50 p-4 rounded-xl border-2 border-black">
                      {dest.fromTaipei}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="mt-12 bg-yellow-400 border-4 border-black rounded-[40px] p-10 flex flex-col items-center justify-center text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
           <Info className="w-12 h-12 mb-4" />
           <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">TRAINER TIP: HSR vs TRA</h3>
           <p className="max-w-xl font-bold leading-relaxed">
             The <span className="underline italic">HSR (High Speed Rail)</span> only runs along the West Coast. 
             If you are going East (Yilan), you must use the <span className="underline italic">TRA (Normal Train)</span> or a Bus!
           </p>
        </div>
      </div>
    </div>
  );
}
