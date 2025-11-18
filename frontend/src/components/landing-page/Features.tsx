import { CardStackGrid } from "../CardsStackGrid";
import { CodeDummy } from "../CodeDummy";
import { OrbitingCirclesGrid } from "../OrbitingCircles";
import { Highlighter } from "../ui/highlighter";
import { motion } from "framer-motion";

import cethaDemo from "@/assets/images/cetha-demo.png";
import cethaJob from "@/assets/images/cetha-jobs.png";
import cethaRecomendation from "@/assets/images/cetha-recomendation.png";

const Features = () => {
	return (
		<>
			<hr className="-mb-px w-full border-dashed" />
			<section className="relative mx-auto max-w-[1400px] border-dashed py-12 min-[1400px]:border-x min-[1800px]:max-w-[1536px]">
				<div className="z-10 mx-auto text-center">
					<p className="font-caveat text-xl text-neutral-800 dark:text-neutral-400">
						<Highlighter action="underline" color="" padding={2} strokeWidth={1} iterations={2}>
							Differentiating Feature
						</Highlighter>
					</p>

					<div className="mx-auto mt-5 flex flex-col items-center text-center">
						<h2 className="max-w-4xl text-center text-3xl leading-tight font-bold text-neutral-800 md:text-4xl lg:text-4xl dark:text-neutral-100">Your Vision, Built With Precision</h2>
						<p className="mx-auto mt-2 max-w-2xl text-neutral-700 dark:text-neutral-400">From thoughtful design to robust development, we craft solutions that are intentional, effective, and built to last.</p>
					</div>

					<div className="mt-12 grid grid-cols-5 overflow-hidden border-t border-dashed">
						{/* GRID 1 */}
						<div className="relative col-span-3 overflow-hidden border-r border-b border-dashed p-0.5">
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="flex-1 p-6">
									<h2 className="text-start text-2xl font-bold text-neutral-800 dark:text-neutral-100">Any Stack. Any Vision. One Team.</h2>
									<p className="mt-4 text-start text-neutral-600 dark:text-neutral-400">We bring your wildest ideas to life using the exact tools you love Next.js, Remix, Nuxt, Laravel, Node, Flutter, or anything bleeding-edge. Scalable, secure, lightning-fast, and launched on time.</p>
								</div>

								<div className="flex items-center justify-end">
									<div className="relative left-12 w-full">
										<OrbitingCirclesGrid />
										<div className="pointer-events-none absolute inset-y-0 left-0 w-5 bg-linear-to-r from-white to-transparent dark:from-neutral-950" />
									</div>
									<div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-linear-to-l from-white to-transparent dark:from-neutral-950" />
									<div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-linear-to-t from-white to-transparent dark:from-neutral-950" />
									<div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-linear-to-b from-white to-transparent dark:from-neutral-950" />
								</div>
							</div>
						</div>

						{/* GRID 2 */}
						<div className="relative col-span-2 overflow-hidden border-b border-dashed p-0.5">
							<div className="flex-col">
								<div className="p-6">
									<h2 className="text-start text-2xl font-bold text-neutral-800 dark:text-neutral-100">You Own Every Line of Code</h2>
									<p className="mt-4 text-start text-neutral-600 dark:text-neutral-400">No black boxes, no lock-in, no hidden sauce. We build with battle-tested, open tools Tailwind, Next.js, Prisma, Vercel and hand you clean, production-ready code you can run, extend, or sell tomorrow.</p>
								</div>
								<div className="items-center justify-center lg:pt-12">
									<CardStackGrid />

									<div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-linear-to-b from-white to-transparent dark:from-neutral-950" />
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-3 overflow-hidden border-b border-dashed">
						<div className="col-span-1 grid overflow-hidden border-r border-dashed p-0.5">
							<div className="px-6 pt-6">
								<h2 className="text-start text-2xl font-bold text-neutral-800 dark:text-neutral-100">We Make Your Website Think</h2>
								<p className="mt-4 text-start text-neutral-600 dark:text-neutral-400">Smart chat, personalized journeys, predictive search, and AI automation turning every visitor into a loyal customer.</p>
							</div>
							<div className="relative p-6">
								<div className="relative rounded-sm border">
									<motion.img
										src={cethaDemo}
										alt="cetha demo"
										className="rounded-sm"
										animate={{ y: [0, -10, 0] }}
										transition={{
											duration: 4,
											repeat: Infinity,
											ease: "easeInOut",
										}}
									/>

									<motion.div
										className="absolute top-35 -left-3 -translate-y-1/2 -rotate-12 rounded-sm border"
										animate={{ y: [0, -12, 0] }}
										transition={{
											duration: 5,
											repeat: Infinity,
											ease: "easeInOut",
											delay: 0.5,
										}}
									>
										<img src={cethaJob} alt="cetha hasil" className="w-25 rounded-sm" />
									</motion.div>

									<motion.div
										className="absolute top-35 -right-4 -translate-y-1/2 rotate-12 rounded-sm border"
										animate={{ y: [0, -8, 0] }}
										transition={{
											duration: 4.5,
											repeat: Infinity,
											ease: "easeInOut",
											delay: 1,
										}}
									>
										<img src={cethaRecomendation} alt="cetha hasil" className="w-40 rounded-sm" />
									</motion.div>
								</div>
							</div>
						</div>
						<div className="col-span-2 grid overflow-hidden p-0.5">
							<div className="flex">
								<div className="p-6 text-start">
									<CodeDummy duration={200} delay={0} writing={true} cursor={true} />
								</div>
								<div className="flex-1">
									<div className="p-6">
										<h2 className="text-start text-2xl font-bold text-neutral-800 dark:text-neutral-100">Beautiful Outside. Bulletproof Inside.</h2>
										<p className="mt-4 text-start text-neutral-600 dark:text-neutral-400">Every line of code is written like it's going to be studied in a museum. Performant, maintainable, and built to evolve with your company for the next decade.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Features;
