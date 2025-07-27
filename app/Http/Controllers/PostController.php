<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Requests\PostRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use Yajra\DataTables\Facades\DataTables;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View | JsonResponse
    {
        return view('post.index');
    }

    public function getData(Request $request): JsonResponse
    {
        // --- Helper functions didefinisikan sebagai closure lokal ---
        $getSqlOperator = function (string $type): string {
            return match ($type) {
                'equals' => '=',
                'notEqual' => '!=',
                'lessThan' => '<',
                'lessThanOrEqual' => '<=',
                'greaterThan' => '>',
                'greaterThanOrEqual' => '>=',
                'contains' => 'LIKE',
                default => '=',
            };
        };

        $applyFilter = function ($query, $colId, $filter) use ($getSqlOperator) {
            switch ($filter['filterType']) {
                case 'text':
                    $operator = $getSqlOperator($filter['type']);
                    $value = ($filter['type'] === 'contains') ? '%' . $filter['filter'] . '%' : $filter['filter'];
                    $query->where($colId, $operator, $value);
                    break;
                case 'number':
                    $operator = $getSqlOperator($filter['type']);
                    $query->where($colId, $operator, $filter['filter']);
                    break;
            }
        };
        // --- Akhir dari helper functions ---


        // 1. Mulai query dengan Eloquent
        $query = Post::query();

        // 2. Terapkan Filter
        $filterModel = $request->input('filterModel', []);
        foreach ($filterModel as $colId => $filter) {
            $applyFilter($query, $colId, $filter);
        }

        // 3. Ambil total baris SETELAH difilter
        $totalCount = $query->count();

        // 4. Terapkan Sorting
        $sortModel = $request->input('sortModel', []);
        foreach ($sortModel as $sort) {
            $query->orderBy($sort['colId'], $sort['sort']);
        }

        // 5. Terapkan Pagination
        $startRow = $request->input('startRow', 0);
        $endRow = $request->input('endRow', 100);
        $limit = $endRow - $startRow;

        $rows = $query->offset($startRow)->limit($limit)->get();

        // 6. Kembalikan data dalam format JSON yang diharapkan AG Grid
        return response()->json([
            'rows' => $rows,
            'lastRow' => $totalCount,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        $post = new Post();

        return view('post.create', compact('post'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request): RedirectResponse
    {
        Post::create($request->validated());

        return Redirect::route('posts.index')
            ->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): View
    {
        $post = Post::find($id);

        return view('post.show', compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id): View
    {
        $post = Post::find($id);

        return view('post.edit', compact('post'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, Post $post): RedirectResponse
    {
        $post->update($request->validated());

        return Redirect::route('posts.index')
            ->with('success', 'Post updated successfully');
    }

    public function destroy($id): RedirectResponse
    {
        Post::find($id)->delete();

        return Redirect::route('posts.index')
            ->with('success', 'Post deleted successfully');
    }
}
