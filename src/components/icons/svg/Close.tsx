import React from "react";

// Close SVG icon
const CloseSvgIcon = (rest: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...rest}>
			<path
				d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default CloseSvgIcon;
