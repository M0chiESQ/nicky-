/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Grid, Settings, Bookmark, User as UserIcon, Heart, X, Camera, Save, Upload } from 'lucide-react';
import { Post, User } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileProps {
  user: User;
  snapshots: Post[];
  region: string;
  onUpdate: (user: User) => Promise<void>;
}

export default function Profile({ user, snapshots, region, onUpdate }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editForm, setEditForm] = useState({
    username: user.username,
    avatar: user.avatar,
    name: user.name,
    bio: user.bio || ''
  });

  useEffect(() => {
    setEditForm({
      username: user.username,
      avatar: user.avatar,
      name: user.name,
      bio: user.bio || ''
    });
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit for Base64 storage in Firestore
        alert('File is too large! Please choose an image under 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg(null);
    try {
      const updatedUser = {
        ...user,
        username: editForm.username,
        avatar: editForm.avatar,
        name: editForm.name,
        bio: editForm.bio
      };
      await onUpdate(updatedUser);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      setErrorMsg('Magic spell failed! Check your connection and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header Card */}
      <div className="bg-white border-4 border-black rounded-[40px] p-8 md:p-12 mb-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 ${region === 'taiwan' ? 'bg-yellow-400' : region === 'usa' ? 'bg-red-500' : 'bg-purple-600'} border-l-4 border-b-4 border-black -translate-y-4 translate-x-4 rotate-12`} />
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 relative z-10">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-black overflow-hidden bg-sky-100 p-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative group">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                <button 
                  onClick={() => setIsEditing(true)}
                  className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-8 h-8" />
                </button>
                <div className="absolute inset-x-0 bottom-0 py-1 bg-black text-white text-[8px] font-black uppercase text-center">
                    {region === 'taiwan' ? 'MASTER WIZARD' : region === 'usa' ? 'ELITE TRAINER' : 'AUROR LEVEL 99'}
                </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                    <h2 className="text-4xl font-black tracking-tight uppercase">{user.username}</h2>
                    <div className="flex gap-3 justify-center md:justify-start">
                    <button className="pokemon-button bg-red-500 text-white !py-2 !px-6 !text-xs">
                        {region === 'taiwan' ? 'DUEL' : region === 'usa' ? 'BATTLE' : 'INVOKE'}
                    </button>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-3 bg-white border-4 border-black text-black rounded-2xl hover:bg-sky-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1"
                    >
                        <Settings className="w-6 h-6" />
                    </button>
                    </div>
                </div>

                <div className="flex justify-center md:justify-start gap-12 mb-8">
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-3xl font-black">{snapshots.filter(s => s.userId === user.id).length}</span>
                        <span className="text-sky-500 font-black text-[10px] uppercase tracking-[0.2em]">
                            {region === 'taiwan' ? 'Spells' : region === 'usa' ? 'Badges' : 'Quests'}
                        </span>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-3xl font-black">{user.followers}</span>
                        <span className="text-sky-500 font-black text-[10px] uppercase tracking-[0.2em]">
                            {region === 'taiwan' ? 'Fellows' : region === 'usa' ? 'Trainers' : 'House'}
                        </span>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <span className="text-3xl font-black">{user.following}</span>
                        <span className="text-sky-500 font-black text-[10px] uppercase tracking-[0.2em]">
                            {region === 'taiwan' ? 'Rivals' : region === 'usa' ? 'Scouts' : 'Legion'}
                        </span>
                    </div>
                </div>

                {/* Badge Case */}
                <div className="bg-zinc-50 border-4 border-black rounded-3xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">
                      {region === 'taiwan' ? 'Gym & House Badges' : region === 'usa' ? 'League Seals' : 'Magical Artifacts'}
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {user.badges?.map(badge => (
                            <div key={badge.id} className="group relative">
                                <div className={`w-12 h-12 ${badge.color} border-4 border-black rounded-xl flex items-center justify-center text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-transform cursor-help`}>
                                    {badge.icon}
                                </div>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-[8px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                    {badge.name.toUpperCase()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-md">
                    <div className="font-black text-lg mb-2">{user.name}</div>
                    <div className="text-zinc-600 font-medium leading-relaxed">{user.bio}</div>
                </div>
            </div>
        </div>
      </div>

      {/* Tabs / Content Section */}
      <div className="flex justify-center gap-12 mb-12">
        <button className="flex items-center gap-2 py-4 border-b-4 border-black text-xs font-black uppercase tracking-[0.2em]">
          <Grid className="w-4 h-4 text-sky-400" />
          Archives
        </button>
        <button className="flex items-center gap-2 py-4 text-zinc-400 hover:text-black text-xs font-black uppercase tracking-[0.2em] transition-colors">
          <Bookmark className="w-4 h-4" />
          Bookmarks
        </button>
      </div>

      {/* Grid of adventures */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {snapshots.filter(s => s.userId === user.id).map((post) => (
          <div key={post.id} className="group relative">
            <div className="aspect-square bg-white border-4 border-black rounded-[2.5rem] overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full border-2 border-black flex items-center justify-center">
                        <Heart className="w-6 h-6 text-sky-400 fill-sky-400" />
                    </div>
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-sky-500">{post.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white border-4 border-black rounded-[40px] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[85vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-8 pb-4 shrink-0 bg-white border-b-2 border-black/5">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase underline">Update Identity</h2>
                <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 pt-4 custom-scrollbar">
                <div className="space-y-6 pb-4">
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-32 h-32 rounded-full border-4 border-black overflow-hidden bg-sky-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
                          <img src={editForm.avatar} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Upload className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 border-2 border-black p-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <Camera className="w-4 h-4" />
                        </div>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange}
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 text-[10px] font-black uppercase tracking-widest text-sky-500 hover:underline"
                    >
                        Upload New Image
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-sky-500 mb-2">Trainer Handle</label>
                        <input 
                          type="text" 
                          value={editForm.username}
                          onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                          className="w-full bg-zinc-50 border-4 border-black rounded-2xl p-4 font-bold outline-none focus:bg-white"
                          placeholder="username"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-sky-500 mb-2">Display Name</label>
                        <input 
                          type="text" 
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full bg-zinc-50 border-4 border-black rounded-2xl p-4 font-bold outline-none focus:bg-white"
                          placeholder="Your Name"
                        />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-sky-500 mb-2">Avatar URL</label>
                    <input 
                      type="text" 
                      value={editForm.avatar}
                      onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                      className="w-full bg-zinc-50 border-4 border-black rounded-2xl p-4 font-bold outline-none focus:bg-white"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-sky-500 mb-2">Short Bio</label>
                    <textarea 
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      className="w-full bg-zinc-50 border-4 border-black rounded-2xl p-4 font-bold outline-none focus:bg-white h-24 resize-none"
                      placeholder="What's your story?"
                    />
                  </div>

                  {errorMsg && (
                    <div className="bg-red-50 border-2 border-red-500 p-4 rounded-2xl text-xs font-bold text-red-600">
                      {errorMsg}
                    </div>
                  )}

                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full pokemon-button bg-black text-white py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Save className="w-5 h-5 text-yellow-400" />
                    )}
                    {isSaving ? 'CASTING SPELL...' : 'CONFIRM UPDATES'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
