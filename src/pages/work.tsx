import { WorkList, WorkListCards } from '@/components/List'
import Seo from '@/components/Seo'
import SimpleLayout from '@/components/SimpleLayout'
import WorkData from '@/data/work'
import { NextPage } from 'next'

// Work page
const Work: NextPage = (): React.ReactNode => {
  // Destructure the data from the WorkData function
  const { meta, hero, workExperiences } = WorkData()

  return (
    <>
      <Seo meta={meta} />

      <SimpleLayout id="hero" title={hero.heading} intro={hero.description}>
        <div className="grid gap-y-12">
          {workExperiences.map((item) => (
            <WorkList key={item.duration} title={item.duration}>
              <WorkListCards {...item} />
            </WorkList>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}

export default Work
