/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogPost } from '../types';
import { ArrowRight, Clock, PenTool, Trash2, X, ChevronLeft, MapPin, Sparkles } from 'lucide-react';

interface BlogViewProps {
  posts: BlogPost[];
  currentUserId: string;
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
  onAdd: () => void;
  region: string;
}

export default function BlogView({ posts, currentUserId, onEdit, onDelete, onAdd, region }: BlogViewProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-zinc-500 hover:text-black mb-12 transition-colors font-black uppercase tracking-widest text-xs"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Journal
        </button>

        <article className="relative">
          <div className="aspect-[21/9] w-full rounded-[40px] border-4 border-black overflow-hidden mb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-full object-cover" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-1.5 bg-sky-50 border-2 border-sky-100 rounded-full text-[10px] font-black uppercase tracking-widest text-sky-500">
                {selectedPost.category}
              </span>
              <span className="text-zinc-300 font-bold">•</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                {selectedPost.date}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-12 uppercase italic">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-6 mb-12 p-6 bg-zinc-50 border-4 border-black rounded-3xl">
              <div className="w-12 h-12 rounded-full border-2 border-black bg-white overflow-hidden p-1">
                <img src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${selectedPost.authorId}`} alt="Author" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Written By</p>
                <p className="font-black uppercase tracking-tighter">Journalist #{selectedPost.authorId.slice(-4)}</p>
              </div>
              <div className="ml-auto flex items-center gap-2 text-sky-500">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase">{selectedPost.readingTime}</span>
              </div>
            </div>

            <div className="prose prose-zinc prose-invert max-w-none">
              <p className="text-2xl font-bold italic leading-relaxed mb-12 text-zinc-500 border-l-4 border-sky-400 pl-8">
                {selectedPost.excerpt}
              </p>
              <div className="text-lg font-medium leading-relaxed space-y-8 text-zinc-700 whitespace-pre-wrap">
                {selectedPost.content || "No detailed content provided yet... This traveler is still exploring!"}
              </div>
            </div>

            <div className="mt-20 pt-12 border-t-4 border-black flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gryffindor-gold border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Ascension Complete</h3>
              <p className="text-zinc-500 font-bold mb-12">The magic is stored. What next?</p>
              <button 
                onClick={() => setSelectedPost(null)}
                className="spell-button"
              >
                RETURN TO CHAMBERS
              </button>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-20 text-center flex flex-col items-center">
        <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-8 ${region === 'taiwan' ? 'bg-sky-200' : region === 'usa' ? 'bg-gryffindor-red text-white' : 'bg-purple-600 text-white'} border-4 border-black px-12 py-6 rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${region === 'taiwan' ? '-rotate-2' : region === 'usa' ? 'rotate-2' : 'rotate-0'}`}>
          {region === 'taiwan' ? 'Alohomora!' : region === 'usa' ? 'Encounter!' : 'Transit!'}
        </h1>
        <div className={`inline-block px-12 py-4 ${region === 'taiwan' ? 'bg-gryffindor-gold' : region === 'usa' ? 'bg-sky-400' : 'bg-green-400'} border-4 border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-black text-2xl uppercase tracking-widest mb-12 ${region === 'taiwan' ? 'rotate-1' : '-rotate-1'} italic underline [font-family:Arial]`}>
          {region === 'taiwan' ? "Wizards & Trainers" : region === 'usa' ? "Master Quest USA" : "Global Expedition"}
        </div>
        
        <button 
          onClick={onAdd}
          className="spell-button"
        >
          <PenTool className="w-6 h-6" />
          <span>
            {region === 'taiwan' ? 'CAST CHAPTER' : 'INVOKE NEW LOG'}
          </span>
        </button>
      </header>

      <div className="grid gap-20">
        {posts.map((post) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div 
                onClick={() => setSelectedPost(post)}
                className="w-full md:w-1/2 aspect-[4/3] overflow-hidden rounded-[40px] border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 cursor-pointer"
              >
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-sky-500 bg-sky-50 inline-flex px-4 py-1.5 rounded-full border-2 border-sky-100">
                    <span>{post.category}</span>
                  </div>
                  {post.authorId === currentUserId && (
                    <div className="flex gap-2">
                       <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(post);
                        }}
                        className="p-2 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-black"
                      >
                        <PenTool className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(post.id);
                        }}
                        className="p-2 bg-red-50 border-2 border-red-500 rounded-full shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                <h2 
                  onClick={() => setSelectedPost(post)}
                  className="text-4xl md:text-5xl font-black leading-[1.1] mb-6 tracking-tight cursor-pointer hover:text-sky-500 transition-colors"
                >
                  {post.title}
                </h2>
                
                <p className="text-zinc-600 leading-relaxed mb-8 text-lg font-medium">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t-4 border-black">
                  <div className="flex items-center gap-2 text-sm text-zinc-900 font-black uppercase tracking-widest">
                    <Clock className="w-5 h-5 text-sky-400" />
                    {post.readingTime}
                  </div>
                  <button 
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-2 text-black font-black uppercase tracking-widest text-sm group/btn bg-white px-8 py-3 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    GO!
                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

