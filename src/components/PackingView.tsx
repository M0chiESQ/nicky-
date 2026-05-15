/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Briefcase, CreditCard, Smartphone, Umbrella, Shirt, ShoppingBag, CheckSquare, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface PackingViewProps {
  region: string;
}

export default function PackingView({ region }: PackingViewProps) {
  const taiwanPacking = {
    bag: [
      { item: 'Compact Umbrella', desc: 'Crucial for Taipei\'s sudden thunderstorms.', icon: Umbrella },
      { item: 'Light Jacket', desc: 'The MRT and malls have intense air conditioning.', icon: Shirt },
      { item: 'Power Bank', icon: Smartphone, desc: 'You\'ll be using Google Maps and Instagram a lot.' },
      { item: 'Reusable Shopping Bag', icon: ShoppingBag, desc: 'Plastic bags cost extra at stores.' }
    ],
    wallet: [
      { item: 'EASYCARD', desc: 'The ultimate tool. Metro, Bus, YouBike, 7-11.', color: 'bg-sky-400' },
      { item: 'CASH (NTD)', desc: 'Night markets and small stalls only take cash.', color: 'bg-red-400' },
      { item: 'ARC / PASSPORT', desc: 'Always carry a photocopy of your ID.', color: 'bg-zinc-400' }
    ]
  };

  const usaPacking = {
    bag: [
      { item: 'Reusable Water Bottle', desc: 'Tap water is free and clean everywhere.', icon: Umbrella },
      { item: 'Walking Shoes', desc: 'Cities like NYC or Chicago involve miles of walking.', icon: Shirt },
      { item: 'Phone Mount', icon: Smartphone, desc: 'Essential if you are renting a car for road trips.' },
      { item: 'Layers (Hoodie)', icon: Shirt, desc: 'US weather varies wildly by state.' }
    ],
    wallet: [
      { item: 'DRIVER\'S LICENSE', desc: 'The universal ID of the USA.', color: 'bg-sky-400' },
      { item: 'CREDIT CARD', desc: 'Most places are card-only or card-preferred.', color: 'bg-green-400' },
      { item: 'APPS (CALTICKET/OMNY)', desc: 'Digital transit tickets for local hubs.', color: 'bg-zinc-400' }
    ]
  };

  const intlPacking = {
    bag: [
      { item: 'Universal Adapter', desc: 'A must-have for crossing borders.', icon: Zap },
      { item: 'Noise Cancelling Headphones', desc: 'Survival gear for long-haul flights.', icon: Smartphone },
      { item: 'Travel Insurance Info', icon: Briefcase, desc: 'Digital and paper copies of your policy.' },
      { item: 'Compression Socks', icon: Shirt, desc: 'Keep the circulation flowing on 10+ hour flights.' }
    ],
    wallet: [
      { item: 'PASSPORT', desc: 'Your ticket to the world.', color: 'bg-purple-400' },
      { item: 'FOREX CARD', desc: 'Multi-currency digital wallet.', color: 'bg-yellow-400' },
      { item: 'e-SIM QR CODE', desc: 'Instant local data upon arrival.', color: 'bg-emerald-400' }
    ]
  };

  const currentData = region === 'taiwan' ? taiwanPacking : region === 'usa' ? usaPacking : intlPacking;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase italic">
          Loadout
        </h1>
        <div className={`inline-block px-12 py-3 ${region === 'taiwan' ? 'bg-yellow-400' : region === 'usa' ? 'bg-red-500' : 'bg-purple-600'} border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-white font-black text-xl uppercase tracking-[0.2em] -rotate-1`}>
          {region === 'taiwan' ? 'Taipei' : region === 'usa' ? 'USA' : 'Global'} Gear
        </div>
      </header>

      <div className="grid gap-12">
        {/* Wallet Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <CreditCard className="w-8 h-8" />
             <h2 className="text-3xl font-black uppercase italic tracking-tighter underline">What's in your wallet?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {currentData.wallet.map((item, i) => (
              <motion.div
                key={item.item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform"
              >
                <div className={`absolute top-0 right-0 w-16 h-16 ${item.color} -translate-y-8 translate-x-8 rotate-45 border-4 border-black`} />
                <h3 className="font-black text-lg mb-2 relative z-10">{item.item}</h3>
                <p className="text-sm font-bold text-zinc-500 relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bag Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
             <Briefcase className="w-8 h-8" />
             <h2 className="text-3xl font-black uppercase italic tracking-tighter underline">In your bag</h2>
          </div>
          <div className="space-y-4">
            {currentData.bag.map((item, i) => (
              <motion.div
                key={item.item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-4 border-black rounded-[40px] p-8 flex items-center justify-between group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 ${region === 'taiwan' ? 'bg-sky-100' : region === 'usa' ? 'bg-red-50' : 'bg-purple-100'} border-4 border-black rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{item.item}</h3>
                    <p className="text-zinc-500 font-bold text-sm italic">{item.desc}</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <CheckSquare className="w-8 h-8 text-zinc-200 group-hover:text-green-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pro Tip */}
        <div className="bg-black text-white border-4 border-black rounded-[40px] p-10 flex flex-col items-center justify-center text-center shadow-[12px_12px_0px_0px_rgba(147,51,234,1)]">
           <h3 className="text-2xl font-black uppercase mb-4 tracking-tight">TRAINER ADVICE</h3>
           <p className="max-w-xl font-bold leading-relaxed opacity-80">
            {region === 'taiwan' 
              ? "Don't overpack! Taiwan has a convenience store on every corner where you can buy anything you forgot."
              : region === 'usa'
              ? "Space is luxury! If you are road-tripping, leave room for snacks and souvenirs from those weird highway stops."
              : "Cross-border prep! Always take a photo of your passport and store it in an encrypted cloud folder."
            }
           </p>
        </div>
      </div>
    </div>
  );
}
