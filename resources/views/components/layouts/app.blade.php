<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- Scripts -->
    @vite(['resources/css/app.css'])

    @stack('css')
</head>

<body class="font-sans antialiased text-[#384551]">
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <!-- Page Content -->
        <main class="pt-16 pl-0 md:pl-64 w-screen h-screen flex flex-col fixed top-0 left-0">
            <div class="overflow-auto flex-1 flex flex-col">
                {{ $slot }}
            </div>
        </main>

        <!-- Page Heading -->
        <header class="fixed w-screen pl-0 md:pl-64">
            <div class="h-16 bg-white dark:bg-gray-800 px-4 flex items-center w-full">
                {{--  --}}
                <div class="ml-auto">{{ Auth::user()->name }}</div>
            </div>
        </header>

        {{-- Sidebar --}}
        @include('components.layouts.sidebar')
    </div>

    @stack('js')
    <script>
        lucide.createIcons();
    </script>
</body>

</html>
