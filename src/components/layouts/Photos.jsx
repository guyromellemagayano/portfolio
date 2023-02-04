import RotationsData from "@/data/rotations";
import clsx from "clsx";
import Image from "next/image";

/**
 * @description Render the photos layout
 * @param {Object} props
 * @returns Photos layout
 */
const Photos = (props) => {
	const { data } = props;

	return (
		<div className="mt-16 sm:mt-20">
			<div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
				{data?.map((image, imageIndex) => (
					<div
						key={image.src}
						className={clsx(
							"relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
							RotationsData[imageIndex % RotationsData.length]
						)}
					>
						<Image
							src={image}
							alt=""
							sizes="(min-width: 640px) 18rem, 11rem"
							className="absolute inset-0 h-full w-full object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Photos;
