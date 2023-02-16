import React from "react";

// Hook to get the previous value of a prop.
const usePrevious = (value: string): string => {
	const ref = React.useRef<string | null>(null);

	React.useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};

export default usePrevious;
