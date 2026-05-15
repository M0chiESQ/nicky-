/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import BlogView from './components/BlogView';
import Feed from './components/Feed';
import Profile from './components/Profile';
import GuideView from './components/GuideView';
import DestinationsView from './components/DestinationsView';
import USADestinationsView from './components/USADestinationsView';
import MessagesView from './components/MessagesView';
import PackingView from './components/PackingView';
import NavigationView from './components/NavigationView';
import GlobalDestinationsView from './components/GlobalDestinationsView';
import LoginView from './components/LoginView';
import { useAuth } from './hooks/useAuth';
import { db, handleFirestoreError, OperationType } from './lib/firebase';
import { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  serverTimestamp, 
  orderBy 
} from 'firebase/firestore';
import { Settings, PenTool, Layout, Eye, Save, X, ChevronLeft, Camera } from 'lucide-react';
import { BlogPost, Post, User } from './types';

export default function App() {
  const { user: authUser, profile: currentUser, loading } = useAuth();

  const EMPTY_BLOG_POST: BlogPost = {
    id: '',
    authorId: currentUser?.id || '',
    title: '',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200',
    category: 'Exploration',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readingTime: '5 min read'
  };
  const [activeTab, setActiveTab] = useState('home');
  const [region, setRegion] = useState('taiwan');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [snapshots, setSnapshots] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingBlogPost, setIsCreatingBlogPost] = useState(false);
  const [draftBlogPost, setDraftBlogPost] = useState<BlogPost>(EMPTY_BLOG_POST);
  const [isCreatingSnapshot, setIsCreatingSnapshot] = useState(false);

  const [newSnapshotData, setNewSnapshotData] = useState({
    imageUrl: 'https://images.unsplash.com/photo-1546750248-adc1d428385d?w=800',
    caption: '',
    location: ''
  });

  // Sync Blog Posts
  useEffect(() => {
    const q = query(collection(db, 'blog_posts'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      setPosts(fetchedPosts);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'blog_posts'));

    return () => unsubscribe();
  }, []);

  // Sync Snapshots
  useEffect(() => {
    const q = query(collection(db, 'snapshots'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSnapshots = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setSnapshots(fetchedSnapshots);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'snapshots'));

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async (updatedUser: User) => {
    if (!authUser) return;
    try {
      const userDocRef = doc(db, 'users', authUser.uid);
      await updateDoc(userDocRef, { ...updatedUser, updatedAt: serverTimestamp() });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${authUser.uid}`);
    }
  };

  const handleSave = async (updatedPost: BlogPost) => {
    if (!currentUser) return;
    try {
      if (isCreatingBlogPost) {
        await addDoc(collection(db, 'blog_posts'), {
          ...updatedPost,
          authorId: currentUser.id,
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        });
        setIsCreatingBlogPost(false);
      } else {
        const postRef = doc(db, 'blog_posts', updatedPost.id);
        const { id, ...postData } = updatedPost;
        await updateDoc(postRef, postData);
      }
      setEditingPost(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'blog_posts');
    }
  };

  const handleDeleteSnapshot = async (postId: string) => {
    if (confirm('Delete this snapshot forever?')) {
      try {
        await deleteDoc(doc(db, 'snapshots', postId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `snapshots/${postId}`);
      }
    }
  };

  const handleCreateSnapshot = async () => {
    if (!currentUser) return;
    try {
      const newPost: Omit<Post, 'id'> = {
        userId: currentUser.id,
        username: currentUser.username,
        userAvatar: currentUser.avatar,
        imageUrl: newSnapshotData.imageUrl,
        caption: newSnapshotData.caption,
        location: newSnapshotData.location,
        likes: [],
        comments: [],
        createdAt: Date.now(),
        type: 'photo'
      };
      await addDoc(collection(db, 'snapshots'), newPost);
      setIsCreatingSnapshot(false);
      setNewSnapshotData({ imageUrl: 'https://images.unsplash.com/photo-1546750248-adc1d428385d?w=800', caption: '', location: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'snapshots');
    }
  };

  const handleDeleteBlog = async (postId: string) => {
    if (confirm('Delete this chapter from your journal?')) {
      try {
        await deleteDoc(doc(db, 'blog_posts', postId));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `blog_posts/${postId}`);
      }
    }
  };

  const renderContent = () => {
    if (isCreatingSnapshot) {
      return (
        <div className="p-8 max-w-xl mx-auto">
          <button onClick={() => setIsCreatingSnapshot(false)} className="flex items-center gap-2 text-zinc-500 mb-8 font-bold"><ChevronLeft className="w-5 h-5" /> Back</button>
          <div className="bg-white border-4 border-black rounded-[40px] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black mb-8">NEW SNAPSHOT</h2>
            <div className="space-y-6">
              <div className="relative group mb-8">
                <div className="aspect-square rounded-3xl border-4 border-black overflow-hidden mb-4 bg-sky-50 flex items-center justify-center relative">
                   <img src={newSnapshotData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                   <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <div className="bg-white px-6 py-2 rounded-full border-2 border-black font-black text-xs uppercase tracking-widest flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Change Snapshot
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setNewSnapshotData({ ...newSnapshotData, imageUrl: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                   </label>
                </div>
              </div>
              <div className="space-y-6">
                <input 
                  type="text" 
                  placeholder="Snapshot URL (optional)" 
                  className="w-full bg-zinc-100 border-2 border-black rounded-xl p-3 text-[10px] font-bold outline-none focus:bg-white transition-colors"
                  value={newSnapshotData.imageUrl}
                  onChange={(e) => setNewSnapshotData({...newSnapshotData, imageUrl: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Caption..." 
                  className="w-full bg-sky-50 border-2 border-black rounded-2xl p-4 font-bold outline-none"
                  value={newSnapshotData.caption}
                  onChange={(e) => setNewSnapshotData({...newSnapshotData, caption: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Location (optional)" 
                  className="w-full bg-sky-50 border-2 border-black rounded-2xl p-4 font-bold outline-none"
                  value={newSnapshotData.location}
                  onChange={(e) => setNewSnapshotData({...newSnapshotData, location: e.target.value})}
                />
                <button 
                  onClick={handleCreateSnapshot}
                  className="w-full spell-button"
                >
                  Post Spell Snapshot
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (editingPost || isCreatingBlogPost) {
      const targetPost = editingPost || draftBlogPost;
      const setTarget = (val: BlogPost) => editingPost ? setEditingPost(val) : setDraftBlogPost(val);

      return (
        <div className="p-8 max-w-4xl mx-auto">
          <button 
            onClick={() => { setEditingPost(null); setIsCreatingBlogPost(false); setDraftBlogPost(EMPTY_BLOG_POST); }}
            className="flex items-center gap-2 text-zinc-500 hover:text-black mb-8 transition-colors font-bold"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Studio
          </button>
          
          <div className="space-y-8">
            <header className="flex justify-between items-center">
              <h2 className="text-3xl font-black italic tracking-tighter">{isCreatingBlogPost ? 'NEW PARCHMENT' : 'EDITING CODEX'}</h2>
              <button 
                onClick={() => handleSave(targetPost)}
                className="spell-button !px-6 !py-2 !text-xs"
              >
                <Save className="w-4 h-4" />
                {isCreatingBlogPost ? 'Publish Spell' : 'Save Glyphs'}
              </button>
            </header>

            <div className="space-y-12">
              <div className="bg-white border-4 border-black rounded-[40px] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-sky-500 mb-4">Cover Image</label>
                    <div className="relative group mb-8">
                      <div className="aspect-[21/9] w-full rounded-[30px] border-4 border-black overflow-hidden bg-sky-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative">
                        {targetPost.coverImage ? (
                          <img src={targetPost.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-12 h-12 text-zinc-300" />
                        )}
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <div className="bg-white px-6 py-2 rounded-full border-2 border-black font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            <Camera className="w-4 h-4" />
                            {targetPost.coverImage ? 'Change Photo' : 'Upload Photo'}
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setTarget({ ...targetPost, coverImage: reader.result as string });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Or Paste URL</label>
                        <input 
                          type="text"
                          value={targetPost.coverImage}
                          onChange={(e) => setTarget({ ...targetPost, coverImage: e.target.value })}
                          className="w-full bg-zinc-100 border-2 border-black rounded-xl p-3 text-[10px] font-bold outline-none focus:bg-white transition-colors"
                          placeholder="https://images.unsplash.com/..."
                        />
                      </div>
                    </div>

                    <label className="block text-[10px] font-black uppercase tracking-widest text-sky-500 mb-4">Title</label>
                    <input 
                      type="text"
                      value={targetPost.title}
                      onChange={(e) => setTarget({ ...targetPost, title: e.target.value })}
                      className="w-full bg-sky-50 border-2 border-black rounded-2xl p-6 text-2xl font-black focus:bg-white transition-colors outline-none"
                      placeholder="The name of your adventure..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-sky-500 mb-4">Excerpt</label>
                    <textarea 
                      value={targetPost.excerpt}
                      onChange={(e) => setTarget({ ...targetPost, excerpt: e.target.value })}
                      className="w-full bg-sky-50 border-2 border-black rounded-2xl p-6 text-base font-medium text-zinc-600 focus:bg-white transition-colors outline-none h-24 resize-none leading-relaxed"
                      placeholder="A short hook for your readers..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-sky-500 mb-4">Story Content</label>
                    <textarea 
                      value={targetPost.content}
                      onChange={(e) => setTarget({ ...targetPost, content: e.target.value })}
                      className="w-full bg-sky-50 border-2 border-black rounded-2xl p-8 text-zinc-800 font-medium focus:bg-white transition-colors outline-none h-80 resize-none leading-relaxed"
                      placeholder="Tell the full story..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <BlogView posts={posts} currentUserId={currentUser.id} onEdit={setEditingPost} onDelete={handleDeleteBlog} onAdd={() => setIsCreatingBlogPost(true)} region={region} />;
      case 'snapshots':
        return (
          <div className="pt-8">
            <header className="px-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] text-sky-500 mb-2">
                  {region === 'taiwan' ? 'Live Encounters' : 'Roadside Views'}
                </h2>
                <p className="text-zinc-400 font-medium italic">
                  {region === 'taiwan' ? 'Spontaneous street captures.' : 'Snapshots from the open road.'}
                </p>
              </div>
              <button 
                onClick={() => setIsCreatingSnapshot(true)}
                className="pokemon-button bg-yellow-400"
              >
                <Camera className="w-6 h-6 text-black" />
                {region === 'taiwan' ? 'CAPTURE NOW!' : 'SHOOT IT!'}
              </button>
            </header>
            <Feed 
              currentUserId={currentUser.id} 
              posts={snapshots} 
              onDelete={handleDeleteSnapshot} 
            />
          </div>
        );
      case 'studio':
        return (
          <div className="p-8 max-w-5xl mx-auto">
            <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
              <div>
                <h1 className="text-5xl font-black tracking-tighter text-black mb-2">
                  {region === 'taiwan' ? 'WIZARD WORKSHOP' : 'TRAINER LAB'}
                </h1>
                <p className="text-sky-500 font-bold uppercase tracking-widest text-[10px]">
                  {region === 'taiwan' ? 'CRAFT MAGIC & CURATE' : 'TECH & TOOLS'}
                </p>
              </div>
              <button 
                onClick={() => setIsCreatingBlogPost(true)}
                className="spell-button"
              >
                <PenTool className="w-5 h-5" />
                {region === 'taiwan' ? 'New Spell' : 'New Gear'}
              </button>
            </header>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
               <div className="bg-white border-4 border-black rounded-[40px] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-red-100 rounded-full border-4 border-black flex items-center justify-center mb-8 group-hover:bg-red-200 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Layout className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">
                    {region === 'taiwan' ? 'MARAUDER MAP' : 'ROUTE INDIGO'}
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium">
                    {region === 'taiwan' ? 'Find hidden passages across Taipei.' : 'Navigate the elite four path.'}
                  </p>
               </div>
               <div className="bg-white border-4 border-black rounded-[40px] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full border-4 border-black flex items-center justify-center mb-8 group-hover:bg-yellow-200 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Eye className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">
                    {region === 'taiwan' ? 'ENCYCLOPEDIA' : 'POKÉDEX'}
                  </h3>
                  <p className="text-sm text-zinc-500 font-medium">
                    {region === 'taiwan' ? 'Archives of all spells & encounters.' : 'Data on every roadside beast.'}
                  </p>
               </div>
            </div>

            <div>
               <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 border-b-2 border-zinc-100 pb-4">Published stories</h4>
               <div className="grid gap-6">
                  {posts.map(post => (
                    <div 
                      key={post.id} 
                      className="flex items-center justify-between p-6 bg-white border-4 border-black rounded-[30px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 hover:translate-x-1 hover:translate-y-1 transition-all group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="w-24 h-16 bg-sky-50 rounded-2xl border-2 border-black overflow-hidden shrink-0">
                          <img src={post.coverImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                        </div>
                        <div>
                          <p className="font-black text-xl mb-1">{post.title}</p>
                          <div className="flex items-center gap-3 text-[10px] text-sky-400 uppercase tracking-widest font-black">
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setEditingPost(post)}
                        className="p-4 bg-sky-50 border-2 border-black rounded-2xl text-black hover:bg-sky-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-y-1"
                      >
                        <PenTool className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'profile':
        return <Profile user={currentUser} snapshots={snapshots} region={region} onUpdate={handleUpdateProfile} />;
      case 'guide':
        return <GuideView region={region} />;
      case 'destinations':
        return region === 'taiwan' ? <DestinationsView /> : region === 'usa' ? <USADestinationsView /> : <GlobalDestinationsView />;
      case 'messages':
        return <MessagesView region={region} currentUser={currentUser} />;
      case 'navigation':
        return <NavigationView region={region} />;
      case 'packing':
        return <PackingView region={region} />;
      default:
        return <BlogView posts={posts} currentUserId={currentUser.id} onEdit={setEditingPost} onDelete={handleDeleteBlog} onAdd={() => setIsCreatingBlogPost(true)} region={region} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-black border-t-sky-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authUser) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-sky-50 text-zinc-900 selection:bg-sky-200">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        region={region}
        onRegionChange={setRegion}
        currentUser={currentUser}
      />
      
      <main className="pb-24 pt-24 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

