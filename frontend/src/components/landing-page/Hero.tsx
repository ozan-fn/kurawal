import { BackgroundRippleEffect } from "../ui/background-ripple-effect";

const HeroSection = () => {
	return (
		<section className="relative mx-auto -mt-14 min-h-screen w-full max-w-[1400px] border-dashed min-[1400px]:border-x min-[1800px]:max-w-[1536px]">
			{/* Ripple tetap normal agar interaktif */}
			<div className="mx-auto flex justify-center">
				<div className="w-[900px] md:w-[1200px] lg:w-[1400px]">
					<BackgroundRippleEffect />
				</div>
			</div>

			{/* Konten di atas, tapi tidak menghalangi interaksi */}
			<div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
				<div>
					<h2 className="max-w-4xl text-3xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">Interactive Background Boxes Ripple Effect</h2>

					<p className="mx-auto mt-4 max-w-xl text-neutral-700 dark:text-neutral-400">Hover over the boxes above and click. Use it wisely on hero sections or call to action areas.</p>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
