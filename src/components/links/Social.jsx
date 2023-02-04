import Link from 'next/link'

/**
 * @description Render the social link component
 * @param {Object} props
 * @returns {JSX} Social link component
 */
const SocialLink = (props) => {
	const { icon: Icon } = props

	return (
		<Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
	)
}

export default SocialLink
