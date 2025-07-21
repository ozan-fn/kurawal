<x-layouts.app>
    <div class="p-6 space-y-6 py-6 flex-1 flex flex-col overflow-auto">
        <div>
            <h2 class="font-bold text-2xl text-gray-800 leading-tight">
                {{ __('Posts') }}
            </h2>
        </div>

        <div class="flex flex-1">
            <div class="p-6 overflow-auto bg-white shadow sm:rounded-md flex-1">
                <div class="w-full">
                    <div class="sm:flex sm:items-center">
                        {{-- <div class="sm:flex-auto">
                            <h1 class="text-base font-semibold leading-6 text-gray-900">{{ __('Posts') }}</h1>
                            <p class="mt-2 text-sm text-gray-700">A list of all the {{ __('Posts') }}.</p>
                        </div> --}}
                        <div class="mt-4 sm:mt-0 sm:flex-none">
                            <a href="{{ route('posts.create') }}">
                                <x-button type="button" class="gap-2">
                                    <i class="h-5 w-5" data-lucide="plus"></i>
                                    <span>Tambah Data</span>
                                </x-button>
                            </a>
                        </div>
                    </div>

                    <div class="mt-6 overflow-auto">
                        <table id="my-table" class="display">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            {{-- <tbody> --}}
                            {{-- @foreach ($posts as $index => $post)
                                            <tr class="even:bg-white odd:bg-muted">
                                                <td class="text-sm py-3 border-b px-6">{{ $i + $index + 1 }}</td>
                                                <td class="text-sm py-3 border-b px-6 text-start">
                                                    {{ $post->name }}</td>
                                                <td class="text-sm py-3 border-b px-6 text-start">
                                                    {{ $post->description }}</td>
                                            </tr>
                                        @endforeach --}}
                            {{-- </tbody> --}}
                        </table>
                        {{-- <div class="mt-4">
                                    {{ $posts->links() }}
                                </div> --}}
                    </div>
                </div>
            </div>
        </div>
    </div>

    @push('css')
        {{-- <link rel="stylesheet" href="{{ asset('assets/css/dataTables.dataTables.css') }}"> --}}
    @endpush

    @push('js')
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://cdn.datatables.net/2.3.2/js/dataTables.min.js"></script>

        <script>
            $('#my-table').DataTable({
                processing: true,
                serverSide: true,
                scrollCollapse: true,
                scrollX: true,
                // scrollY: "100vh",
                ajax: "{{ route('posts.index') }}",
                columns: [{
                        data: 'DT_RowIndex',
                        name: 'DT_RowIndex',
                        orderable: false,
                        searchable: false
                    },
                    {
                        data: 'name',
                        name: 'name'
                    },
                    {
                        data: 'description',
                        name: 'description'
                    },
                    {
                        data: 'action',
                        name: 'action',
                        orderable: false,
                        searchable: false
                    }
                ],
                drawCallback: function(settings) {
                    lucide.createIcons();
                },
                language: {
                    search: "",
                    searchPlaceholder: "Ketik untuk mencari..." // Menambahkan placeholder ke dalam input
                }
            });
        </script>
    @endpush

</x-app-layout>
