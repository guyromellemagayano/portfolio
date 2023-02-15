import { ReactNode } from "react";

// Container component props
export interface IContainerProps {
	id?: string;
	className?: string;
	children: ReactNode;
}

// Article component props
export interface IArticleProps {
	slug: string;
	title: string;
	description: string;
	date: string;
}

// Home page props
export interface IHomeProps {
	articles: IArticleProps[];
}
