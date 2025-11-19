import { BackgroundRippleEffect } from "../ui/background-ripple-effect";
import { Button } from "../ui/button";
import { FlipWords } from "../ui/flip-words";
import { Highlighter } from "../ui/highlighter";
import { Marquee } from "../ui/marquee";
import { TypingAnimation } from "../ui/typing-animation";

import airin from "@/assets/images/airin.jpg";
import aitherway from "@/assets/images/aitherway.jpg";
import arunika from "@/assets/images/arunika.jpg";
import cetha from "@/assets/images/cetha.jpg";
import daunesia from "@/assets/images/daunesia.jpg";
import nusareka from "@/assets/images/nusareka.jpg";
import chatbot from "@/assets/images/chatbot.jpg";
import reactIcon from "@/assets/svg/react.svg";
import postgree from "@/assets/svg/postgresql.svg";
import mongodb from "@/assets/svg/mongodb.svg";
import nextjs from "@/assets/svg/nextjs.svg";
import tailwindcss from "@/assets/svg/tailwindcss.svg";
import laravel from "@/assets/svg/laravel.svg";
import bun from "@/assets/svg/bun.svg";
import firebase from "@/assets/svg/firebase.svg";
import huggingFace from "@/assets/svg/hugging_face.svg";
import mysql from "@/assets/svg/mysql-icon-light.svg";
import nodeJs from "@/assets/svg/nodejs.svg";
import pnpm from "@/assets/svg/pnpm.svg";
import supabase from "@/assets/svg/supabase.svg";
import vite from "@/assets/svg/vitejs.svg";
import flutter from "@/assets/svg/flutter.svg";
import php from "@/assets/svg/php.svg";
import express from "@/assets/svg/expressjs.svg";

const HeroSection = () => {
	const words = ["innovation", "creativity", "impact", "experiences", "solutions", "ideas"];

	const framework = [nextjs, laravel, flutter, express, tailwindcss];
	const techStack = [reactIcon, php, nodeJs, vite, postgree, mongodb, supabase, mysql, firebase, huggingFace, bun, pnpm];

	const cardProjects = [
		{
			src: airin,
			link: "",
		},
		{
			src: aitherway,
			link: "",
		},
		{
			src: arunika,
			link: "",
		},
		{
			src: cetha,
			link: "",
		},
	];

	const cardProjects1 = [
		{
			src: nusareka,
			link: "",
		},
		{
			src: chatbot,
			link: "",
		},
		{
			src: daunesia,
			link: "",
		},
	];

	return (
		<section className="relative mx-auto -mt-14 min-h-screen w-full max-w-[1400px] border-dashed pb-12 min-[1400px]:border-x min-[1800px]:max-w-[1536px]">
			{/* Background Ripple */}
			<BackgroundRippleEffect />

			{/* Content */}
			<div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
				<div className="z-10">
					<h2 className="max-w-4xl text-3xl leading-tight font-bold text-neutral-800 md:text-4xl lg:text-5xl dark:text-neutral-100">
						We craft digital experiences that inspire{" "}
						<Highlighter action="underline" color="">
							<FlipWords words={words} />
						</Highlighter>
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-neutral-700 dark:text-neutral-400">Delivering high-quality design and development that drives results and elevates your brand.</p>
					<p className="mx-auto text-neutral-700 dark:text-neutral-400">
						Crafted to deliver <TypingAnimation words={["consistent clarity", "strong usability", "lasting impact"]} loop={true} />
					</p>
				</div>

				<div className="z-10justify-center">
					<div className="flex flex-wrap gap-5">
						{framework.map((item, i) => (
							<img key={i} src={item} alt="tech stack" className="h-7 grayscale" />
						))}
						<div className="mx-2 h-7 w-0.5 bg-gray-800" />
						{techStack.map((item, i) => (
							<img key={i} src={item} alt="tech stack" className="h-7 grayscale" />
						))}
					</div>
					<div className="mx-auto mt-8 flex justify-center gap-4">
						<Button asChild>
							<a href="/">Our Services</a>
						</Button>
						<Button variant="outline" asChild>
							<a href="/contact-us">Contact Us</a>
						</Button>
					</div>
				</div>
			</div>
			<div className="z-10 -mt-30 px-4">
				<Marquee pauseOnHover className="[--duration:20s]">
					{cardProjects.map((item, i) => (
						<a key={i} href={item.link || "#"} className="flex items-center justify-center">
							<img src={item.src} alt="project" className="h-40 w-auto rounded-sm transition hover:opacity-100" />
						</a>
					))}
				</Marquee>
				<Marquee reverse pauseOnHover className="mt-2 [--duration:20s]">
					{cardProjects1.map((item, i) => (
						<a key={i} href={item.link || "#"} className="flex items-center justify-center">
							<img src={item.src} alt="project" className="h-40 w-auto rounded-sm transition hover:opacity-100" />
						</a>
					))}
				</Marquee>
				<div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
				<div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
			</div>
		</section>
	);
};

export default HeroSection;
