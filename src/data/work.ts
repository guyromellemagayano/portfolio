import { IWorkData } from '@/interfaces/data'

const WorkData = (): IWorkData => {
  const meta = {
    title: 'Work - Guy Romelle Magayano',
    description: 'I specialized in building websites and web applications using modern technologies.',
    keywords:
      'guy romelle magayano, full stack developer, davao, philippines, frontend, backend, version control, epic design labs, multiplymii, make interactive bv, orth enterprises, outsourcing wizards, infosoft studio, miniclean business solutions, western pest control, freelance',
  }

  const hero = {
    heading: 'I specialized in building websites and web applications using modern technologies.',
    description: [
      'I worked with different companies and clients from other countries. I have been working as a full-stack developer for more than five years. I have worked with different technologies and frameworks across various companies and clients from other countries.',
    ],
  }

  const workExperiences = [
    {
      company: 'Epic Design Labs',
      duration: 'April 2020 - February 2023',
      country: 'Portland, Oregon, USA',
      description: [
        'Hired as a full-time full stack developer to create headless BigCommerce websites using modern web stack technologies and frameworks.',
        'Worked with a small team of developers to create web applications for the company.',
      ],
      contributions: [
        'Developed a web crawler application that fetches and scrapes SEO data from websites and stores it in a database while generating comprehensive SEO reports for clients. The application was built using Python, Django, Django REST Framework, PostgreSQL Go, React, and Next.js. The application was deployed on AWS via a Docker + LocalStack CI/CD setup.',
        'Developed custom Python scripts to automate the process of data scraping from websites and exporting the data to CSV files.',
        'Developed a mobile application for a wine social networking business that allows users to create, manage, and share their wine collections with other wine enthusiasts and collectors. It has a web application counterpart as well that go with the mobile application.',
        'The former was built using React Native, Expo, and MongoDB while the latter was built using React, Next.js, GraphQL, NodeJS, Mongoose, Redux, TailwindCSS, PostCSS, Apollo, and MongoDB. Both were deployed on Heroku via a custom Docker CI/CD setup.',
        'Led a small team of developers to build multiple headless BigCommerce websites for clients. These websites include RVGearPro and Duxiana and these were built with React, Gatsby, GraphQL, NodeJS, TailwindCSS, PostCSS, BigCommerce API, Optimizely API, Netlify Functions. The websites were deployed on Netlify.',
      ],
    },
    {
      company: 'MultiplyMii',
      duration: 'April 2020 - September 2021',
      country: 'Philippines',
      description: [
        'Hired as a full-time full stack developer to maintain their company website by adding new features and fixing bugs.',
      ],
      contributions: [
        "Update the user interface of the company website to make it more modern and user-friendly using Bulma CSS framework, GSAP, Vue.js, and Nuxt.js while also adding a pricing calculator to the company website to allow potential clients to calculate the cost of the company's talent pool.",
      ],
    },
    {
      company: 'Make Interactive BV / Zuid Creatives',
      duration: 'April 2019 - February 2020',
      country: 'Netherlands',
      description: [
        'Hired as a full-time full stack developer to maintain WordPress websites.',
        "Worked with a small team of developers to maintain and add new features to the company's internal Software as a Service (SASS) application.",
      ],
      contributions: [
        'Maintain the following WordPress websites: Versteijnen, LIJV, Sue Behavioural Design, and Tablazz.',
        "Developed a custom contact form WordPress plugin specific for a company's website, Versteijnen. It utilizes the company's internal CRM system to store the contact form data. The plugin was built using HTML5, CSS3, PHP, MySQL, WordPress API, and jQuery.",
        "Worked with a small team of developers to maintain and add new features to the company's internal SASS application, Driff. This application functions as an online collaboration platform for end-users. This platform was built using React, Redux, Laravel, Redis, MySQL, NodeJS, and ExpressJS.",
      ],
    },
    {
      company: 'Orth Enterprises, LLC',
      duration: 'April 2019 - August 2019',
      country: 'Houston, Texas, USA',
      description: ['Hired as a full-time full stack developer to work on a company website: Julva, the Dream Cream.'],
      contributions: [
        "Rebuilt the website, Julva, the Dream Cream, using Hugo static site generator and custom CSS with SASS preprocessor and Gulp toolkit. The website was deployed on the client's web server.",
      ],
    },
    {
      company: 'Outsourcing Wizards',
      duration: 'January 2019 - March 2019',
      country: 'Victoria, Texas, USA',
      description: ['Hired as a full-time full stack developer to work on various projects for clients.'],
      contributions: [
        'Worked with a small team of developers to develop a real estate WordPress plugin. The plugin was built using HTML5, CSS3, PHP, MySQL, WordPress API, and jQuery.',
        'Maintain custom theme installations for multiple WordPress websites using HTML5, CSS3, SASS, PHP, MySQL, and jQuery.',
      ],
    },
    {
      company: 'Infosoft Studio',
      duration: 'May 2017 - September 2018',
      country: 'Davao City, Philippines',
      description: [
        'Hired as a full-time full stack developer to work on various projects for government agencies and private companies.',
      ],
      contributions: [
        'Worked with a small team of developers to develop WordPress websites for the following government agencies in the Philippines: City Governments of Davao and Tagum, Davao Tourism Office. The websites were built using WordPress, Bootstrap, HTML5, CSS3, SASS, PHP, MySQL, Gulp, and jQuery.',
      ],
    },
    {
      company: 'MiniClean Business Solutions',
      duration: 'November 2014 - April 2015',
      country: 'Davao City, Philippines',
      description: ['Hired as a full-time full stack developer to work on various client projects for the company.'],
      contributions: [
        'Worked with the company manager to maintain client websites either developed using WordPress or using custom tech stacks. The websites were built using HTML5, CSS3, SASS, PHP, MySQL, Bootstrap, Gulp, and jQuery.',
      ],
    },
  ]

  return { meta, hero, workExperiences }
}

export default WorkData
