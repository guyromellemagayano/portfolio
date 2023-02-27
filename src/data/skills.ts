import { ISkillsData } from '@/interfaces/data'

const SkillsData = (): ISkillsData => {
  const meta = {
    title: 'Skills - Guy Romelle Magayano',
    description: 'I love web and currently focusing on being better at quite a few things.',
    keywords: 'guy romelle magayano, full stack developer, davao, philippines, frontend, backend, version control',
  }

  const hero = {
    heading: 'I love web and currently focusing on being better at quite a few things.',
    description: [
      'I have a wide range of skills and experiences in building web applications and websites from frontend to backend development. Here is a complete list of some of the technologies I have worked with and some of the projects I have worked on since.',
    ],
  }

  const skills = [
    {
      name: 'Frontend Development',
      items: [
        {
          title: 'HTML and CSS',
          skillLevel: 5,
          description: [
            'HTML, which stands for Hyper Text Markup Language, is the standard markup language for creating web pages and web applications.',
            'CSS, which stands for Cascading Style Sheets, is a style sheet language used for describing the presentation of a document written in a markup language like HTML',
            'Both, along with JavaScript, are the blocks of the Web and are the foundations of any website and web application. Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          concepts: [
            'Semantic HTML',
            'Forms and Validations',
            'Conventions and Best Practices',
            'SEO (Search Engine Optimization)',
            'Floats',
            'Positioning',
            'Display',
            'Box Model',
            'CSS Grid',
            'Flex Box',
            'Media Queries',
            'Mobile First',
            'Block Element Modifier (BEM)',
            'Accessibility (A11Y)',
            'Web Content Accesibility Guidelines (WCAG 2.0)',
            'CSS Modules',
            'CSS Preprocessors',
          ],
          technologies: [
            {
              name: 'Twig',
              icon: '',
            },
            {
              name: 'Liquid',
              icon: '',
            },
            {
              name: 'SASS',
              icon: '',
            },
            {
              name: 'PostCSS',
              icon: '',
            },
            {
              name: 'TailwindCSS',
              icon: '',
            },
            {
              name: 'Bootstrap',
              icon: '',
            },
            {
              name: 'Bulma',
              icon: '',
            },
          ],
        },
        {
          title: 'JavaScript and TypeScript',
          skillLevel: 5,
          description: [
            'As the most popular programming language in the world, JavaScript is the foundation of the Web. A cross-platform, object-oriented scripting language used to make web pages interactive, it is an essential part of almost every modern web application. ',
            'Further down my journey in the front end, I also learned TypeScript, which adds more features on top of it, like static type checking that detects errors before actual code runs, ensuring data integrity as it goes through code logic.',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          concepts: [
            'DOM Manipulation',
            'Event Handling',
            'Fetch API / AJAX (XHR)',
            'ES6+',
            'Hoisting',
            'Event Bubbling',
            'Scope',
            'Prototype',
            'Shadow DOM',
            'Strict Mode',
            'CSS-in-JS',
            'Progressive Web Apps (PWA)',
            'Types',
            'Interfaces',
            'Generics',
            'Enums',
            'Type Aliases',
            'Type Inference',
            'Type Compatibility',
            'Type Guards',
            'Type Assertions',
            'Type Widening',
            'Type Narrowing',
            'Server Side Rendering (SSR)',
            'Static Site Generators',
            'JAMstack',
            'Incremental Static Regeneration (ISR)',
            'Static Site Generation (SSG)',
          ],
          technologies: [
            {
              name: 'Styled Components',
              icon: '',
            },
            {
              name: 'Emotion',
              icon: '',
            },
            {
              name: 'Styled JSX',
              icon: '',
            },
            {
              name: 'TypeScript',
              icon: '',
            },
            {
              name: 'ReactJS',
              icon: '',
            },
            {
              name: 'NextJS',
              icon: '',
            },
            {
              name: 'GatsbyJS',
              icon: '',
            },
            {
              name: 'VueJS',
              icon: '',
            },
            {
              name: 'NuxtJS',
              icon: '',
            },
            {
              name: 'Jekyll',
              icon: '',
            },
            {
              name: 'Hugo',
              icon: '',
            },
          ],
        },
        {
          title: 'Package Managers',
          skillLevel: 4,
          description: [
            'These allow you to manage dependencies in your projects and their versions easily. As someone who built web applications and even developed custom, open-source packages, I have worked with these package managers:',
          ],
          technologies: [
            {
              name: 'NPM',
              icon: '',
            },
            {
              name: 'Yarn',
              icon: '',
            },
          ],
        },
        {
          title: 'Build Tools',
          skillLevel: 4,
          description: [
            'There are linters, formatters, task runners, and module bundlers in building web applications. Here are the technologies I have worked with:',
          ],
          technologies: [
            {
              name: 'Prettier',
              icon: '',
            },
            {
              name: 'Babel',
              icon: '',
            },
            {
              name: 'ESLint',
              icon: '',
            },
            {
              name: 'Webpack',
              icon: '',
            },
            {
              name: 'NPM scripts',
              icon: '',
            },
            {
              name: 'Gulp',
              icon: '',
            },
          ],
        },
        {
          title: 'Testing',
          skillLevel: 3,
          description: [
            'Testing your code to eliminate as many bugs as possible in building web applications is essential. Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          technologies: [
            {
              name: 'Jest',
              icon: '',
            },
            {
              name: 'React Testing Library',
              icon: '',
            },
            {
              name: 'Cypress',
              icon: '',
            },
          ],
        },
        {
          title: 'Authentication Strategies',
          skillLevel: 3,
          description: [
            "Several strategies can be used to authenticate a user or a system's identity. Here are some of the concepts I learned along the way and the technologies I have worked with:",
          ],
        },
        {
          title: 'Web Components',
          skillLevel: 3,
          description: [
            'Web Components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
        },
        {
          title: 'Hybrid Mobile Applications',
          skillLevel: 2,
          description: [
            'Although I just learned to build hybrid mobile applications, I am excited to learn more about them. Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          technologies: [
            {
              name: 'React Native',
              icon: '',
            },
          ],
        },
      ],
    },
    {
      name: 'Backend Development',
      items: [
        {
          title: 'JavaScript',
          skillLevel: 4,
          description: [
            'Besides being used in the frontend, JavaScript can also be used in the backend to write server-side code. Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          concepts: [
            'CommonJS',
            'ESM',
            'Private and Public Packages',
            'Error Handling',
            'Asynchrounous Programming',
            'Command Line Apps',
            'Logging',
            'Streams',
            'Debugging',
            'Built-in Modules',
          ],
          technologies: [
            {
              name: 'NodeJS',
              icon: '',
            },
            {
              name: 'ExpressJS',
              icon: '',
            },
            {
              name: 'Axios',
              icon: '',
            },
            {
              name: 'Fetch API',
              icon: '',
            },
            {
              name: 'Nodemon',
              icon: '',
            },
            {
              name: 'Mongoose',
              icon: '',
            },
            {
              name: 'Winston',
              icon: '',
            },
            {
              name: 'Chrome Dev Tools',
              icon: '',
            },
          ],
        },
        {
          title: 'Python',
          skillLevel: 3,
          description: [
            'I learned Python for the first time a few years back and managed to build scripts with it. Eventually, I learned how to use it to write server-side code alongside another developer from my previous workplace.',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          technologies: [
            {
              name: 'Django',
              icon: '',
            },
          ],
        },
        {
          title: 'PHP',
          skillLevel: 3,
          description: [
            'I learned PHP for quite some time already and managed to build websites with it through WordPress. Eventually I learned how to use it to write server-side code alongside another developer from my previous workplace.',
          ],
          technologies: [
            {
              name: 'Composer',
              icon: '',
            },
            {
              name: 'Xdebug',
              icon: '',
            },
            {
              name: 'WordPress',
              icon: '',
            },
          ],
        },
        {
          title: 'Terminal',
          skillLevel: 3,
          description: [
            'I have also learned how to use the terminal to run commands and scripts. Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          technologies: [
            {
              name: 'BASH',
              icon: '',
            },
            {
              name: 'ZSH',
              icon: '',
            },
          ],
        },
        {
          title: 'Databases',
          skillLevel: 3,
          description: [
            'Different types of databases can be used to store data. Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          concepts: [
            'Relational Databases',
            'Non-Relational Databases',
            'Object Relation Mapping (ORM)',
            'Data Modeling',
            'Data Normalization',
            'Atomicity, Consistency, Isolation, Durability (ACID)',
            'Transactions',
            'Failure Modes',
            'Performance Profiling',
            'Database Indexing',
          ],
          technologies: [
            {
              name: 'MongoDB',
              icon: '',
            },
            {
              name: 'MySQL',
              icon: '',
            },
            {
              name: 'MariaDB',
              icon: '',
            },
            {
              name: 'PostgreSQL',
              icon: '',
            },
          ],
        },
        {
          title: 'APIs',
          skillLevel: 3,
          description: [
            'Stands for Application Programming Interface, a set of functions and procedures that allow the creation of applications that access the features or data of an operating system, application, or other services.',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          technologies: [
            {
              name: 'Optimizely/Episerver',
              icon: '',
            },
            {
              name: 'BigCommerce',
              icon: '',
            },
            {
              name: 'Django',
              icon: '',
            },
          ],
        },
        {
          title: 'Containerization and Virtualization',
          skillLevel: 3,
          description: [
            'Software containerization is a way to package an application with all its dependencies to run quickly and reliably from one computing environment to another.',
            'Conversely, virtualization is a way to run multiple operating systems on a single computer.',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          technologies: [
            {
              name: 'Docker',
              icon: '',
            },
          ],
        },
        {
          title: 'GraphQL',
          skillLevel: 3,
          description: [
            'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. It provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools..',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          technologies: [
            {
              name: 'Apollo',
              icon: '',
            },
          ],
        },
        // {
        //   title: 'Web Servers',
        //   skillLevel: 3,
        //   description: [
        //     'Although they can be either hardware or software, web servers are used to serve web pages to users. Here are some of the concepts I learned along the way and the technologies I have worked with:',
        //   ],
        //   technologies: [
        //     {
        //       name: 'Apache',
        //       icon: '',
        //     },
        //     {
        //       name: 'Nginx',
        //       icon: '',
        //     },
        //   ],
        // },
      ],
    },
    {
      name: 'Version Control',
      items: [
        {
          title: 'Git',
          skillLevel: 5,
          description: [
            'These allow you to track changes to your codebase/files over time. It will enable you to go back to the previous codebase without issues and allows for collaboration with other developers. Here are some of the concepts I learned along the way and the technologies I have worked with:',
          ],
          concepts: [
            'Setup and Config',
            'Branching and Merging',
            'Basic Snapshotting',
            'Staging',
            'Sharing and Updating',
            'Inspection and Comparison',
            'Patching',
            'Administration',
            'Best Practices',
          ],
          technologies: [
            { name: 'Github', icon: '' },
            {
              name: 'Gitlab',
              icon: '',
            },
            {
              name: 'Bitbucket',
              icon: '',
            },
          ],
        },
      ],
    },
  ]

  return { meta, hero, skills }
}

export default SkillsData
