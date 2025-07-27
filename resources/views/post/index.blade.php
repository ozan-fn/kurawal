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
                        <div id="myGrid" class="ag-theme-quartz" style="height: 600px; width: 100%;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @push('css')
        {{-- CUKUP SATU FILE CSS TEMA MODERN --}}
        <link href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-quartz.css" rel="stylesheet" />
    @endpush

    @push('js')
        {{-- MEMUAT LIBRARY AG GRID COMMUNITY --}}
        <script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js" defer></script>

        {{-- JIKA ANDA MENGGUNAKAN LUCIDE ICONS, PASTIKAN LIBRARY-NYA JUGA DIMUAT --}}
        {{-- <script src="https://cdn.jsdelivr.net/npm/lucide@latest"></script> --}}

        <script>
            document.addEventListener('DOMContentLoaded', function() {

                 const columnDefs = [
    {
        headerName: 'NO',
        valueGetter: 'node.rowIndex + 1',
        width: 80,
        pinned: 'left',
        sortable: false,
        filter: false
    },
    {
        headerName: 'NAME',
        field: 'name',
        filter: 'agTextColumnFilter',
        minWidth: 150
    },
    {
        headerName: 'DESCRIPTION',
        field: 'description',
        filter: 'agTextColumnFilter',
        minWidth: 250
    },
    {
        headerName: '⋮',
        pinned: 'right',
        width: 100,
        field: 'actions',
        sortable: false,
        filter: false,
        suppressHeaderMenuButton: true, // Gantikan suppressMenu
        cellRenderer: (params) => {
            if (!params.data || !params.data.id) return '';

            const editUrl = `{{ url('posts') }}/${params.data.id}/edit`;
            const deleteUrl = `{{ url('posts') }}/${params.data.id}`;
            const csrfToken = '{{ csrf_token() }}';

            const container = document.createElement('div');
            container.className = "flex items-center gap-2";
            container.innerHTML = `
                <a href="${editUrl}" title="Edit">
                    <i class="w-5 h-5 text-blue-600" data-lucide="file-pen-line"></i>
                </a>
                <form action="${deleteUrl}" method="POST" onsubmit="return confirm('Yakin ingin menghapus data ini?');" style="display:inline;">
                    <input type="hidden" name="_token" value="${csrfToken}">
                    <input type="hidden" name="_method" value="DELETE">
                    <button type="submit" class="bg-transparent border-none p-0 cursor-pointer" title="Hapus">
                        <i class="w-5 h-5 text-red-600" data-lucide="trash-2"></i>
                    </button>
                </form>
            `;
            return container;
        }
    }
];

                // Opsi Grid (Grid Options) untuk Client-Side
                const gridOptions = {
                    columnDefs: columnDefs,
                rowModelType: 'infinite',
                pagination: true,
                paginationPageSize: 20,
                cacheBlockSize: 20,
                animateRows: true,
                defaultColDef: {
                    sortable: true,
                    filter: true,
                    floatingFilter: true,
                    resizable: true,
                },
                    datasource: {
                        getRows: (params) => {

                            fetch("{{ route('posts.data') }}", {
                                    method: 'post',
                                    body: JSON.stringify(params),
                                    credentials: 'include',
                                    headers: {
                                        "Content-Type": "application/json",
                                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                                    }
                                })
                                .then(httpResponse => httpResponse.json())
                                .then(response => {
                                    // Berikan data ke grid jika berhasil
                                    params.successCallback(response.rows, response.lastRow);
                                })
                                .catch(error => {
                                    console.error(error);
                                    // Beritahu grid jika gagal
                                    // params.failCallback();
                                });
                        }
                    },
                    // Panggil createIcons setiap kali baris dirender ulang (opsional, tapi bagus untuk filter/sort)
                    onRowDataUpdated: () => {
                        if (typeof lucide !== 'undefined') {
                            setTimeout(() => lucide.createIcons(), 0);
                        }
                    },
                };

                // Buat Grid
                const gridDiv = document.querySelector('#myGrid');
                agGrid.createGrid(gridDiv, gridOptions);
            });
        </script>
    @endpush
</x-layouts.app>
