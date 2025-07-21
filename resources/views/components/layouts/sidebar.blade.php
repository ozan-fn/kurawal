@php
    $navigations = [
        'main' => [
            'profile' => [
                'label' => 'Profil',
                'icon' => 'user',
                'route' => 'profile.edit',
            ],
            'posts' => [
                'label' => 'Posts',
                'icon' => 'sticky-note',
                'route' => 'posts.index',
            ],
        ],
    ];
@endphp

<nav x-data="{ open: false }"
    class="bg-white hidden gap-2 fixed top-0 left-0 w-64 h-screen dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 md:flex flex-col">
    {{-- Logo --}}
    <div class="py-2 px-4 h-16 flex items-center relative">
        <div
            class="absolute right-0 translate-y-1/3 translate-x-1/2 h-9 w-9 bg-primary-muted/10 rounded-full flex justify-center items-center">
            <div class="h-[22px] w-[22px] bg-primary rounded-full flex justify-center items-center">
                <i class="w-[15px] h-[15px] text-white mr-0.5" data-lucide="chevron-left"></i>
            </div>
        </div>
        <x-application-logo class="h-8 w-auto fill-current text-gray-800 dark:text-gray-200" />
    </div>

    {{-- Primary Navigation Menu --}}
    <div class="flex flex-col gap-2">
        <a href="{{ route('dashboard') }}"
            class="relative px-4 mt-2 {{ Route::is('dashboard') ? 'text-primary' : 'text-gray-700 dark:text-gray-300' }}">
            <div
                class="absolute right-0 h-full w-1 {{ Route::is('dashboard') ? 'bg-primary' : 'bg-transparent' }} rounded-l-[6px]">
            </div>
            <div
                class="flex flex-row items-center px-4 py-2 h-10 rounded-md gap-3 {{ Route::is('dashboard') ? 'bg-primary-muted' : 'hover:bg-gray-100' }}">
                <i class="h-5 w-5" data-lucide="home"></i>
                <span class="text-sm font-medium">Dashboard</span>
            </div>
        </a>

        @foreach ($navigations as $group => $items)
            <div class="flex flex-col gap-2 mt-4">
                <div class="relative mb-4">
                    <div class="absolute bg-[#a7acb2] h-[1px] left-0 top-1/2 -translate-y-1/2 w-4"></div>
                    <h2 class="ml-4 text-xs uppercase text-gray-500 dark:text-gray-400 px-4">{{ $group }}</h2>
                </div>

                @foreach ($items as $key => $nav)
                    <a href="{{ route($nav['route']) }}"
                        class="relative px-4 {{ Route::is($nav['route']) ? 'text-primary' : 'text-gray-700' }}">
                        <div
                            class="absolute right-0 h-full w-1 {{ Route::is($nav['route']) ? 'bg-primary' : 'bg-transparent' }} rounded-l-[6px]">
                        </div>
                        <div
                            class="flex flex-row items-center px-4 py-2 h-10 rounded-md gap-3 {{ Route::is($nav['route']) ? 'bg-primary-muted' : 'hover:bg-gray-100' }}">
                            <i class="h-5 w-5" data-lucide="{{ $nav['icon'] }}"></i>
                            <span class="text-sm font-medium">{{ $nav['label'] }}</span>
                        </div>
                    </a>
                @endforeach
            </div>
        @endforeach
    </div>

</nav>
