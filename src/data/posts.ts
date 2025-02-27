export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: 'The Revival of Retro UI',
    excerpt: 'Remember the good old days of Windows 95 and classic interfaces?',
    content: 'Remember the good old days of Windows 95 and classic interfaces? The minimalist, functional design of those times is making a comeback. More and more websites and applications are embracing the nostalgic charm of retro UIs, combining vintage aesthetics with modern functionality. This trend isn\'t just about nostalgia - it\'s also about simplicity, clarity, and usability principles that were established decades ago but remain relevant today.',
    date: '1984-01-15'
  },
  {
    id: 2,
    title: 'Mastering CSS Grid',
    excerpt: 'CSS Grid has revolutionized the way we create layouts on the web.',
    content: 'CSS Grid has revolutionized the way we create layouts on the web. In this post, we explore the fundamental concepts and advanced techniques that make Grid such a powerful tool for web designers and developers. From basic grid templates to complex responsive designs, CSS Grid offers unprecedented control over two-dimensional layouts. We\'ll walk through practical examples and show how Grid can solve layout challenges that were once incredibly difficult.',
    date: '1984-02-20'
  },
  {
    id: 3,
    title: 'JavaScript: Then and Now',
    excerpt: 'From simple form validation to complex web applications.',
    content: 'From simple form validation to complex web applications, JavaScript has come a long way. Let\'s explore its evolution from a simple scripting language to the backbone of modern web development. We\'ll look at how JavaScript has grown from its humble beginnings to power everything from single-page applications to server-side platforms, mobile apps, desktop software, and even IoT devices. The journey of JavaScript is a fascinating story of adaptation, community innovation, and constant reinvention.',
    date: '1984-03-10'
  }
];
