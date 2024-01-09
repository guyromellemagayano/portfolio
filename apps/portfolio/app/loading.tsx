/**
 * Render the loading page content.
 * @param page - The page to render.
 * @returns The loading page content component.
 */
const Loading = (): JSX.Element => {
  return (
    <main className="flex min-h-full items-end justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold">Loading...</p>
      </div>
    </main>
  )
}

export default Loading
