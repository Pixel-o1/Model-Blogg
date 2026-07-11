import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// Hardcoded data that was previously on the client
const categories = [
  'All',
  'Design',
  'Technology',
  'Engineering',
  'Product',
  'Lifestyle'
];

const posts = [
  {
    id: '1',
    title: 'The Future of Web Development in 2026',
    excerpt: 'Exploring the new paradigms in web development, from server components to AI-driven coding assistants and edge computing.',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    date: 'Jul 10, 2026',
    readTime: '5 min read',
    category: 'Technology',
    author: {
      name: 'Sarah Drasner',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    tags: ['Web', 'Trends', 'AI']
  },
  {
    id: '2',
    title: 'Mastering Minimalist UI Design',
    excerpt: 'Why less is more when it comes to user interfaces, and how to use negative space effectively to guide user attention.',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    date: 'Jul 05, 2026',
    readTime: '4 min read',
    category: 'Design',
    author: {
      name: 'Alex Chen',
      avatar: 'https://i.pravatar.cc/150?u=alex'
    },
    tags: ['UI', 'UX', 'Minimalism']
  },
  {
    id: '3',
    title: 'Scaling Engineering Teams for Startups',
    excerpt: 'Lessons learned from scaling a startup engineering team from 5 to 50 developers while maintaining velocity and culture.',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    date: 'Jun 28, 2026',
    readTime: '8 min read',
    category: 'Engineering',
    author: {
      name: 'Michael Johnson',
      avatar: 'https://i.pravatar.cc/150?u=michael'
    },
    tags: ['Leadership', 'Startups', 'Agile']
  },
  {
    id: '4',
    title: 'Building Products People Actually Want',
    excerpt: 'A deep dive into customer discovery, continuous feedback loops, and building features that solve real problems.',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    date: 'Jun 15, 2026',
    readTime: '6 min read',
    category: 'Product',
    author: {
      name: 'Emily Weiss',
      avatar: 'https://i.pravatar.cc/150?u=emily'
    },
    tags: ['Product Management', 'Strategy']
  },
  {
    id: '5',
    title: 'Remote Work: Finding the Perfect Balance',
    excerpt: 'Strategies for maintaining productivity and mental health while working from home indefinitely.',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
    date: 'Jun 02, 2026',
    readTime: '7 min read',
    category: 'Lifestyle',
    author: {
      name: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?u=david'
    },
    tags: ['Remote', 'Health', 'Productivity']
  },
  {
    id: '6',
    title: 'Advanced React Patterns for Enterprise Apps',
    excerpt: 'Explore advanced composition patterns, custom hooks for complex state, and performance optimization techniques.',
    content: '...',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
    date: 'May 20, 2026',
    readTime: '10 min read',
    category: 'Engineering',
    author: {
      name: 'Sarah Drasner',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    tags: ['React', 'Enterprise', 'Architecture']
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parsing middleware
  app.use(express.json());

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/categories', (req, res) => {
    res.json(categories);
  });

  app.get('/api/posts', (req, res) => {
    res.json(posts);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
