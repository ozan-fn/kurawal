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
        if ($request->ajax()) {
            $data = Post::query();
            return DataTables::eloquent($data)
                ->addIndexColumn()
                ->addColumn('action', function ($row) {
                    $showBtn = view('components.button', [
                        'as' => 'a',
                        'href' => route('posts.show', $row->id),
                        'variant' => 'secondary',
                        'icon' => 'eye', // Ikon mata dari Lucide
                        'size' => 'sm',
                    ])->with('slot', 'Lihat')->render();

                    $editBtn = view('components.button', [
                        'as' => 'a',
                        'href' => route('posts.edit', $row->id),
                        'variant' => 'primary',
                        'icon' => 'edit-3',
                        'size' => 'sm',
                    ])->with('slot', 'Edit')->render();

                    $deleteUrl = route('posts.destroy', $row->id);
                    $deleteBtn = view('components.button', [
                        'type' => 'submit',
                        'variant' => 'danger',
                        'icon' => 'trash-2',
                        'size' => 'sm',
                        'onclick' => "return confirm('Anda yakin ingin menghapus data ini?')"
                    ])->with('slot', 'Hapus')->render();
                    $deleteForm = '<form action="' . $deleteUrl . '" method="POST" class="inline-block">' .
                        csrf_field() . method_field('DELETE') . $deleteBtn . '</form>';

                    return '<div class="flex items-center gap-2">' . $showBtn . $editBtn . $deleteForm . '</div>';
                })
                ->editColumn('description', function ($row) {
                    $shortText = Str::limit($row->description, 100, '...');
                    return e($shortText);
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('post.index');
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
