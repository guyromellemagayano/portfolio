import clsx from "clsx";
import { ReactNode, forwardRef } from "react";

interface Props {
	className?: string;
	children: ReactNode;
}

type DivRef = HTMLDivElement;

const OuterContainer = forwardRef<DivRef, Props>(({ className, children, ...props }, ref) => {
	return (
		<div ref={ref} className={clsx("sm:px-8", className)} {...props}>
			<div className="mx-auto max-w-7xl lg:px-8">{children}</div>
		</div>
	);
});

const InnerContainer = forwardRef<DivRef, Props>(({ className, children, ...props }, ref) => {
	return (
		<div ref={ref} className={clsx("relative px-4 sm:px-8 lg:px-12", className)} {...props}>
			<div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
		</div>
	);
});

const ContainerWithRef = forwardRef<DivRef, Props>(({ children, ...props }, ref) => {
	return (
		<OuterContainer ref={ref} {...props}>
			<InnerContainer>{children}</InnerContainer>
		</OuterContainer>
	);
});

type ContainerType = typeof ContainerWithRef & {
	Outer: typeof OuterContainer;
	Inner: typeof InnerContainer;
};

const Container = ContainerWithRef as ContainerType;

Container.Outer = OuterContainer;
Container.Inner = InnerContainer;

export default Container;
