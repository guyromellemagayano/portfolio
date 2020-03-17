module.exports = {
  siteMetadata: {
    title: `Guy Romelle Magayano`,
    description: `Full Stack WordPress Developer`,
    siteUrl: `https://guyromellemagayano.tech/`,
    menuLinks: [
      {
        name: "Specialties",
        link: "/specialties/",
      },
      {
        name: "About",
        link: "/about/",
      },
      {
        name: "Blog",
        link: "/blog/",
      },
      {
        name: "Hire Me",
        link: "/contact/",
      },
    ],
    socialLinks: [
      {
        name: "Facebook",
        icon: [
          {
            style: "fab",
            type: "facebook-f",
          },
        ],
        link: "https://www.facebook.com/mguyromelle",
      },
      {
        name: "LinkedIn",
        icon: [
          {
            style: "fab",
            type: "linkedin-in",
          },
        ],
        link: "https://www.linkedin.com/in/mguyromelle",
      },
      {
        name: "Twitter",
        icon: [
          {
            style: "fab",
            type: "twitter",
          },
        ],
        link: "https://twitter.com/mguyromelle",
      },
      {
        name: "WordPress.ORG",
        icon: [
          {
            style: "fab",
            type: "wordpress",
          },
        ],
        link: "https://profiles.wordpress.org/mguyromelle",
      },
      {
        name: "Github",
        icon: [
          {
            style: "fab",
            type: "github",
          },
        ],
        link: "https://github.com/guyromellemagayano",
      },
      {
        name: "DEV.TO",
        icon: [
          {
            style: "fab",
            type: "dev",
          },
        ],
        link: "https://dev.to/guyromellemagayano",
      },
      {
        name: "Stack Overflow",
        icon: [
          {
            style: "fab",
            type: "stack-overflow",
          },
        ],
        link: "https://stackoverflow.com/users/7746874/mguyromelle",
      },
      {
        name: "Behance",
        icon: [
          {
            style: "fab",
            type: "behance",
          },
        ],
        link: "https://www.behance.net/mguyromelle",
      },
      {
        name: "Medium",
        icon: [
          {
            style: "fab",
            type: "medium-m",
          },
        ],
        link: "https://medium.com/@mguyromelle",
      },
      {
        name: "SlideShare",
        icon: [
          {
            style: "fab",
            type: "slideshare",
          },
        ],
        link: "https://www.slideshare.net/mguyromelle",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1400,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source Sans Pro`,
            variants: [`400`, `400i`, `600`, `700`],
          },
          {
            family: `Lora`,
            variants: [`700`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Guy Romelle Magayano`,
        short_name: `Guy Romelle Magayano`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#4caf50`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/images/site-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require("tailwindcss")],
        precision: 8,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeSecurityHeaders: false,
        mergeLinkHeaders: false,
        mergeCachingHeaders: false,
        generateMatchPathRewrites: false,
      },
    },
  ],
}
