import Image, { type ImageProps } from "next/image";

type MDXComponents = Record<string, unknown>;

export const useMDXComponents = (components: MDXComponents) => ({
  ...components,
  Image: (props: ImageProps) => <Image {...props} />,
});
