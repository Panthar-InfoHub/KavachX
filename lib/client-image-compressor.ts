/**
 * Client-side browser image pre-compression utility.
 * Downscales oversized camera/mobile photos (>2MB) using HTMLCanvasElement
 * to max 2400px width/height and quality 0.85 before uploading to server.
 */
export async function compressImageBeforeUpload(file: File): Promise<File> {
  // If file is smaller than 2MB or not an image, no client pre-compression needed
  if (!file.type.startsWith("image/") || file.size <= 2 * 1024 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const MAX_WIDTH = 2400;
        const MAX_HEIGHT = 2400;

        let width = img.width;
        let height = img.height;

        // Calculate proportional dimensions
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Determine output type (prefer WebP, fallback to JPEG)
        const outputMime = file.type === "image/png" ? "image/png" : "image/webp";

        canvas.toBlob(
          (blob) => {
            if (blob && blob.size < file.size) {
              const compressedFile = new File([blob], file.name, {
                type: blob.type || outputMime,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              // Return original file if compression didn't reduce size
              resolve(file);
            }
          },
          outputMime,
          0.85
        );
      };

      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
