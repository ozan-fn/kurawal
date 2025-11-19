import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { ArrowLeft } from "lucide-react";

export default function CreatePost() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await api.post("/posts", { title, content });
			navigate("/posts");
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to create post");
		}
	};

	return (
		<div className="container mx-auto max-w-2xl p-6">
			<div className="mb-6">
				<Button variant="ghost" asChild className="mb-4">
					<a href="/posts">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Posts
					</a>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Create New Post</CardTitle>
					<CardDescription>Share your thoughts with the community</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="title">Title</Label>
							<Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Enter post title" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="content">Content</Label>
							<Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Write your post content here..." rows={6} />
						</div>
						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<Button type="submit" className="w-full">
							Create Post
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
