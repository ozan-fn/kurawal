import { Highlighter } from "../ui/highlighter";

const PortofolioSection = () => {
	return (
		<>
			<hr className="-mb-px w-full border-dashed" />
			<section className="relative mx-auto max-w-[1400px] border-dashed py-12 min-[1400px]:border-x min-[1800px]:max-w-[1536px]">
				<div className="z-10 mx-auto text-center">
					<p className="font-caveat text-xl text-neutral-800 dark:text-neutral-400">
						<Highlighter action="underline" color="" padding={2} strokeWidth={1} iterations={2}>
							Our Best Works
						</Highlighter>
					</p>

					<div className="mx-auto mt-5 flex flex-col items-center text-center">
						<h2 className="max-w-4xl text-center text-3xl leading-tight font-bold text-neutral-800 md:text-4xl lg:text-4xl dark:text-neutral-100">Showcasing Work That Delivers Real Impact</h2>
						<p className="mx-auto mt-2 max-w-2xl text-neutral-700 dark:text-neutral-400">Every project reflects our commitment to clarity, creativity, and reliable execution designed to elevate brands with measurable results.</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default PortofolioSection;
