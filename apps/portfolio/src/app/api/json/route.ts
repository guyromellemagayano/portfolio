import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const getJsonData = async (fileName: string) => {
    try {
      const filePath = req.nextUrl.origin + '/data/' + fileName,
        response = await fetch(filePath)

      if (!response.ok) {
        throw new Error('Failed to fetch JSON')
      }

      const json = await response.json()

      return NextResponse.json(json)
    } catch (err) {
      console.error(err)

      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }

  const url = new URL(req.url),
    query = url.searchParams.get('data'),
    json = {
      home: 'home.json',
      about: 'about.json',
      articles: 'articles.json',
      projects: 'projects.json',
      skills: 'skills.json',
      thankYou: 'thank-you.json',
      uses: 'uses.json',
      work: 'work.json',
      notFound: '404.json',
      social: 'social.json',
      pages: 'pages.json'
    }

  switch (query) {
    case 'home':
      return await getJsonData(json.home)
    case 'about':
      return await getJsonData(json.about)
    case 'articles':
      return await getJsonData(json.articles)
    case 'projects':
      return await getJsonData(json.projects)
    case 'skills':
      return await getJsonData(json.skills)
    case 'thank-you':
      return await getJsonData(json.thankYou)
    case 'uses':
      return await getJsonData(json.uses)
    case 'work':
      return await getJsonData(json.work)
    case 'notFound':
      return await getJsonData(json.notFound)
    case 'social':
      return await getJsonData(json.social)
    case 'pages':
      return await getJsonData(json.pages)
    default:
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }
}
