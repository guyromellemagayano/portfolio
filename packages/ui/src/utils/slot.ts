export function getDataSlot(props: object, fallback: string) {
  return (props as { "data-slot"?: string })["data-slot"] ?? fallback;
}
