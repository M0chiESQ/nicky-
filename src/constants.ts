/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Post, User, BlogPost } from './types';

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog_1',
    authorId: 'user_1',
    title: 'The Rain in Taipei: Finding Solace in Tea Houses',
    excerpt: 'When the monsoon hits, the city transforms. Here are my favorite spots to watch the rain with a warm cup of Oolong.',
    content: 'Taipei rain has a rhythm of its own. It washes the neon clean and makes the alleys whisper. I found myself in Wistaria Tea House today...',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=600&fit=crop',
    category: 'Lifestyle',
    date: 'April 28, 2026',
    readingTime: '5 min read'
  },
  {
    id: 'blog_2',
    authorId: 'user_1',
    title: 'Neon & Concrete: A Midnight Walk through Zhongshan',
    excerpt: 'Exploring the industrial beauty of Taipei after hours. The shadows and light play a different game when the crowds are gone.',
    content: 'Zhongshan District at 2 AM is a living film set. The blue light of convenience stores against the dark concrete...',
    coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&h=600&fit=crop',
    category: 'Exploration',
    date: 'April 25, 2026',
    readingTime: '8 min read'
  }
];

export const MOCK_USER: User = {
  id: 'user_1',
  name: 'Leo Chen',
  username: 'taipei_explorer',
  avatar: 'https://images.dicebear.com/api/fun-emoji/leo.svg',
  bio: 'Chasing the best beef noodles and hidden Portkeys in Taipei. 🏙️🪄',
  followers: 1250,
  following: 430,
  adventures: 15,
  badges: [
    { id: '1', name: 'Gryffindor Fire', color: 'bg-gryffindor-red text-gryffindor-gold', icon: '🦁' },
    { id: '2', name: 'Cascade Badge', color: 'bg-sky-400', icon: '💧' },
    { id: '3', name: 'Slytherin Serpentine', color: 'bg-slytherin-green text-slytherin-silver', icon: '🐍' },
    { id: '4', name: 'Thunder Badge', color: 'bg-yellow-400', icon: '⚡' },
  ]
};

export const MOCK_POSTS: Post[] = [
  {
    id: 'post_1',
    userId: 'user_2',
    username: 'city_lights',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&h=1000&fit=crop',
    caption: 'Neon nights at Ximending. The energy here never fades! #Taipei #Ximending',
    location: 'Ximending, Taipei',
    likes: ['user_1', 'user_3'],
    comments: [
      {
        id: 'c_1',
        userId: 'user_1',
        username: 'taipei_explorer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
        text: 'Best spot for street food!',
        createdAt: Date.now() - 3600000
      }
    ],
    createdAt: Date.now() - 86400000,
    type: 'photo'
  },
  {
    id: 'post_2',
    userId: 'user_3',
    username: 'mountain_man',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1552912858-23e08a0d9eb9?w=800&h=1000&fit=crop',
    caption: 'Sunrise hike at Elephant Mountain. Taipei 101 looking majestic as always. 🐘⛰️',
    location: 'Xiangshan (Elephant Mountain)',
    likes: ['user_1', 'user_2', 'user_4'],
    comments: [],
    createdAt: Date.now() - 172800000,
    type: 'photo'
  },
  {
    id: 'post_3',
    userId: 'user_1',
    username: 'taipei_explorer',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    imageUrl: 'https://images.unsplash.com/photo-1511210608248-18c76063533c?w=800&h=1000&fit=crop',
    caption: 'Found the most amazing hidden coffee shop in Fujin Street. ☕✨ #TaipeiCafes #FujinStreet',
    location: 'Fujin Street, Taipei',
    likes: ['user_2'],
    comments: [],
    createdAt: Date.now() - 43200000,
    type: 'photo'
  }
];
