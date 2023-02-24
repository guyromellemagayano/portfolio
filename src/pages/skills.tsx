import { SkillsList, SkillsListCards } from '@/components/List'
import Seo from '@/components/Seo'
import SimpleLayout from '@/components/SimpleLayout'
import SkillsData from '@/data/skills'
import type { NextPage } from 'next'

// Skills page
const Skills: NextPage = (): JSX.Element => {
  // Destrucutre the data from the AboutData function
  const { meta, hero, skills } = SkillsData()

  return (
    <>
      <Seo meta={meta} />

      <SimpleLayout id="hero" title={hero.heading} intro={hero.description}>
        <div className="space-y-20">
          {skills.map((skill) => (
            <SkillsList key={skill.name} title={skill.name}>
              {skill.items?.map((item) => (
                <SkillsListCards
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  concepts={item.concepts}
                  technologies={item.technologies}
                  // cta={[
                  // 	{
                  // 		projects: [
                  // 			{
                  // 				title: "Project 1",
                  // 				description: "Project 1 description",
                  // 				link: "https://google.com"
                  // 			}
                  // 		]
                  // 	},
                  // 	{
                  // 		articles: [
                  // 			{
                  // 				title: "Article 1",
                  // 				description: "Article 1 description",
                  // 				link: "https://google.com"
                  // 			}
                  // 		]
                  // 	}
                  // ]}
                />
              ))}
            </SkillsList>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}

export default Skills
