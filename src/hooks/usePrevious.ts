import { useEffect, useRef } from "react";

// Hook to get the previous value of a prop.
const usePrevious = (value: string): string => {
	const ref = useRef<string | null>(null);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};

export default usePrevious;
