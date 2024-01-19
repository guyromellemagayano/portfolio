import type { TGenericPageData } from '@/types/common'

export type TSkillsData<T = object> = TGenericPageData<T> & {
  skills?: Array<TSkillsDataProps>
}

export type TSkillsDataProps<T = object> = T & {
  name: string
  items?: Array<TSkillsItemsProps>
}

export type TSkillsItemsProps<T = object> = T & {
  title: string
  skillLevel: number
  description: string[]
  technologies: Array<{
    name: string
    link?: string
  }>
}

/**
 * Returns an object containing data about skills.
 * @returns {TSkillsData} An object containing meta information, hero section data, and skills data.
 */
const SkillsData = (): TSkillsData => {
  const meta = {
    title: 'Skills - Guy Romelle Magayano',
    description:
      'I love web and currently focusing on being better at quite a few things.',
    keywords:
      'guy romelle magayano, full stack developer, davao, philippines, frontend, backend, version control'
  }

  const hero = {
    heading:
      'I love web and currently focusing on being better at quite a few things.',
    description: [
      'I have a wide range of skills and experiences in building web applications and websites from frontend to backend development. Here is a complete list of some of the technologies I have worked with and some of the projects I have worked on since.'
    ]
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
            'Both HTML and CSS, along with JavaScript, are the blocks of the Web and serve as the foundations of any website and web application. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Twig',
              link: 'https://twig.symfony.com/'
            },
            {
              name: 'Liquid',
              link: 'https://shopify.github.io/liquid/'
            },
            {
              name: 'SASS',
              link: 'https://sass-lang.com/'
            },
            {
              name: 'PostCSS',
              link: 'https://sass-lang.com/'
            },
            {
              name: 'TailwindCSS',
              link: 'https://tailwindcss.com/'
            },
            {
              name: 'Bootstrap',
              link: 'https://getbootstrap.com/'
            },
            {
              name: 'Bulma',
              link: 'https://bulma.io/'
            }
          ]
        },
        {
          title: 'JavaScript and TypeScript',
          skillLevel: 5,
          description: [
            'As the most popular programming language in the world, JavaScript is the foundation of the Web. A cross-platform, object-oriented scripting language used to make web pages interactive, it is an essential part of almost every modern web application. ',
            'Further down my journey in the front end, I also learned TypeScript, which adds more features on top of it, like static type checking that detects errors before actual code runs, ensuring data integrity as it goes through code logic.',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Styled Components',
              link: 'https://styled-components.com/'
            },
            {
              name: 'Emotion',
              link: 'https://emotion.sh/docs/introduction'
            },
            {
              name: 'ReactJS',
              link: 'https://reactjs.org/'
            },
            {
              name: 'NextJS',
              link: 'https://nextjs.org/'
            },
            {
              name: 'GatsbyJS',
              link: 'https://www.gatsbyjs.com/'
            },
            {
              name: 'VueJS',
              link: 'https://vuejs.org/'
            },
            {
              name: 'NuxtJS',
              link: 'https://nuxtjs.org/'
            },
            {
              name: 'Jekyll',
              link: 'https://jekyllrb.com/'
            },
            {
              name: 'Hugo',
              link: 'https://gohugo.io/'
            }
          ]
        },
        {
          title: 'Package Managers',
          skillLevel: 4,
          description: [
            'These allow you to manage dependencies in your projects and their versions easily. As someone who built web applications and even developed custom, open-source packages, I have worked with these package managers:'
          ],
          technologies: [
            {
              name: 'NPM',
              link: 'https://www.npmjs.com/'
            },
            {
              name: 'Yarn',
              link: 'https://yarnpkg.com/'
            }
          ]
        },
        {
          title: 'Build Tools',
          skillLevel: 4,
          description: [
            'There are linters, formatters, task runners, and module bundlers in building web applications. Here are the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Prettier',
              link: 'https://prettier.io/'
            },
            {
              name: 'Babel',
              link: 'https://babeljs.io/'
            },
            {
              name: 'ESLint',
              link: 'https://eslint.org/'
            },
            {
              name: 'Webpack',
              link: 'https://webpack.js.org/'
            },
            {
              name: 'Gulp',
              link: 'https://gulpjs.com/'
            }
          ]
        },
        {
          title: 'Testing',
          skillLevel: 3,
          description: [
            'Testing your code to eliminate as many bugs as possible in building web applications is essential. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Jest',
              link: 'https://jestjs.io/'
            },
            {
              name: 'React Testing Library',
              link: 'https://testing-library.com/'
            },
            {
              name: 'Cypress',
              link: 'https://www.cypress.io/'
            }
          ]
        },
        {
          title: 'Hybrid Mobile Applications',
          skillLevel: 2,
          description: [
            'Although I just learned to build hybrid mobile applications, I am excited to learn more about them. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'React Native',
              link: 'https://reactnative.dev/'
            }
          ]
        }
      ]
    },
    {
      name: 'Backend Development',
      items: [
        {
          title: 'JavaScript and TypeScript',
          skillLevel: 4,
          description: [
            'Besides being used in the frontend, JavaScript, and therefore TypeScript, can also be used in the backend to write server-side code. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'NodeJS',
              link: 'https://nodejs.org/en/'
            },
            {
              name: 'ExpressJS',
              link: 'https://expressjs.com/'
            },
            {
              name: 'Axios',
              link: 'https://axios-http.com/'
            },
            {
              name: 'Fetch API',
              link: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API'
            },
            {
              name: 'Mongoose',
              link: 'https://mongoosejs.com/'
            }
          ]
        },
        {
          title: 'Python',
          skillLevel: 3,
          description: [
            'I learned Python for the first time a few years back and managed to build scripts with it. Eventually, I learned how to use it to write server-side code alongside another developer from my previous workplace.',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Django',
              link: 'https://www.djangoproject.com/'
            }
          ]
        },
        {
          title: 'PHP',
          skillLevel: 3,
          description: [
            'I learned PHP for quite some time already and managed to build websites with it through WordPress. Eventually I learned how to use it to write server-side code alongside another developer from my previous workplace.'
          ],
          technologies: [
            {
              name: 'WordPress',
              link: 'https://wordpress.com/'
            }
          ]
        },
        {
          title: 'Terminal',
          skillLevel: 3,
          description: [
            'I have also learned how to use the terminal to run commands and scripts. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'BASH',
              link: 'https://www.gnu.org/software/bash/'
            },
            {
              name: 'Nano',
              link: 'https://www.nano-editor.org/'
            }
          ]
        },
        {
          title: 'Databases',
          skillLevel: 3,
          description: [
            'Different types of databases can be used to store data. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'MongoDB',
              link: 'https://www.mongodb.com/'
            },
            {
              name: 'MySQL',
              link: 'https://www.mysql.com/'
            },
            {
              name: 'MariaDB',
              link: 'https://mariadb.org/'
            },
            {
              name: 'PostgreSQL',
              link: 'https://www.postgresql.org/'
            }
          ]
        },
        {
          title: 'APIs',
          skillLevel: 3,
          description: [
            'Stands for Application Programming Interface, a set of functions and procedures that allow the creation of applications that access the features or data of an operating system, application, or other services.',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Optimizely/Episerver',
              link: 'https://www.optimizely.com/'
            },
            {
              name: 'BigCommerce',
              link: 'https://www.bigcommerce.com/'
            }
          ]
        },
        {
          title: 'Containerization and Virtualization',
          skillLevel: 3,
          description: [
            'Software containerization is a way to package an application with all its dependencies to run quickly and reliably from one computing environment to another.',
            'Conversely, virtualization is a way to run multiple operating systems on a single computer.',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Docker',
              link: 'https://www.docker.com/'
            }
          ]
        },
        {
          title: 'GraphQL',
          skillLevel: 3,
          description: [
            'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. It provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools..',
            'Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Apollo',
              link: 'https://www.apollographql.com/'
            }
          ]
        }
      ]
    },
    {
      name: 'DevOps',
      items: [
        {
          title: 'Continuous Integration and Continuous Deployment (CI/CD)',
          skillLevel: 3,
          description: [
            'These are software development practices where developers integrate code into a shared repository frequently, and then automatically build, test, and deploy it to production. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Github Actions',
              link: 'https://github.com/features/actions'
            }
          ]
        },
        {
          title: 'Cloud Computing',
          skillLevel: 3,
          description: [
            'Cloud computing is the on-demand delivery of IT resources and applications via the Internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, you can access technology services, such as computing power, storage, and databases, on an as-needed basis from a cloud provider.'
          ],
          technologies: [
            {
              name: 'AWS',
              link: 'https://aws.amazon.com/'
            },
            {
              name: 'Google Cloud',
              link: 'https://cloud.google.com/'
            },
            {
              name: 'Digital Ocean',
              link: 'https://www.digitalocean.com/'
            },
            {
              name: 'Heroku',
              link: 'https://www.heroku.com/'
            }
          ]
        },
        {
          title: 'Web Server',
          skillLevel: 3,
          description: [
            'A web server is a computer system that processes requests via HTTP, the basic network protocol used to distribute information on the World Wide Web. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Nginx',
              link: 'https://www.nginx.com/'
            },
            {
              name: 'Apache',
              link: 'https://httpd.apache.org/'
            }
          ]
        },
        {
          title: 'Operating Systems',
          skillLevel: 4,
          description: [
            'An operating system (OS) is system software that manages computer hardware and software resources and provides common services for computer programs. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'Ubuntu (Linux)',
              link: 'https://ubuntu.com/'
            },
            {
              name: 'Windows',
              link: 'https://www.microsoft.com/en-us/windows'
            }
          ]
        },
        {
          title: 'Networks, Security, and Protocols',
          skillLevel: 3,
          description: [
            'A network is a collection of computers and other devices connected by communication channels that allow them to exchange information. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [
            {
              name: 'TCP/IP',
              link: 'https://en.wikipedia.org/wiki/Internet_protocol_suite'
            },
            {
              name: 'HTTP',
              link: 'https://www.cloudflare.com/en-gb/learning/ddos/glossary/hypertext-transfer-protocol-http/'
            },
            {
              name: 'HTTPS',
              link: 'https://www.cloudflare.com/en-gb/learning/ssl/what-is-https/'
            },
            {
              name: 'SSH',
              link: 'https://en.wikipedia.org/wiki/Secure_Shell'
            },
            {
              name: 'FTP',
              link: 'https://www.geeksforgeeks.org/file-transfer-protocol-ftp-in-application-layer/'
            },
            {
              name: 'DNS',
              link: 'https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/'
            },
            {
              name: 'SSL',
              link: 'https://www.cloudflare.com/learning/ssl/what-is-ssl/'
            },
            {
              name: 'TLS',
              link: 'https://www.cloudflare.com/en-gb/learning/ssl/transport-layer-security-tls/'
            }
          ]
        }
      ]
    },
    {
      name: 'Version Control',
      items: [
        {
          title: 'Git',
          skillLevel: 5,
          description: [
            'These allow you to track changes to your codebase/files over time. It will enable you to go back to the previous codebase without issues and allows for collaboration with other developers. Here are some of the concepts I learned along the way and the technologies I have worked with:'
          ],
          technologies: [{ name: 'Github', link: 'https://github.com/' }]
        }
      ]
    }
  ]

  return { meta, hero, skills }
}

export default SkillsData
