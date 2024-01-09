import { Card } from '@/components'

import { TWorkListCardProps } from '@/types/components'

/**
 * Renders a list of work experiences cards.
 * @param {Object} props - The props object.
 * @param {String} props.company - The company name.
 * @param {String} props.country - The country name.
 * @param {Array} props.contributions - The contributions of the card.
 * @returns {JSX.Element} The rendered component.
 */
const WorkListCards = (props: TWorkListCardProps): JSX.Element => {
  return (
    <Card as="article">
      <Card.Title as="h3" title={props?.company || ''} className="!mb-2">
        {props?.company || ''} &nbsp;
        <h5 className="mb-2 hidden md:block text-sm">{props?.country || ''}</h5>
      </Card.Title>

      <div className="flex flex-row items-start my-2">
        <Card.Eyebrow
          as="ul"
          className="flex-wrap gap-y-4 text-zinc-400 dark:text-zinc-500"
        >
          {props?.contributions?.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </Card.Eyebrow>
      </div>

      <div className="flex flex-row items-start gap-x-6 mt-4 mb-2">
        <Card.Eyebrow
          as="h4"
          className="text-rose-400 dark:text-rose-500 text-base"
        >
          Skills
        </Card.Eyebrow>
        <Card.Eyebrow
          as="ul"
          className="flex-wrap gap-x-3 gap-y-1 text-zinc-400 dark:text-zinc-500"
        >
          {props?.skills?.map((item: string) => <li key={item}>{item}</li>)}
        </Card.Eyebrow>
      </div>
    </Card>
  )
}

export default WorkListCards
