import React from "react";

// Arrow left SVG icon
const ArrowLeftSvgIcon = (rest: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...rest}>
			<path
				d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default ArrowLeftSvgIcon;
