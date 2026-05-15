/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Trash2, Flag, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Post } from '../types';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onDelete?: (postId: string) => void;
  currentUserId: string;
}

export default function PostCard({ post, onLike, onDelete, currentUserId }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUserId));
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [showReportConfirm, setShowReportConfirm] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      setIsLiked(true);
      onLike(post.id);
    }
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleReport = () => {
    // In a real app, this would send an API request
    setIsReported(true);
    setShowReportConfirm(false);
  };

  if (isReported) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto bg-zinc-50 border-4 border-black border-dashed rounded-[2rem] p-8 mb-12 text-center"
      >
        <ShieldAlert className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
        <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-2">Content Reported</h3>
        <p className="text-xs font-bold text-zinc-400">This post has been hidden for your safety. Our team is reviewing the report.</p>
        <button 
          onClick={() => setIsReported(false)}
          className="mt-4 text-[10px] font-black uppercase tracking-widest text-sky-500 hover:underline"
        >
          Undo & View Anyway
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white border-4 border-black rounded-[2rem] overflow-hidden mb-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-black bg-sky-100 overflow-hidden shrink-0">
            <img src={post.userAvatar} alt={post.username} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-base font-black tracking-tight text-black">{post.username}</div>
            {post.location && (
              <div className="text-[10px] text-sky-500 font-black uppercase tracking-wider">
                {post.location}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.userId === currentUserId && onDelete && (
            <button 
              onClick={() => onDelete(post.id)}
              className="text-zinc-300 hover:text-red-500 p-2 transition-colors"
              title="Delete Snapshot"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={() => setShowReportConfirm(!showReportConfirm)}
            className="text-zinc-400 p-2 hover:text-red-500 transition-colors"
            title="Report Abuse"
          >
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Report Confirmation Overlay */}
      <AnimatePresence>
        {showReportConfirm && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-16 right-6 z-20 bg-black text-white p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-48"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Safety Check</span>
              <button onClick={() => setShowReportConfirm(false)}><X className="w-4 h-4" /></button>
            </div>
            <p className="text-[10px] font-bold mb-3 leading-tight">Report this content for violating community guidelines?</p>
            <button 
              onClick={handleReport}
              className="w-full bg-red-500 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors"
            >
              Confirm Report
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media */}
      <div 
        className="relative aspect-square mx-6 mb-6 rounded-2xl border-4 border-black overflow-hidden cursor-pointer"
        onDoubleClick={handleDoubleTap}
      >
        <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
        
        <AnimatePresence>
          {showHeartAnim && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Heart className="w-24 h-24 text-sky-400 fill-sky-400 drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions & Content */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
                <button onClick={handleLike} className="flex items-center group">
                    <Heart 
                    className={`w-8 h-8 transition-all ${
                        isLiked ? 'text-sky-400 fill-sky-400' : 'text-black hover:text-sky-400'
                    } group-active:scale-125`} 
                    />
                </button>
                <button className="text-black hover:text-sky-400 transition-colors">
                    <MessageCircle className="w-8 h-8" />
                </button>
                <button className="text-black hover:text-sky-400 transition-colors">
                    <Send className="w-8 h-8" />
                </button>
            </div>
            <button className="text-black hover:text-sky-400 transition-colors">
                <Bookmark className="w-8 h-8" />
            </button>
        </div>

        <div className="text-sm font-black text-black mb-2">
          {post.likes.length + (isLiked && !post.likes.includes(currentUserId) ? 1 : 0)} likes
        </div>
        <div className="text-base leading-snug font-medium">
          <span className="font-black mr-2 text-black">{post.username}</span>
          <span className="text-zinc-700">{post.caption}</span>
        </div>
        
        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-4 pt-4 border-t-2 border-zinc-50">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
