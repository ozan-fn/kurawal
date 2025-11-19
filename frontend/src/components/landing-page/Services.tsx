import { Highlighter } from "../ui/highlighter";

const ServicesSection = () => {
	return (
		<>
			<hr className="-mb-px w-full border-dashed" />
			<section className="relative mx-auto max-w-[1400px] border-dashed py-12 min-[1400px]:border-x min-[1800px]:max-w-[1536px]">
				<div className="flex">
					<div className="flex-1 items-center p-6">
						<p className="font-caveat text-xl text-neutral-800 dark:text-neutral-400">
							<Highlighter action="underline" color="" padding={2} strokeWidth={1} iterations={2}>
								Our Services
							</Highlighter>
						</p>

						<div className="mx-auto mt-5 flex flex-col items-center text-start">
							<h2 className="max-w-4xl text-start text-3xl leading-tight font-bold text-neutral-800 md:text-4xl lg:text-4xl dark:text-neutral-100">We Build Digital Experiences That Drive Results</h2>

							<p className="mx-auto mt-2 max-w-2xl text-neutral-700 dark:text-neutral-400">From concept to launch, we craft products with thoughtful design, robust development, and user-centric experiences—helping brands grow with clarity and confidence.</p>
						</div>
					</div>
					<div className="flex-1">
						<div className="grid grid-flow-col grid-rows-3 border border-dashed">
							<div className="col-span-2 border-dashed p-2">
								<h2>Mobile App Development</h2>
								<p>High-performance mobile apps for iOS & Android.</p>
							</div>
							<div className="col-span-2 row-span-2 border-t border-dashed p-2">
								<h2>UI/UX Design</h2>
								<p>Clean, intuitive, and user-centered digital design.</p>
							</div>
							<div className="row-span-3 border-l border-dashed p-2">
								<h2>Website Development</h2>
								<p>Fast, scalable, and conversion-focused websites.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ServicesSection;
