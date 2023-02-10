/**
 * @description Get the previous value of a variable
 * @param {string} value
 * @returns {string} previous value
 */
const usePrevious = (value) => {
	let ref = useRef();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};

export default usePrevious;
