/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Post } from '../types';
import PostCard from './PostCard';
import { ShieldCheck, Info, X } from 'lucide-react';
import { useState } from 'react';

interface FeedProps {
  currentUserId: string;
  posts: Post[];
  onDelete: (postId: string) => void;
}

export default function Feed({ currentUserId, posts, onDelete }: FeedProps) {
  const [showSafetyHub, setShowSafetyHub] = useState(true);

  return (
    <div className="flex flex-col items-center">
        {/* Stories bar (Buggy Bubbles) */}
        <div className="w-full max-w-4xl flex gap-8 overflow-x-auto pb-12 scrollbar-hide px-6">
             <div className="flex-shrink-0 flex flex-col items-center gap-4">
               <div className="w-24 h-24 rounded-full border-4 border-black group cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white p-1">
                  <div className="w-full h-full rounded-full border-2 border-black overflow-hidden bg-sky-50">
                     <img src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=user1" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
               </div>
               <span className="text-xs font-black text-black uppercase tracking-widest text-sky-500">YOU</span>
             </div>
        </div>

        <div className="w-full max-w-2xl px-4 md:px-0">
          {/* Safety Hub Notification */}
          <AnimatePresence>
            {showSafetyHub && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 48 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-emerald-50 border-4 border-black rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                  <button 
                    onClick={() => setShowSafetyHub(false)}
                    className="absolute top-6 right-6 p-2 hover:bg-emerald-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-emerald-600" />
                  </button>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white border-2 border-black rounded-xl">
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-tight italic">Safety Hub</h2>
                  </div>
                  <p className="font-bold text-xs text-zinc-600 mb-6 leading-relaxed italic">
                    We're committed to keeping our travel community safe. See something wrong? 
                    Use the <span className="text-red-500 underline font-black">Flag</span> icon on any post to report abuse.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                       <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                       <span className="text-[10px] font-black uppercase text-zinc-400">Moderated Feed</span>
                    </div>
                    <div className="flex items-start gap-2">
                       <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                       <span className="text-[10px] font-black uppercase text-zinc-400">Instant Hide</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                layout
              >
                <PostCard 
                  post={post} 
                  onLike={(id) => console.log('Liked', id)} 
                  onDelete={onDelete}
                  currentUserId={currentUserId} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
       </div>
    </div>
  );
}
