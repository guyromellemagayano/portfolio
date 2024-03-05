import {
  SharedReactComponent,
  TSharedSvgProps
} from '@guy-romelle-magayano/react-components/server'

/**
 * Renders an SVG image of an envelope.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of an envelope.
 */
const MailSvg = (rest: TSharedSvgProps) => {
  return (
    <SharedReactComponent.Svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      <SharedReactComponent.SvgPath
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <SharedReactComponent.SvgPath
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </SharedReactComponent.Svg>
  )
}

export default MailSvg
