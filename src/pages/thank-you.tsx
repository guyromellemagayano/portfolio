import Seo from "@/components/Seo";
import SimpleLayout from "@/components/SimpleLayout";
import ThankYouData from "@/data/thank-you";

const ThankYou = (): JSX.Element => {
	const { meta, hero } = ThankYouData();

	return (
		<>
			<Seo meta={meta} />

			<SimpleLayout title={hero.heading} intro={hero.description} />
		</>
	);
};

export default ThankYou;
