import Head from "next/head";
import Script from "next/script";

/**
 * @description Render the SEO component
 * @param {Object} props
 * @returns {JSX} SEO component
 */
const Seo = (props) => {
	const { meta } = props;

	return (
		<>
			<Head>
				<title>{meta?.title || ""}</title>
				<meta name="description" content={meta?.description || ""} />
				<meta name="keywords" content={meta?.keywords || ""} />
			</Head>

			{/* Global site tag (gtag.js) - Google Analytics */}
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID});
        `}
			</Script>
		</>
	);
};

export default Seo;
