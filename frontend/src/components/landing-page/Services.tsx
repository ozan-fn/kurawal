import { ArrowUpRight } from "lucide-react";
import SafariMockups from "../SafariMockup";
import { Button } from "../ui/button";
import { Highlighter } from "../ui/highlighter";
import IphoneMockup from "../IphoneMockup";
import AndroidMockup from "../AndroidMockup";

const ServicesSection = () => {
	return (
		<>
			<hr className="-mb-px w-full border-dashed" />
			<section className="relative mx-auto max-w-[1400px] border-dashed py-12 min-[1400px]:border-x min-[1800px]:max-w-[1536px]">
				<div className="flex gap-12">
					<div className="flex-1 items-center justify-start p-6">
						<p className="font-caveat text-xl text-neutral-800 dark:text-neutral-400">
							<Highlighter action="underline" color="" padding={2} strokeWidth={1} iterations={2}>
								Our Services
							</Highlighter>
						</p>

						<div className="mx-auto mt-5 flex flex-col items-center text-start">
							<h2 className="max-w-4xl text-start text-3xl leading-tight font-bold text-neutral-800 md:text-4xl lg:text-4xl dark:text-neutral-100">We Build Digital Experiences</h2>
							<p className="mx-auto mt-2 max-w-2xl text-neutral-700 dark:text-neutral-400">From concept to launch, we craft products with thoughtful design, robust development, and user-centric experiences helping brands grow with clarity and confidence.</p>
						</div>

						<Button asChild className="group my-3">
							<a href="/contact-us">
								Contact Us <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
							</a>
						</Button>
					</div>
					<div className="flex-1/3">
						<div className="grid grid-cols-2 gap-0 border border-dashed">
							<div className="border-r border-b border-dashed p-4">
								<h2 className="text-xl font-bold">Mobile App Development</h2>
								<p className="text-neutral-600 dark:text-neutral-400">High-performance mobile apps for iOS & Android.</p>

								<div className="mt-4 flex gap-4">
									<AndroidMockup />
									<IphoneMockup />
								</div>
							</div>

							<div className="border-b border-dashed p-4">
								<h2 className="text-start text-xl font-bold text-neutral-800 dark:text-neutral-100">Website Development</h2>
								<p className="text-start text-neutral-600 dark:text-neutral-400">Fast, scalable, and conversion-focused websites.</p>

								<div className="mt-4 w-full">
									<SafariMockups />
								</div>
							</div>

							<div className="col-span-2 border-dashed p-4">
								<h2 className="text-xl font-bold">UI/UX Design</h2>
								<p className="text-neutral-600 dark:text-neutral-400">Clean, intuitive, and user-centered digital design.</p>

								<div className="mt-4"></div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ServicesSection;
