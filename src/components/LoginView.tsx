/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { LogIn, Compass, MapPin, Zap } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';

export default function LoginView() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-6 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:20px_20px]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white border-4 border-black rounded-[40px] p-12 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden"
      >
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 border-r-4 border-b-4 border-black -translate-x-12 -translate-y-12 rotate-12" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-500 border-l-4 border-t-4 border-black translate-x-12 translate-y-12 -rotate-12" />

        <div className="relative z-10">
          <div className="w-24 h-24 bg-sky-100 rounded-full border-4 border-black flex items-center justify-center mx-auto mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Compass className="w-12 h-12 text-blue-500 animate-[spin_10s_linear_infinite]" />
          </div>

          <h1 className="text-4xl font-black tracking-tighter mb-4 italic uppercase">
            Buggy's <span className="text-red-500">Travels</span>
          </h1>
          <p className="text-zinc-500 font-bold mb-12 italic">Sign in to start your adventure across Taipei and the USA.</p>

          <div className="space-y-4 text-center">
            <button 
              onClick={handleGoogleLogin}
              className="w-full pokemon-button bg-white text-black py-4 flex items-center justify-center gap-4 group"
            >
              <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center border-2 border-black group-hover:bg-yellow-400 transition-colors">
                 <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-black uppercase tracking-widest text-sm">Sign in with Google</span>
            </button>
            <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest pt-4">
              Level up your exploration
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <div className="p-3 border-2 border-black rounded-xl bg-sky-50">
               <MapPin className="w-5 h-5" />
            </div>
            <div className="p-3 border-2 border-black rounded-xl bg-red-50">
               <LogIn className="w-5 h-5" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
