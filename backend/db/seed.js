const { error } = require("node:console");
const pool = require("./index");

//dammy posts to be seeded to the database.
const posts = [
  {
    title: "Getting Started with TypeScript",
    image: "",
    description:
      "A beginner friendly introduction to TypeScript and why it makes JavaScript development better.",
    details:
      "TypeScript is a superset of JavaScript that adds static typing. In this post we explore the core concepts including types, interfaces, generics, and how TypeScript catches errors before your code even runs. We also look at how to set up a TypeScript project from scratch and integrate it with existing JavaScript codebases.",
    category: "Technology",
  },
  {
    title: "Understanding React Hooks Deep Dive",
    image: "",
    description:
      "A thorough explanation of React Hooks and how they changed the way we write React components.",
    details:
      "Before hooks, stateful logic lived only in class components. Hooks changed everything. We cover useState, useEffect, useContext, useRef, and useMemo — not just how to use them but why they exist and what problems they solve. We also build a custom hook from scratch to understand the pattern deeply.",
    category: "Technology",
  },
  {
    title: "Why Every Developer Should Learn SQL",
    image: "",
    description:
      "SQL is 50 years old and still the most important skill a backend developer can have.",
    details:
      "Developers often reach for ORMs and abstractions without understanding what is happening underneath. This post makes the case for learning raw SQL first — SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY. We walk through real queries against a real database and show how understanding SQL makes you a dramatically better backend developer.",
    category: "Backend",
  },
  {
    title: "Building a REST API with Express from Scratch",
    image: "",
    description:
      "A complete guide to building a production ready REST API using Node.js and Express.",
    details:
      "We start from zero — initialising the project, setting up middleware, creating routes, controllers, and connecting to a PostgreSQL database. We cover authentication with JWT, password hashing with bcrypt, protected routes, environment variables, and proper error handling. By the end you have a fully working API ready for a real frontend.",
    category: "Backend",
  },
  {
    title: "CSS Grid vs Flexbox — When to Use Which",
    image: "",
    description:
      "A practical breakdown of the difference between CSS Grid and Flexbox with real world examples.",
    details:
      "Both Grid and Flexbox are layout tools but they solve different problems. Flexbox is one dimensional — it works along a single axis. Grid is two dimensional — it controls both rows and columns simultaneously. This post breaks down exactly when to reach for each one, with practical examples covering navigation bars, card grids, page layouts, and form designs.",
    category: "Design",
  },
  {
    title: "The Feynman Technique for Learning Programming",
    image: "",
    description:
      "How explaining things simply is the fastest way to expose gaps in your understanding.",
    details:
      "Richard Feynman was a Nobel Prize winning physicist who believed that if you cannot explain something simply, you do not understand it well enough. Applied to programming this means — after learning a concept, close the documentation and explain it out loud as if teaching a complete beginner. Where you stumble is exactly where your understanding has a gap. This post shows how to apply this technique systematically when learning new technologies.",
    category: "Learning",
  },
  {
    title: "How the Internet Actually Works",
    image: "",
    description:
      "From typing a URL to seeing a webpage — what actually happens in between.",
    details:
      "Most developers use the internet every day without understanding what happens under the hood. This post walks through the full journey — DNS resolution, TCP handshake, HTTP request and response, TLS encryption, how servers process requests, and how browsers render HTML. Understanding this makes you dramatically better at debugging network issues and designing backend systems.",
    category: "Technology",
  },
  {
    title: "Writing Clean Code That Other Developers Will Love",
    image: "",
    description:
      "Practical principles for writing code that is readable, maintainable, and easy to debug.",
    details:
      "Clean code is not about clever tricks — it is about communication. Your code will be read far more times than it is written. This post covers naming variables and functions clearly, keeping functions small and focused on one job, avoiding deep nesting, writing useful comments, and structuring files so other developers can navigate your codebase without a map.",
    category: "Learning",
  },
];

const seed = async function () {
  try {
    for (const post of posts) {
      console.log(post);
      await pool.query(
        `INSERT INTO posts (title, image, description, details, category) VALUES($1,$2,$3,$4,$5)`,
        [post.title, post.image, post.description, post.details, post.category],
      );
      console.log("posts seeded successfully");
    }
  } catch (error) {
    console.log("failed to seed posts!", error);
  } finally {
    await pool.end();
  }
};

seed();
