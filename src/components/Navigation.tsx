/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, Search, PlusSquare, Heart, User as UserIcon, Compass, MapPin, Globe, MessageSquare, ShoppingBag, LogOut, Menu, X, ChevronDown, Wand2, Sparkles, Bird, BookOpen, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../lib/firebase';
import { User } from '../types';
import { useState } from 'react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  region: string;
  onRegionChange: (region: string) => void;
  currentUser: User;
}

export default function Navigation({ activeTab, onTabChange, region, onRegionChange, currentUser }: NavigationProps) {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const tabs = [
    { id: 'home', icon: BookOpen, label: region === 'taiwan' ? 'Daily Prophet' : 'Journal' },
    { id: 'snapshots', icon: Sparkles, label: region === 'taiwan' ? 'Snap Spells' : 'Frontier' },
    { id: 'messages', icon: Bird, label: region === 'taiwan' ? 'Owl Post' : 'Comms' },
    { id: 'navigation', icon: MapPin, label: region === 'taiwan' ? 'Magic Compass' : 'GPS' },
    { id: 'packing', icon: ShoppingBag, label: region === 'taiwan' ? 'Loot & Gear' : 'Pouch' },
    { id: 'guide', icon: Wand2, label: region === 'taiwan' ? 'Marauder Map' : 'Route' },
    { id: 'destinations', icon: Globe, label: region === 'taiwan' ? 'Portkeys' : 'Highroad' },
    { id: 'studio', icon: Zap, label: 'Workshop' },
    { id: 'profile', icon: UserIcon, label: 'Wizard Profile' },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b-4 border-black px-6 py-4 flex items-center justify-between shadow-[0_4px_0_0_rgba(0,0,0,0.05)]">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-3 bg-yellow-400 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all outline-none"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden sm:flex items-center gap-3 ml-2">
            <div className={`w-10 h-10 ${region === 'taiwan' ? 'bg-sky-100' : region === 'usa' ? 'bg-red-100' : 'bg-purple-100'} rounded-full border-2 border-black flex items-center justify-center overflow-hidden`}>
               <img src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=Harry&backgroundColor=${region === 'taiwan' ? 'b6e3f4' : region === 'usa' ? 'fee2e2' : 'c4b5fd'}`} alt="Buggy" className="w-7 h-7" />
            </div>
            <div className="leading-none flex flex-col">
              <span className={`text-[8px] uppercase tracking-[0.2em] ${region === 'taiwan' ? 'text-sky-500' : region === 'usa' ? 'text-red-500' : 'text-purple-500'} font-black`}>
                {region === 'taiwan' ? 'Hogwarts' : region === 'usa' ? 'Indigo League' : 'Wizarding World'}
              </span>
              <span className="text-sm font-black tracking-tighter uppercase italic">
                {region === 'taiwan' ? "MAGIC & MONSTERS" : region === 'usa' ? "CATCH & CAST" : "EXPEDITION"}
              </span>
            </div>
          </div>
        </div>

        {/* Center Region Toggle (Desktop) */}
        <div className={`hidden md:flex items-center gap-2 p-1 bg-zinc-100 border-2 border-black rounded-full`}>
          {['taiwan', 'usa', 'international'].map((r) => (
            <button
              key={r}
              onClick={() => onRegionChange(r)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                region === r 
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]' 
                  : 'text-zinc-500 hover:text-black'
              }`}
            >
              {r === 'taiwan' ? 'TW' : r === 'usa' ? 'US' : 'INT'}
            </button>
          ))}
        </div>

        {/* User Profile / Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end leading-none mr-2">
            <span className="text-xs font-black uppercase tracking-tighter">{currentUser.username}</span>
            <span className="text-[10px] text-zinc-400 font-bold">{user?.email?.split('@')[0]}</span>
          </div>
          <button 
            onClick={() => handleTabClick('profile')}
            className="w-12 h-12 rounded-full border-2 border-black bg-sky-50 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
             <img src={currentUser.avatar} alt="User" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[110] flex">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.nav 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm bg-white border-r-4 border-black flex flex-col h-full p-8 shadow-[20px_0_0_0_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-400 border-2 border-black rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-black italic tracking-tighter uppercase underline decoration-sky-400">Magical Codex</h2>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 hover:bg-zinc-100 rounded-2xl transition-colors border-2 border-transparent hover:border-black"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl border-4 transition-all font-black uppercase tracking-widest text-sm ${
                      activeTab === tab.id
                        ? `${region === 'taiwan' ? 'bg-yellow-400' : region === 'usa' ? 'bg-sky-400 text-white' : 'bg-purple-600 text-white'} border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -translate-y-1`
                        : 'border-transparent text-zinc-500 hover:bg-zinc-50 hover:border-zinc-200'
                    }`}
                  >
                    <tab.icon className="w-6 h-6" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t-4 border-black">
                <div className="md:hidden grid grid-cols-3 gap-2 mb-6">
                   {['taiwan', 'usa', 'international'].map((r) => (
                      <button
                        key={r}
                        onClick={() => onRegionChange(r)}
                        className={`py-3 rounded-xl border-2 border-black text-[10px] font-black uppercase ${
                          region === r ? 'bg-zinc-900 text-white' : 'bg-zinc-50 text-zinc-500'
                        }`}
                      >
                        {r === 'taiwan' ? 'TW' : r === 'usa' ? 'US' : 'INT'}
                      </button>
                   ))}
                </div>
                <button 
                  onClick={() => logout()}
                  className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 hover:bg-red-100 border-4 border-black rounded-3xl text-red-600 transition-colors font-black uppercase tracking-widest text-xs shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Exit Journey</span>
                </button>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
