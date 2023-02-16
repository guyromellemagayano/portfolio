import { IProseProps } from "@/interfaces/components";
import clsx from "clsx";

// Prose component
const Prose = ({ children, className }: IProseProps): JSX.Element => {
	return <div className={clsx(className, "prose dark:prose-invert")}>{children}</div>;
};

export default Prose;
