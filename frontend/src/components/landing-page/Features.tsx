import { CardStackGrid } from "../CardsStackGrid";
import { OrbitingCirclesGrid } from "../OrbitingCircles";
import { Highlighter } from "../ui/highlighter";

const Features = () => {
	return (
		<>
			<hr className="-mb-px w-full border-dashed" />
			<section className="relative mx-auto max-w-[1400px] border-dashed py-12 min-[1400px]:border-x min-[1800px]:max-w-[1536px]">
				<div className="z-10 mx-auto text-center">
					<p className="font-caveat text-neutral-800 dark:text-neutral-400">
						<Highlighter action="underline" color="" padding={2} strokeWidth={1} iterations={2}>
							Differentiating Feature
						</Highlighter>
					</p>

					<div className="mx-auto mt-5 flex flex-col items-center text-center">
						<h2 className="max-w-4xl text-center text-3xl leading-tight font-bold text-neutral-800 md:text-4xl lg:text-4xl dark:text-neutral-100">Your Vision, Built With Precision</h2>
						<p className="mx-auto mt-2 max-w-2xl text-neutral-700 dark:text-neutral-400">From thoughtful design to robust development, we craft solutions that are intentional, effective, and built to last.</p>
					</div>

					<div className="mt-12 grid grid-cols-3 overflow-hidden border-t border-dashed">
						{/* GRID 1 */}
						<div className="relative col-span-2 overflow-hidden border-r border-b border-dashed p-0.5">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="flex-1 p-4">
									<h2 className="text-start text-xl font-bold text-neutral-800 dark:text-neutral-100">Seamless Integration with Any Modern Stack</h2>
									<p className="mt-4 text-start text-neutral-600 dark:text-neutral-400">We leverage modern frameworks, cloud services, and cutting-edge tools to build scalable digital experiences.</p>
								</div>

								<div className="relative flex h-80 items-center justify-end overflow-hidden lg:ml-20">
									<OrbitingCirclesGrid />

									<div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-white to-transparent dark:from-neutral-950" />
									<div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-white to-transparent dark:from-neutral-950" />
									<div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-white to-transparent dark:from-neutral-950" />
								</div>
							</div>
						</div>

						{/* GRID 2 */}
						<div className="relative col-span-1 overflow-hidden border-b border-dashed p-4">
							<div className="flex-col">
								<div>
									<h2>dhwaudhawudhawu</h2>
								</div>
								<div className="items-center justify-center lg:mt-24">
									<CardStackGrid />

									<div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-b from-white to-transparent dark:from-neutral-950" />
								</div>
							</div>
						</div>

						{/* GRID 3 */}
						<div className="relative col-span-1 overflow-hidden border-r border-b border-dashed p-4"></div>

						{/* GRID 4 */}
						<div className="relative col-span-1 overflow-hidden border-r border-b border-dashed p-4"></div>

						{/* GRID 5 */}
						<div className="relative col-span-1 overflow-hidden border-r border-b border-dashed p-4"></div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Features;
