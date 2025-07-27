import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ArrowRight, Code, ExternalLink, Github, Globe, Menu, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function KurawalLanding() {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        const handleMouseMove = (e: any) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        {
            icon: <Code className="h-6 w-6" />,
            title: 'Modern Development',
            description: 'Built with the latest Laravel features and best practices',
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Lightning Fast',
            description: 'Optimized performance with advanced caching strategies',
        },
        {
            icon: <Globe className="h-6 w-6 " />,
            title: 'Global Ready',
            description: 'Multi-language support and internationalization ready',
        },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-10 opacity-50">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute h-1 w-1 animate-pulse rounded-full bg-white"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Dynamic Gradient Orb */}
                <div
                    className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl transition-all duration-1000 ease-out"
                    style={{
                        left: mousePosition.x - 192,
                        top: mousePosition.y - 192,
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-xl font-bold">
                            {'{'}
                        </div>
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
                            kurawal.site
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden items-center space-x-8 md:flex">
                        <a href="#features" className="transition-colors hover:text-purple-400">
                            Features
                        </a>
                        <a href="#docs" className="transition-colors hover:text-purple-400">
                            Documentation
                        </a>
                        <a href="#community" className="transition-colors hover:text-purple-400">
                            Community
                        </a>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <a
                                    href={route('dashboard')}
                                    className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 transition-all hover:shadow-lg hover:shadow-purple-500/25"
                                >
                                    <span>Dashboard</span>
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            ) : (
                                <>
                                    <a
                                        href={route('login')}
                                        className="rounded-lg border border-purple-500/50 px-4 py-2 transition-all hover:bg-purple-500/10"
                                    >
                                        Login
                                    </a>
                                    <a
                                        href={route('register')}
                                        className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 transition-all hover:shadow-lg hover:shadow-purple-500/25"
                                    >
                                        Register
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full right-0 left-0 border-t border-purple-500/20 bg-slate-900/95 px-6 py-4 backdrop-blur-lg md:hidden">
                        <div className="flex flex-col space-y-4">
                            <a href="#features" className="transition-colors hover:text-purple-400">
                                Features
                            </a>
                            <a href="#docs" className="transition-colors hover:text-purple-400">
                                Documentation
                            </a>
                            <a href="#community" className="transition-colors hover:text-purple-400">
                                Community
                            </a>
                            <div className="flex flex-col space-y-2 border-t border-purple-500/20 pt-4">
                                {auth.user ? (
                                    <a
                                        href={route('dashboard')}
                                        className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-center transition-all hover:shadow-lg hover:shadow-purple-500/25"
                                    >
                                        Dashboard
                                    </a>
                                ) : (
                                    <>
                                        <a
                                            href={route('login')}
                                            className="rounded-lg border border-purple-500/50 px-4 py-2 text-center transition-all hover:bg-purple-500/10"
                                        >
                                            Login
                                        </a>
                                        <a
                                            href={route('register')}
                                            className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-center transition-all hover:shadow-lg hover:shadow-purple-500/25"
                                        >
                                            Register
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 flex min-h-[80vh] items-center justify-center px-6">
                <div className="mx-auto max-w-6xl text-center">
                    <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="mb-6 text-5xl leading-tight font-bold md:text-7xl">
                            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                Build Amazing
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Laravel Apps
                            </span>
                        </h1>

                        <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
                            Kurawal.site is your ultimate Laravel development platform. Create, deploy, and scale modern web applications with ease.
                        </p>

                        <div className="mb-12 flex flex-col items-center justify-center gap-4 md:flex-row">
                            {auth.user ? (
                                <a
                                    href={route('dashboard')}
                                    className="group flex transform items-center space-x-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                                >
                                    <span>Go to Dashboard</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </a>
                            ) : (
                                <>
                                    <a
                                        href={route('register')}
                                        className="group flex transform items-center space-x-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                                    >
                                        <span>Start Building</span>
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </a>

                                    <a
                                        href={route('login')}
                                        className="group flex items-center space-x-2 rounded-full border-2 border-purple-500/50 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-purple-500/10"
                                    >
                                        <span>Login</span>
                                    </a>
                                </>
                            )}

                            <a
                                href="https://github.com/laravel/laravel"
                                target="_blank"
                                className="group flex items-center space-x-2 rounded-full border-2 border-purple-500/50 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-purple-500/10"
                            >
                                <Github className="h-5 w-5" />
                                <span>View on GitHub</span>
                                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>

                        {/* Laravel Logo Animation */}
                        <div className="relative mx-auto mb-8 h-32 w-32">
                            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20"></div>
                            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500">
                                <svg className="h-16 w-16 text-white" viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302v10.509c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.23.053-.044.08-.061.028-.020.061-.030.091-.049l19.814-11.69a.801.801 0 0 1 .804 0l19.814 11.69c.03.018.063.029.092.049.026.017.056.031.079.061.026.028.048.061.071.093.018.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="relative z-10 px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                            Why Choose Kurawal?
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl text-gray-300">
                            Experience the power of modern Laravel development with our cutting-edge platform
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group transform rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-purple-500/40 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/25">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-white transition-colors group-hover:text-purple-300">{feature.title}</h3>
                                <p className="leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Getting Started Section */}
            <div className="relative z-10 bg-gradient-to-r from-slate-900/50 to-purple-900/50 px-6 py-20 backdrop-blur-sm">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                        Ready to Get Started?
                    </h2>
                    <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-300">
                        Laravel has an incredibly rich ecosystem. We suggest starting with the following resources to begin your journey.
                    </p>

                    <div className="mb-12 grid gap-6 md:grid-cols-2">
                        <a
                            href="https://laravel.com/docs"
                            target="_blank"
                            className="group transform rounded-xl border border-purple-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-500/40"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                                    <ExternalLink className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-purple-300">
                                        Read the Documentation
                                    </h3>
                                    <p className="text-gray-400 transition-colors group-hover:text-gray-300">
                                        Comprehensive guides and API reference
                                    </p>
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://laracasts.com"
                            target="_blank"
                            className="group transform rounded-xl border border-purple-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-purple-500/40"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                                    <ExternalLink className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-purple-300">Watch Laracasts</h3>
                                    <p className="text-gray-400 transition-colors group-hover:text-gray-300">
                                        Premium video tutorials and screencasts
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <a
                        href="https://cloud.laravel.com"
                        target="_blank"
                        className="inline-flex transform items-center space-x-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                    >
                        <span>Deploy Now</span>
                        <ArrowRight className="h-5 w-5" />
                    </a>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-purple-500/20 px-6 py-12">
                <div className="mx-auto max-w-6xl text-center">
                    <div className="mb-4 flex items-center justify-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
                            {'{'}
                        </div>
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-xl font-bold text-transparent">
                            kurawal.site
                        </span>
                    </div>
                    <p className="mb-6 text-gray-400">Empowering developers to build extraordinary Laravel applications</p>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-gray-400 transition-colors hover:text-purple-400">
                            <Github className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 transition-colors hover:text-purple-400">
                            <Globe className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
