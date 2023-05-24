import logoEpicDesignLabs from '@/images/logos/epic-design-labs.png'
import logoInfosoftStudio from '@/images/logos/infosoft-studio.png'
import logoMakeDevelopment from '@/images/logos/make-development.jpeg'
import logoMultiplyMii from '@/images/logos/multiplymii.jpeg'
import logoXTeam from '@/images/logos/x-team.png'
import image4 from '@/images/photos/food.jpg'
import image5 from '@/images/photos/photography.jpg'
import image2 from '@/images/photos/speaker.jpg'
import image1 from '@/images/photos/travel.jpg'
import image3 from '@/images/photos/workplace.jpg'
import { IHomeData } from '@/interfaces/data'

const HomeData = (): IHomeData => {
  const meta = {
    title: 'Guy Romelle Magayano - Full Stack Developer, open-source enthusiast, and a minimalist',
    description: 'Full stack developer, open-source enthusiast, and a minimalist.',
    keywords:
      'guy romelle magayano, full stack developer, davao, philippines, custom web application, custom web development, devops, seo, amazon, google, javascript, typescript, html, css, react, react native, wordpress, tailwind, jamstack, gatsby, nextjs',
  }

  const hero = {
    heading: 'Full stack developer, open-source enthusiast, and a minimalist.',
    description: [
      'I’m Guy, a full stack developer and an open-source enthusiast based in Davao City, Philippines. I love building things that live on the internet, whether that be websites, applications, or anything in between. My goal is to always build products that provide pixel-perfect, performant experiences while also ensuring minimal code and maximum efficiency.',
    ],
  }

  const slidePhotos = [
    {
      alt: '',
      src: image1,
    },
    {
      alt: '',
      src: image2,
    },
    {
      alt: '',
      src: image3,
    },
    {
      alt: '',
      src: image4,
    },
    {
      alt: '',
      src: image5,
    },
  ]

  const cvFile = '/docs/cv.pdf'

  const workExperiences = [
    {
      company: 'X-Team',
      title: 'Senior Full Stack Developer',
      logo: logoXTeam,
      start: 'Apr. 2023',
      end: 'Present',
    },
    {
      company: 'Epic Design Labs',
      title: 'Full Stack Developer',
      logo: logoEpicDesignLabs,
      start: 'Apr. 2020',
      end: 'Feb. 2023',
    },
    {
      company: 'MultiplyMii',
      title: 'Full Stack Developer',
      logo: logoMultiplyMii,
      start: 'Apr. 2020',
      end: 'Sept. 2021',
    },
    {
      company: 'MAKE Interactive BV',
      title: 'Web Developer',
      logo: logoMakeDevelopment,
      start: 'Apr. 2019',
      end: 'Feb. 2020',
    },
    {
      company: 'Orth Enterprises, LLC',
      title: 'Web Developer',
      logo: null,
      start: 'Apr. 2019',
      end: 'Aug. 2019',
    },
    {
      company: 'Outsourcing Wizards',
      title: 'Web Developer',
      logo: null,
      start: 'Jan. 2019',
      end: 'Mar. 2019',
    },
    {
      company: 'Infosoft Studio',
      title: 'Web Developer',
      logo: logoInfosoftStudio,
      start: 'May. 2017',
      end: 'Sept. 2018',
    },
    {
      company: 'MiniClean Business Solutions',
      title: 'Web Developer',
      logo: null,
      start: 'Nov. 2014',
      end: 'Apr. 2015',
    },
  ]

  return {
    meta,
    hero,
    slidePhotos,
    cvFile,
    workExperiences,
  }
}

export default HomeData
