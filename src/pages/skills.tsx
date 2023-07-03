import { SkillsList, SkillsListCards } from '@/components/List'
import Seo from '@/components/Seo'
import SimpleLayout from '@/components/SimpleLayout'
import SkillsData from '@/data/skills'
import type { NextPage } from 'next'

// Skills page
const Skills: NextPage = (): React.ReactNode => {
  // Destrucutre the data from the AboutData function
  const { meta, hero, skills } = SkillsData()

  return (
    <>
      <Seo meta={meta} />

      <SimpleLayout id="hero" title={hero.heading} intro={hero.description}>
        <div className="grid gap-y-12">
          {skills.map((skill) => (
            <SkillsList key={skill.name} title={skill.name}>
              {skill.items?.map((item) => (
                <SkillsListCards key={item.title} {...item} />
              ))}
            </SkillsList>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}

export default Skills
