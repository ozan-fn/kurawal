import axios from "axios";
import { status } from "nprogress";

export async function uploadMedia(file: File, onProgress: (file: File, progress: number) => void) {
	try {
		const fileType = file.name.split(".").pop();
		const baseName = file.name.replace(/\.[^/.]+$/, "");
		const safeBase = baseName
			.toLocaleLowerCase()
			.replace(/[^a-z0-9-_]+/g, "-")
			.replace(/^-+|-+$/g, "");

		const unique = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2, 10);

		const public_id = `${safeBase}-${Date.now}-${unique}.${fileType}`;
		const result = await axios.post("/api/media/signature", {
			public_id: public_id,
			folder: "media",
			status: "uploaded",
		});

		const form = new FormData();

		form.append("file", file);
		form.append("timestamp", result.data.timestamp);
		form.append("signature", result.data.signature);
		form.append("api_key", result.data.api_key);
		form.append("folder", result.data.folder);
		form.append("public_id", result.data.public_id);

		await axios.post(`https://api.cloudinary.com/v1_1/${result.data.cloud_name}/auto/upload`, form, {
			onUploadProgress(progressEvent) {
				if (progressEvent.total) {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					onProgress(file, percentCompleted);
				}
			},
		});

		return true;
	} catch (error) {
		return false;
	}
}
