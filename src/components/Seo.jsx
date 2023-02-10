import Head from "next/head";

/**
 * @description Render the SEO component
 * @param {Object} props
 * @returns {JSX} SEO component
 */
const Seo = (props) => {
	const { meta } = props;

	return (
		<Head>
			<title>{meta?.title || ""}</title>
			<meta name="description" content={meta?.description || ""} />
			<meta name="keywords" content={meta?.keywords || ""} />
		</Head>
	);
};

export default Seo;
