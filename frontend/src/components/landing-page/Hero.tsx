import { BackgroundRippleEffect } from "../ui/background-ripple-effect";
import { Button } from "../ui/button";
import { FlipWords } from "../ui/flip-words";
import { Highlighter } from "../ui/highlighter";

const HeroSection = () => {
	const words = ["innovation", "creativity", "impact", "experiences", "solutions", "ideas"];

	return (
		<section className="relative mx-auto -mt-14 min-h-screen w-full max-w-[1400px] border-dashed min-[1400px]:border-x min-[1800px]:max-w-[1536px]">
			{/* Background Ripple - Absolute positioning */}
			<BackgroundRippleEffect />

			{/* Content - Relative dengan z-10 */}
			<div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
				<div className="z-10">
					<h2 className="max-w-4xl text-3xl leading-tight font-bold text-neutral-800 md:text-4xl lg:text-5xl dark:text-neutral-100">
						We craft digital experiences that inspire{" "}
						<Highlighter action="underline" color="">
							<FlipWords words={words} />
						</Highlighter>
					</h2>
					<p className="mx-auto mt-4 max-w-xl text-neutral-700 dark:text-neutral-400">Delivering high-quality design and development that drives results and elevates your brand.</p>
				</div>

				<div className="z-10 mt-8 flex justify-center gap-4">
					<Button asChild>
						<a href="/">Our Services</a>
					</Button>
					<Button variant="outline" asChild>
						<a href="/contact-us">Contact Us</a>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
