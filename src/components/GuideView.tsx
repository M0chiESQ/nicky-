/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, CloudRain, CreditCard, Info, MapPin, Train, Camera, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface GuideViewProps {
  region: string;
}

export default function GuideView({ region }: GuideViewProps) {
  const taiwanEssentials = [
    {
      title: 'EASYCARD GET!',
      icon: CreditCard,
      description: 'Your primary tool for Taipei. Works on Metro, buses, and even at 7-Eleven. Pick one up at any station or convenience store.',
      tip: 'The Super EasyCard is rechargeable via app!'
    },
    {
      title: 'METRO MASTERY',
      icon: Train,
      description: 'Taipei Metro (MRT) is world-class. Follow the color-coded lines. No eating or drinking within the yellow lines!',
      tip: 'Blue Line (Bannan) is the main vein for shopping.'
    },
    {
      title: 'WEATHER PREP',
      icon: CloudRain,
      description: 'Taipei can be humid and rainy. Always carry a small umbrella and a light jacket for cold MRT air conditioning.',
      tip: 'Afternoon thunderstorms are common in summer.'
    },
    {
      title: 'TRASH PROTOCOL',
      icon: Info,
      description: 'Public bins are rare. Keep your trash until you reach a convenience store or your stay. Listen for the music trucks!',
      tip: 'The classical music means the garbage truck is here.'
    }
  ];

  const usaEssentials = [
    {
      title: 'APPS READY',
      icon: CreditCard,
      description: 'Download Uber, Lyft, and Yelp. In the USA, digital tools are essential for navigation and finding the best spots.',
      tip: 'Apple Pay is accepted almost everywhere now.'
    },
    {
      title: 'TIPPING CULTURE',
      icon: DollarSign,
      description: 'Tipping is standard in the USA (usually 18-22% at restaurants). Budget accordingly for service staff.',
      tip: 'No need to tip at fast food or counter service.'
    },
    {
      title: 'DISTANCE SCALE',
      icon: MapPin,
      description: 'The USA is massive. What looks close on a map might be a 4-hour drive. Check your commute times carefully.',
      tip: 'Renting a car is often cheaper than long Ubers.'
    },
    {
      title: 'STAY HYDRATED',
      icon: Info,
      description: 'Tap water is drinkable in almost all US cities! Carry a reusable bottle to save money and stay eco-friendly.',
      tip: 'Look for "filling stations" in airports and parks.'
    }
  ];

  const essentials = region === 'taiwan' ? taiwanEssentials : usaEssentials;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-24">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
          Before You Visit
        </h1>
        <div className={`inline-block px-10 py-3 ${region === 'taiwan' ? 'bg-red-500' : 'bg-pokemon-blue'} border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white font-black text-lg uppercase tracking-widest -rotate-1`}>
          {region === 'taiwan' ? 'Taipei' : 'USA'} Essentials
        </div>
      </header>

      <div className="grid gap-12">
        {/* Intro Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-4 border-black rounded-[40px] p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-32 h-32 ${region === 'taiwan' ? 'bg-sky-100' : 'bg-red-100'} border-l-4 border-b-4 border-black -translate-y-4 translate-x-4 rotate-12`} />
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6 flex items-center gap-4">
              <MapPin className="w-8 h-8 text-red-500" />
              {region === 'taiwan' ? 'READY FOR ADVENTURE?' : 'BIG COUNTRY, BIG ADVENTURE?'}
            </h2>
            <p className="text-lg text-zinc-700 font-medium leading-relaxed mb-8">
              {region === 'taiwan' 
                ? "Taipei is a city where tradition meets high-tech neon. It is incredibly safe, the people are famously friendly, and the food is world-class. Here is what you need to know before stepping off the plane."
                : "The USA offers vast diversity, from the skyscrapers of NYC to the grand canyons of Arizona. It's a land of freedom and car culture. Knowing a few basics will help you navigate this massive continent."
              }
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-sky-50 border-2 border-black rounded-full px-6 py-2 font-black text-xs uppercase tracking-widest text-sky-600">
                {region === 'taiwan' ? 'Visa Free for many' : 'ESTA / Visa Required'}
              </div>
              <div className="bg-yellow-50 border-2 border-black rounded-full px-6 py-2 font-black text-xs uppercase tracking-widest text-yellow-700">
                110V Type A/B Power
              </div>
              <div className="bg-green-50 border-2 border-black rounded-full px-6 py-2 font-black text-xs uppercase tracking-widest text-green-700">
                {region === 'taiwan' ? 'High Safety Index' : 'Diversity and Space'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Essentials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {essentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border-4 border-black rounded-[40px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform group"
            >
              <div className="w-16 h-16 bg-sky-50 rounded-2xl border-4 border-black flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors">
                <item.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{item.title}</h3>
              <p className="text-zinc-600 font-medium mb-6 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="bg-zinc-50 border-2 border-black rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <p className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
                  <span className="text-black">PRO TIP:</span> {item.tip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <div className={`bg-black rounded-[40px] p-12 text-center text-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(${region === 'taiwan' ? '56,189,248,1' : '239,68,68,1'})]`}>
           <h2 className="text-4xl font-black mb-6 tracking-tight">STILL SEARCHING?</h2>
           <p className="text-zinc-400 font-medium mb-10 max-w-lg mx-auto">
             {region === 'taiwan' 
               ? "Taipei is best explored by getting slightly lost in the lanes. Don't worry, a Metro station is never far away."
               : "The USA is best explored with a good playlist and a long stretch of highway. Pack snacks and enjoy the ride."
             }
           </p>
           <button className="bg-white text-black px-12 py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:bg-yellow-400 transition-colors border-4 border-black">
             {region === 'taiwan' ? 'Download Town Map' : 'Download Trip Map'}
           </button>
        </div>
      </div>
    </div>
  );
}
