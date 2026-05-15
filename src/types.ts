/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  uid: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  adventures: number;
  badges?: { id: string; name: string; color: string; icon: string }[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  lastMessage?: string;
  status: 'online' | 'offline' | 'battling';
  location?: {
    name: string;
    coordinates?: { x: number; y: number }; // Percentage for the radar view
  };
}

export interface BlogPost {
  id: string;
  authorId: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  date: string;
  readingTime: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  location?: string;
  likes: string[]; // array of user IDs
  comments: Comment[];
  createdAt: number;
  type: 'photo' | 'video' | 'reel';
}
