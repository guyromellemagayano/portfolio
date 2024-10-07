import type { TBaseSeoData } from '@portfolio/types'

import { socialData } from './social'

// Pages data
export const pagesData: TBaseSeoData[] = [
  {
    id: 'c21e1b45-ff64-4c3f-9b1e-50a217841b1f',
    title: 'Home',
    link: '/',
    slug: 'home',
    meta: {
      title: 'Guy Romelle Magayano - Full Stack Developer',
      description:
        'With over six years of professional experience, Guy Romelle Magayano is driven to leverage his expertise in full-stack development to deliver high-performance and robust solutions that enhance business growth and operational efficiency. He is committed to high code quality through rigorous testing and code reviews, known for strategic problem-solving and aligning technical skills with business goals.',
      openGraph: {
        title: 'Guy Romelle Magayano - Full Stack Developer',
        description:
          'With over six years of professional experience, Guy Romelle Magayano is driven to leverage his expertise in full-stack development to deliver high-performance and robust solutions that enhance business growth and operational efficiency. He is committed to high code quality through rigorous testing and code reviews, known for strategic problem-solving and aligning technical skills with business goals.',
        type: 'website',
        url: '/',
        siteName: 'Guy Romelle Magayano - Full Stack Developer',
        images: [
          {
            url: '/images/og-image.jpg',
            width: 800,
            height: 600,
            alt: 'Guy Romelle Magayano - Software Engineer'
          }
        ]
      }
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Home',
      description:
        'Guy Romelle Magayano is a Senior Full Stack Engineer with over six years of experience.',
      publisher: {
        '@type': 'Person',
        name: 'Guy Romelle Magayano'
      },
      sameAs: [
        socialData[0].href,
        socialData[1].href,
        socialData[2].href,
        socialData[3].href,
        socialData[5].href,
        socialData[6].href,
        socialData[7].href,
        socialData[8].href,
        socialData[9].href
      ]
    },
    hero: {
      heading:
        'Driving change through high-performing software, one line at a time.',
      description:
        'With over six years of professional experience, Guy Romelle Magayano is driven to leverage his expertise in full-stack development to deliver high-performance and robust solutions that enhance business growth and operational efficiency. He is committed to high code quality through rigorous testing and code reviews, known for strategic problem-solving and aligning technical skills with business goals.'
    }
  },
  {
    id: 'd4f7b6a1-5e3f-4c9b-8f7e-31b2f7d9c8a2',
    title: 'Work Experiences',
    link: '/work-experiences',
    slug: 'work-experiences',
    meta: {
      title: 'Work Experiences - Guy Romelle Magayano',
      description:
        'Guy Romelle Magayano worked with different companies and clients from other countries. He has been working as a full-stack engineer for more than nine years, utilizing a wide range of technologies and frameworks across various companies and clients.'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Work Experiences',
      description:
        'Explore the work experience of Guy Romelle Magayano, Full Stack Engineer with nine years of experience.',
      publisher: {
        '@type': 'Person',
        name: 'Guy Romelle Magayano'
      },
      sameAs: [
        socialData[0].href,
        socialData[1].href,
        socialData[2].href,
        socialData[3].href,
        socialData[5].href,
        socialData[6].href,
        socialData[7].href,
        socialData[8].href,
        socialData[9].href
      ]
    },
    hero: {
      heading: 'Work Experiences',
      description:
        'Guy Romelle Magayano worked with different companies and clients from other countries. He has been working as a full-stack engineer for more than nine years, utilizing a wide range of technologies and frameworks across various companies and clients.'
    }
  },
  {
    id: 'a98f3d92-2a3e-4bfc-b1be-42a4bdf8c1e9',
    title: 'Projects',
    link: '/projects',
    slug: 'projects',
    meta: {
      title: 'Projects - Guy Romelle Magayano',
      description:
        'Explore the diverse range of projects developed by Guy Romelle Magayano, including full-stack applications, custom WordPress plugins, and high-performance solutions for clients across various industries.'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Projects',
      description:
        'Explore the diverse range of projects developed by Guy Romelle Magayano, including full-stack applications and WordPress plugins.',
      publisher: {
        '@type': 'Person',
        name: 'Guy Romelle Magayano'
      },
      sameAs: [
        socialData[0].href,
        socialData[1].href,
        socialData[2].href,
        socialData[3].href,
        socialData[5].href,
        socialData[6].href,
        socialData[7].href,
        socialData[8].href,
        socialData[9].href
      ]
    },
    hero: {
      heading: 'Projects',
      description:
        'Explore the diverse range of projects developed by Guy Romelle Magayano, including full-stack applications, custom WordPress plugins, and high-performance solutions for clients across various industries.'
    }
  },
  {
    id: 'f673e9d4-2a3c-4b14-b2b9-50d9a3b4d7f3',
    title: 'Articles',
    link: '/articles',
    slug: 'articles',
    meta: {
      title: 'Articles - Guy Romelle Magayano',
      description:
        'Read insightful articles by Guy Romelle Magayano on software development, emerging technologies, and full-stack engineering practices.'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Articles',
      description:
        'Read insightful articles by Guy Romelle Magayano on software development, emerging technologies, and full-stack engineering practices.',
      publisher: {
        '@type': 'Person',
        name: 'Guy Romelle Magayano'
      },
      sameAs: [
        socialData[0].href,
        socialData[1].href,
        socialData[2].href,
        socialData[3].href,
        socialData[5].href,
        socialData[6].href,
        socialData[7].href,
        socialData[8].href,
        socialData[9].href
      ]
    },
    hero: {
      heading: 'Articles',
      description:
        'Read insightful articles by Guy Romelle Magayano on software development, emerging technologies, and full-stack engineering practices.'
    }
  },
  {
    id: 'b8e7f9c2-3c4f-4b1d-a9f5-61d4e5f1b8c2',
    title: 'About',
    link: '/about',
    slug: 'about',
    meta: {
      title: 'About - Guy Romelle Magayano',
      description:
        'Learn more about Guy Romelle Magayano, a Senior Full Stack Engineer with a passion for delivering impactful solutions. His journey from video gaming enthusiast to software development expert has shaped his approach to creating seamless, performance-driven applications.'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'About',
      description:
        'Learn more about Guy Romelle Magayano, a Senior Full Stack Engineer with a passion for delivering impactful solutions.',
      publisher: {
        '@type': 'Person',
        name: 'Guy Romelle Magayano'
      },
      sameAs: [
        socialData[0].href,
        socialData[1].href,
        socialData[2].href,
        socialData[3].href,
        socialData[5].href,
        socialData[6].href,
        socialData[7].href,
        socialData[8].href,
        socialData[9].href
      ]
    },
    hero: {
      heading: 'About',
      description:
        'Learn more about Guy Romelle Magayano, a Senior Full Stack Engineer with a passion for delivering impactful solutions. His journey from video gaming enthusiast to software development expert has shaped his approach to creating seamless, performance-driven applications.'
    }
  },
  {
    id: 'e4f7b6d1-5e7f-4c2b-9a7d-82f3e9c5d8b3',
    title: 'Uses',
    link: '/uses',
    slug: 'uses',
    meta: {
      title: 'Uses - Guy Romelle Magayano',
      description:
        'Explore the tools, software, and equipment used by Guy Romelle Magayano to enhance productivity and deliver exceptional results in full-stack development.'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Uses',
      description:
        'Explore the tools and equipment used by Guy Romelle Magayano to enhance productivity and full-stack development.',
      publisher: {
        '@type': 'Person',
        name: 'Guy Romelle Magayano'
      },
      sameAs: [
        socialData[0].href,
        socialData[1].href,
        socialData[2].href,
        socialData[3].href,
        socialData[5].href,
        socialData[6].href,
        socialData[7].href,
        socialData[8].href,
        socialData[9].href
      ]
    },
    hero: {
      heading: 'Tools and Equipment',
      description:
        'Explore the tools, software, and equipment used by Guy Romelle Magayano to enhance productivity and deliver exceptional results in full-stack development.'
    }
  },
  {
    id: 'c3f8e7d1-5f2e-4a1c-8a2d-93f4d8e9c6f4',
    title: 'Contact',
    link: '/contact',
    slug: 'contact',
    meta: {
      title: 'Contact - Guy Romelle Magayano',
      description:
        'Get in touch with Guy Romelle Magayano for inquiries related to full-stack development, project collaboration, or consulting services.'
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Contact',
      description:
        'Get in touch with Guy Romelle Magayano for inquiries related to full-stack development or collaboration.',
      publisher: {
        '@type': 'Person',
        name: 'Guy Romelle Magayano'
      },
      sameAs: [
        socialData[0].href,
        socialData[1].href,
        socialData[2].href,
        socialData[3].href,
        socialData[5].href,
        socialData[6].href,
        socialData[7].href,
        socialData[8].href,
        socialData[9].href
      ]
    },
    hero: {
      heading: 'Get in Touch',
      description:
        'Get in touch with Guy Romelle Magayano for inquiries related to full-stack development, project collaboration, or consulting services.'
    }
  }
]
