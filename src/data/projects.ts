import logoDjango from '@/images/logos/django.png'
// import logoGithub from '@/images/logos/github.png'
import logoWordpress from '@/images/logos/wordpress.png'
import { IProjectsData } from '@/interfaces/data'

const ProjectsData = (): IProjectsData => {
  const meta = {
    title: 'Projects - Guy Romelle Magayano',
    description: 'Things I’ve made trying to put my dent in the web universe.',
    keywords:
      'guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs',
  }

  const hero = {
    heading: 'Things I’ve made trying to put my dent in the web universe.',
    description: [
      'I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Some of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.',
    ],
  }

  const projects = [
    {
      name: 'SiteCrawler',
      description: 'Monitor and Strengthen Your Websites',
      link: {
        url: 'https://app.sitecrawler.com/login',
        text: 'app.sitecrawler.com',
      },
      tech: ['NextJS', 'Django', 'PostgreSQL', 'Terraform', 'Docker', 'AWS', 'Traefik', 'Go', 'LocalStack'],
      logo: logoDjango,
    },
    {
      name: 'Big Leap Partnerships',
      description: 'Taking your business from where it is to where you want it to be',
      link: {
        url: 'https://github.com/guyromellemagayano/big-leap-partnerships',
        text: 'github.com',
      },
      tech: ['WordPress', 'PHP', 'Timber', 'MySQL', 'Gulp', 'jQuery', 'Bootstrap'],
      logo: logoWordpress,
    },
  ]

  return { meta, hero, projects }
}

export default ProjectsData
