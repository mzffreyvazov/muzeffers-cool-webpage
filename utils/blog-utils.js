// This would typically connect to your CMS or database
// For now, we'll use hardcoded sample data

const blogPosts = [
  {
    title: 'Getting Started with React',
    slug: 'getting-started-with-react',
    date: 'January 15, 2023',
    excerpt: 'Learn the basics of React and build your first component.',
    coverImage: '/images/blog/react-cover.jpg',
    content: `
      <p>React is a popular JavaScript library for building user interfaces, particularly single-page applications.</p>
      <h2>Why React?</h2>
      <p>React allows developers to create large web applications that can change data without reloading the page.</p>
      <p>The main concept of React is the Virtual DOM which is a lightweight representation of the real DOM in memory.</p>
      <h2>Setting Up</h2>
      <p>To get started with React, you need to set up a new project:</p>
      <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
      <p>This creates a new React application and starts the development server.</p>
    `
  },
  {
    title: 'Styling in Modern Web Development',
    slug: 'styling-in-modern-web-development',
    date: 'February 3, 2023',
    excerpt: 'Explore different approaches to styling your web applications.',
    coverImage: '/images/blog/styling-cover.jpg',
    content: `
      <p>Styling in modern web development has evolved significantly over the years.</p>
      <h2>CSS Modules</h2>
      <p>CSS Modules allow you to write CSS that is scoped locally by default.</p>
      <h2>Styled Components</h2>
      <p>Styled Components let you use actual CSS syntax inside your components.</p>
      <h2>Tailwind CSS</h2>
      <p>Tailwind is a utility-first CSS framework that provides low-level utility classes to build designs directly in your markup.</p>
    `
  },
  {
    title: 'Working with APIs in JavaScript',
    slug: 'working-with-apis-in-javascript',
    date: 'March 22, 2023',
    excerpt: 'Learn how to fetch and manage data from external APIs.',
    coverImage: '/images/blog/api-cover.jpg',
    content: `
      <p>Working with external APIs is a common task in web development.</p>
      <h2>Using Fetch</h2>
      <p>The Fetch API provides a JavaScript interface for accessing and manipulating HTTP requests and responses.</p>
      <pre><code>fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));</code></pre>
      <h2>Using Axios</h2>
      <p>Axios is a popular library that makes it easier to send asynchronous HTTP requests to REST endpoints.</p>
    `
  },
  {
    title: 'The Revival of Retro UI',
    slug: 'the-revival-of-retro-ui',
    date: 'April 10, 2023',
    excerpt: 'Exploring how retro design elements are making a comeback in modern interfaces.',
    coverImage: '/images/blog/retro-ui-cover.jpg',
    content: `
      <p>Nostalgic design trends from the 80s and 90s are seeing a significant resurgence in today's digital interfaces.</p>
      <h2>What's Driving the Trend?</h2>
      <p>The appeal of retro design aesthetics comes from both nostalgia and a desire for more distinctive, playful interfaces after years of minimal flat design.</p>
      <h2>Key Retro Elements</h2>
      <p>Designers are incorporating bold colors, pixel art, chunky elements, and deliberately "imperfect" layouts to create character and visual interest.</p>
      <h2>Implementation Tips</h2>
      <p>The key to successful retro design is balancing nostalgic elements with modern usability standards to create interfaces that are both fun and functional.</p>
    `
  }
];

export function getBlogPosts() {
  return blogPosts;
}

export function getBlogPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}
