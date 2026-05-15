/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Plane, Star, MapPin, Camera, Globe } from 'lucide-react';

const GLOBAL_DESTINATIONS = [
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    description: 'A neon-lit metropolis where ancient shrines stand next to futuristic skyscrapers.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80',
    tags: ['NEON', 'SUSHI', 'TEMPLES'],
    tips: 'Get a Suica card for seamless transport across the city.'
  },
  {
    id: 'paris',
    name: 'Paris, France',
    description: 'The City of Light, offering world-class art, fashion, and culinary masterpieces.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80',
    tags: ['ART', 'PASTRY', 'MUSEUMS'],
    tips: 'Visit the Louvre at night for a magical, crowd-free experience.'
  },
  {
    id: 'london',
    name: 'London, UK',
    description: 'A historic powerhouse with diverse neighborhoods and iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80',
    tags: ['HISTORY', 'PUBS', 'THEATRE'],
    tips: 'The Tube is your best friend. Use contactless or Oyster.'
  }
];

const INT_FLIGHT_TIPS = [
  { region: 'ASIA HUB', airline: 'CATHAY / SINGAPORE', tip: 'Exceptional service and lounge access. Perfect for long hauls.' },
  { region: 'EUROPE CONNECT', airline: 'LUFTHANSA / AIR FRANCE', tip: 'Hubs like Frankfurt or CDG are massive. Allow at least 2 hours for connections.' }
];

export default function GlobalDestinationsView() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic">
          Expedition
        </h1>
        <div className="inline-block px-12 py-3 bg-purple-600 border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white font-black text-xl uppercase tracking-[0.2em] rotate-1">
          Global Reach
        </div>
      </header>

      {/* Arrival Tips */}
      <div className="mb-12 grid md:grid-cols-2 gap-6">
        {INT_FLIGHT_TIPS.map((tip, i) => (
          <div key={i} className="bg-white border-4 border-black rounded-[30px] p-6 shadow-[6px_6px_0px_0px_rgba(147,51,234,1)]">
            <div className="flex items-center gap-3 mb-3">
              <Plane className="w-6 h-6 text-purple-500" />
              <h3 className="font-black text-xs uppercase tracking-widest">{tip.region}</h3>
            </div>
            <div className="text-[10px] font-black text-zinc-400 mb-2">{tip.airline}</div>
            <p className="text-xs font-bold leading-relaxed">{tip.tip}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8">
        {GLOBAL_DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white border-4 border-black rounded-[40px] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all"
          >
            <div className="h-64 relative overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-6 right-6 bg-white border-2 border-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Star className="w-3 h-3 inline-block mr-1 fill-yellow-400" /> Top Rated
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-purple-500" />
                <h2 className="text-3xl font-black uppercase tracking-tighter italic">{dest.name}</h2>
              </div>
              
              <p className="font-bold text-zinc-500 italic mb-6 leading-relaxed">
                {dest.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {dest.tags.map(tag => (
                  <span key={tag} className="px-4 py-1 bg-zinc-100 border-2 border-black rounded-lg text-[10px] font-black tracking-widest">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="bg-purple-50 border-4 border-black border-dashed rounded-3xl p-6 flex items-start gap-4">
                <div className="p-2 bg-white border-2 border-black rounded-xl">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-400 mb-1">LOCAL INSIGHT</h4>
                  <p className="text-xs font-bold italic">{dest.tips}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 bg-black text-white p-12 rounded-[50px] text-center border-4 border-black shadow-[12px_12px_0px_0px_rgba(147,51,234,1)]">
         <Camera className="w-12 h-12 mx-auto mb-6 text-purple-400 animate-pulse" />
         <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-4">The World is Waiting</h3>
         <p className="max-w-xl mx-auto font-bold opacity-60 italic">
           From the Shibuya Crossing to the streets of Montmartre, every mile is a memory. Keep exploring.
         </p>
      </div>
    </div>
  );
}
