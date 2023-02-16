import RotationsData from "@/data/rotations";
import { IPhotosProps } from "@/interfaces/components";
import clsx from "clsx";
import Image from "next/image";

// Photos layout component
const Photos = ({ data }: IPhotosProps): JSX.Element => {
	return (
		<div className="mt-16 sm:mt-20">
			<div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
				{data?.map((image, imageIndex) => (
					<div
						key={imageIndex}
						className={clsx(
							"relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
							RotationsData[imageIndex % RotationsData.length]
						)}
					>
						<Image
							src={image.src}
							alt={image.alt}
							sizes="(min-width: 640px) 18rem, 11rem"
							className="absolute inset-0 h-full w-full object-cover"
							priority
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Photos;
