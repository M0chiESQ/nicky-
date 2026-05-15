/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, UserPlus, Search, MessageSquare, Zap, ChevronLeft, MapPin, Radar, X } from 'lucide-react';
import { Friend, Message } from '../types';
import { MOCK_USER } from '../constants';

const MOCK_FRIENDS: Friend[] = [
  { 
    id: 'user_2', 
    username: 'pkmn_master', 
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Felix', 
    lastMessage: 'Coming to Tainan tomorrow!', 
    status: 'online', 
    location: { name: 'Taipei Main Station', coordinates: { x: 45, y: 30 } }
  },
  { 
    id: 'user_3', 
    username: 'taipei_ghost', 
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Aria', 
    lastMessage: 'That beef noodle place was fire.', 
    status: 'battling',
    location: { name: 'Ximending', coordinates: { x: 40, y: 35 } }
  },
  { 
    id: 'user_4', 
    username: 'misty_blue', 
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Misty', 
    lastMessage: 'Wanna visit Keelung?', 
    status: 'offline',
    location: { name: 'Keelung Harbor', coordinates: { x: 60, y: 15 } }
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  'user_2': [
    { id: '1', senderId: 'user_2', text: 'Yo! You seen the new mural in Ximending?', timestamp: Date.now() - 3600000 },
    { id: '2', senderId: 'user_1', text: 'Not yet, was it near the station?', timestamp: Date.now() - 3000000 },
    { id: '3', senderId: 'user_2', text: 'Yeah, right by exit 6. It\'s massive!', timestamp: Date.now() - 2000000 },
  ]
};

interface MessagesViewProps {
  region: string;
}

export default function MessagesView({ region }: MessagesViewProps) {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'radar'>('chat');

  const handleSendMessage = () => {
    if (!selectedFriend || !newMessage.trim()) return;
    
    const msg: Message = {
      id: Date.now().toString(),
      senderId: 'user_1',
      text: newMessage,
      timestamp: Date.now()
    };

    setMessages({
      ...messages,
      [selectedFriend.id]: [...(messages[selectedFriend.id] || []), msg]
    });
    setNewMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] md:h-[calc(100vh-6rem)] px-4 md:px-6 py-6 font-sans">
      <div className="bg-white border-4 border-black rounded-[40px] h-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex overflow-hidden">
        
        {/* Sidebar */}
        <div className={`w-full md:w-80 border-r-4 border-black flex flex-col ${selectedFriend ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-6 border-b-4 border-black bg-sky-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase underline">
                {region === 'taiwan' ? 'Buddies' : 'Crew'}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsAddingFriend(true)}
                  className="p-2 border-2 border-black rounded-lg bg-zinc-100 hover:bg-zinc-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
                  title="Add Friend"
                >
                  <UserPlus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsAddingFriend(true)} // Reusing the same state for search/discovery
                  className="p-2 border-2 border-black rounded-lg bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
                  title="Find People"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* View Switcher */}
            <div className="flex border-4 border-black rounded-xl overflow-hidden mb-6 bg-white shrink-0">
               <button 
                 onClick={() => setViewMode('chat')}
                 className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${viewMode === 'chat' ? 'bg-black text-white' : 'hover:bg-zinc-100'}`}
               >
                 <MessageSquare className="w-3 h-3" />
                 Comm
               </button>
               <button 
                 onClick={() => setViewMode('radar')}
                 className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border-l-4 border-black ${viewMode === 'radar' ? 'bg-black text-white' : 'hover:bg-zinc-100'}`}
               >
                 <Radar className="w-3 h-3" />
                 Radar
               </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input 
                type="text" 
                placeholder={region === 'taiwan' ? "Search travelers..." : "Search drivers..."}
                className="w-full bg-white border-2 border-black rounded-xl py-2 pl-10 pr-4 text-xs font-black outline-none italic"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {MOCK_FRIENDS.filter(f => f.username.toLowerCase().includes(searchQuery.toLowerCase())).map((friend) => (
              <button
                key={friend.id}
                onClick={() => setSelectedFriend(friend)}
                className={`w-full text-left p-4 rounded-2xl border-2 border-black transition-all group relative ${
                  selectedFriend?.id === friend.id 
                  ? 'bg-yellow-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' 
                  : 'hover:bg-sky-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={friend.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-black bg-white" />
                    <div className={`absolute -right-1 -bottom-1 w-4 h-4 rounded-full border-2 border-black ${
                      friend.status === 'online' ? 'bg-green-500' : friend.status === 'battling' ? 'bg-red-500 animate-pulse' : 'bg-zinc-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-sm uppercase truncate">{friend.username}</div>
                    <div className="text-[10px] text-zinc-500 font-bold truncate italic">{friend.lastMessage}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 flex flex-col bg-zinc-50 ${!selectedFriend && viewMode === 'chat' ? 'hidden md:flex' : 'flex'}`}>
          {viewMode === 'radar' ? (
            <div className="flex-1 relative flex flex-col">
              {/* Radar Header */}
              <div className="p-6 border-b-4 border-black bg-white flex items-center justify-between">
                <div>
                  <h3 className="font-black uppercase italic tracking-tighter text-2xl">Visual Radar</h3>
                  <span className="text-[10px] font-black uppercase text-sky-500">Live Scanning...</span>
                </div>
              </div>

              {/* Radar Grid */}
              <div className="flex-1 relative bg-zinc-100 overflow-hidden pointer-events-none md:pointer-events-auto">
                {/* Background Grid */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 border-b border-r border-black/10">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border-t border-l border-zinc-200" />
                  ))}
                </div>

                {/* Radar Sweeper */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-sky-400/10 via-transparent to-transparent origin-center rounded-full pointer-events-none"
                />

                {/* Friend Markers */}
                {MOCK_FRIENDS.map((friend) => friend.location && (
                  <motion.div
                    key={friend.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute pointer-events-auto"
                    style={{ left: `${friend.location.coordinates?.x}%`, top: `${friend.location.coordinates?.y}%` }}
                  >
                    <div className="group relative -translate-x-1/2 -translate-y-1/2">
                       <div className="w-12 h-12 rounded-full border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center p-1 group-hover:scale-110 transition-transform cursor-pointer">
                         <img src={friend.avatar} alt="" className="w-full h-full rounded-full bg-zinc-100" />
                       </div>
                       <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest z-10">
                         {friend.username} @ {friend.location.name}
                       </div>
                    </div>
                  </motion.div>
                ))}

                {/* User Self Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                  <div className="w-16 h-16 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <span className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase italic tracking-widest">You are here</span>
                </div>
              </div>

              {/* Legend */}
              <div className="p-8 bg-white border-t-4 border-black">
                <div className="flex gap-8 overflow-x-auto pb-4">
                  {MOCK_FRIENDS.map(f => (
                    <div key={f.id} className="flex items-center gap-3 shrink-0">
                      <div className={`w-3 h-3 rounded-full border-2 border-black ${f.status === 'online' ? 'bg-green-500' : f.status === 'battling' ? 'bg-red-500 animate-pulse' : 'bg-zinc-400'}`} />
                      <div>
                        <div className="text-[10px] font-black uppercase">{f.username}</div>
                        <div className="text-[8px] font-bold text-zinc-500 uppercase italic">{f.location?.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : selectedFriend ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b-4 border-black bg-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedFriend(null)} className="md:hidden p-2">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <img src={selectedFriend.avatar} alt="" className="w-12 h-12 rounded-full border-4 border-black" />
                  <div>
                    <h3 className="font-black uppercase italic tracking-tighter">{selectedFriend.username}</h3>
                    <span className="text-[10px] font-black uppercase text-sky-500">{selectedFriend.status === 'battling' ? 'COMMUNING WITH ARCEUS' : selectedFriend.status}</span>
                  </div>
                </div>
                <div className="hidden sm:flex gap-2">
                  <div className="px-4 py-1.5 bg-red-500 border-2 border-black rounded-lg text-[10px] font-black text-white uppercase italic shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Battle Entry #023
                  </div>
                </div>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="text-center">
                  <span className="px-6 py-1 bg-zinc-200 border-2 border-black rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    {region === 'taiwan' ? 'Travel Talk Started' : 'Radio Chatter On'}
                  </span>
                </div>
                
                {(messages[selectedFriend.id] || []).map((msg) => (
                  <div key={msg.id} className={`flex ${msg.senderId === 'user_1' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 border-4 border-black rounded-3xl font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                      msg.senderId === 'user_1' ? 'bg-sky-200 rounded-br-none' : 'bg-white rounded-bl-none'
                    }`}>
                      {msg.text}
                      <div className="mt-2 text-[8px] font-black uppercase opacity-50">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t-4 border-black bg-white">
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    placeholder={region === 'taiwan' ? "Say something..." : "Type a dispatch..."}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-zinc-100 border-4 border-black rounded-2xl px-6 py-3 font-bold outline-none focus:bg-white transition-colors"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-yellow-400 p-4 border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 transition-all"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-50 grayscale">
              <div className="w-32 h-32 bg-sky-100 rounded-full border-4 border-black flex items-center justify-center mb-8">
                <MessageSquare className="w-16 h-16" />
              </div>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">
                {region === 'taiwan' ? 'Select a Buddy' : 'Select a Cabin Mate'}
              </h3>
              <p className="max-w-xs font-bold text-zinc-500">
                {region === 'taiwan' 
                   ? 'Choose a fellow traveler to begin chatting and plan your next Taipei venture.'
                   : 'Choose a crew member to start a dispatch and navigate the states.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Friend / Search Modal */}
      <AnimatePresence>
        {isAddingFriend && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingFriend(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg bg-white border-4 border-black rounded-[40px] p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase underline">
                  {region === 'taiwan' ? 'City Discovery' : 'State Search'}
                </h2>
                <button onClick={() => setIsAddingFriend(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder={region === 'taiwan' ? "Find regional travelers..." : "Search for road trippers..."}
                    className="w-full bg-zinc-50 border-4 border-black rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:bg-white transition-colors"
                  />
                </div>

                <div className="bg-sky-50 border-4 border-black rounded-[32px] p-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-4">RECOMMENDED DISPATCHES</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'taipei_ghost', location: 'Ximending', status: 'online' },
                      { name: 'usa_hustle', location: 'NYC Times Sq', status: 'battling' },
                      { name: 'island_hopper', location: 'Penghu', status: 'online' }
                    ].map(rec => (
                      <div key={rec.name} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center p-1">
                            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${rec.name}`} className="w-full h-full rounded-full" />
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase">{rec.name}</div>
                            <div className="text-[8px] font-bold text-zinc-500 uppercase">{rec.location}</div>
                          </div>
                        </div>
                        <button className="bg-black text-white px-4 py-2 text-[10px] font-black rounded-xl hover:bg-zinc-800 transition-colors">
                          ADD
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
