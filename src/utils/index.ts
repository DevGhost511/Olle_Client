export const compressImage = async (file: File): Promise<File> => {
    const targetSizeKB = 250;
    const targetSizeBytes = targetSizeKB * 1024;
    
    // If file is already smaller than target, return original
    if (file.size <= targetSizeBytes) {
        return file;
    }

    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const img = new Image();

        img.onload = () => {
            // Calculate new dimensions maintaining aspect ratio
            let { width, height } = img;
            const maxDimension = 1920; // Maximum width or height
            
            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = (height * maxDimension) / width;
                    width = maxDimension;
                } else {
                    width = (width * maxDimension) / height;
                    height = maxDimension;
                }
            }

            canvas.width = width;
            canvas.height = height;
            
            // Draw image on canvas
            ctx.drawImage(img, 0, 0, width, height);

            // Try different quality levels to get under target size
            const tryCompress = (quality: number) => {
                canvas.toBlob((blob) => {
                    if (blob && blob.size <= targetSizeBytes || quality <= 0.1) {
                        // Convert blob to file
                        const compressedFile = new File([blob!], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        resolve(compressedFile);
                    } else {
                        // Try with lower quality
                        tryCompress(quality - 0.1);
                    }
                }, 'image/jpeg', quality);
            };

            // Start with 90% quality
            tryCompress(0.9);
        };

        img.src = URL.createObjectURL(file);
    });
};