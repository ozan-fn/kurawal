@props([
    'as' => 'button',
    'href' => '#',
    'type' => 'button',
    'variant' => 'primary',
    'icon' => null,
    'size' => 'default', // 1. Tambahkan prop 'size'
])

@php
    // 2. Hapus class ukuran (px, py, text-sm) dari sini agar dinamis
    $baseClasses =
        'inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none transition-colors';

    // Array $variants dengan shadow (tidak ada perubahan di sini)
    $variants = [
        'primary' =>
            'text-white bg-[#696cff] border border-[#696cff] shadow-[0_2px_4px_rgba(105,108,255,0.4)] hover:bg-[#5d61e8]',
        'secondary' =>
            'text-white bg-gray-500 border border-gray-500 shadow-[0_2px_4px_rgba(107,114,128,0.4)] hover:bg-gray-600',
        'danger' =>
            'text-white bg-red-600 border border-red-600 shadow-[0_2px_4px_rgba(220,38,38,0.4)] hover:bg-red-700',
        'success' =>
            'text-white bg-green-600 border border-green-600 shadow-[0_2px_4px_rgba(22,163,74,0.4)] hover:bg-green-700',
    ];

    // 3. Buat logika baru untuk kelas ukuran
    $sizeClasses = match ($size) {
        'sm' => 'py-1 px-3',
        'lg' => 'h-11 px-8',
        'icon' => 'h-10 w-10',
        default => 'h-10 px-4 py-2',
    };

    // Gabungkan semua kelas
    $classes = "$baseClasses {$variants[$variant]} $sizeClasses";
@endphp

@if ($as === 'a')
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $classes]) }}>
        @if ($icon)
            {{-- 4. Sesuaikan margin ikon jika sizenya 'icon' --}}
            <i data-lucide="{{ $icon }}" class="{{ $size === 'icon' ? '' : 'mr-2' }} h-4 w-4"></i>
        @endif
        {{-- Jangan tampilkan teks jika sizenya 'icon' --}}
        @if ($size !== 'icon')
            {{ $slot }}
        @endif
    </a>
@else
    <button type="{{ $type }}" {{ $attributes->merge(['class' => $classes]) }}>
        @if ($icon)
            {{-- 4. Sesuaikan margin ikon jika sizenya 'icon' --}}
            <i data-lucide="{{ $icon }}" class="{{ $size === 'icon' ? '' : 'mr-2' }} h-4 w-4"></i>
        @endif
        {{-- Jangan tampilkan teks jika sizenya 'icon' --}}
        @if ($size !== 'icon')
            {{ $slot }}
        @endif
    </button>
@endif
