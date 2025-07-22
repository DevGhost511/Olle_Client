import axios from 'axios';

export const fileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export const imageIdentify = async (imageUrl: string, prompt: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/openai/image-identify`, {
        imageUrl,
        prompt
    });
    return res.data;
}

export const olleAIChat = async (prompt: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/olle-chat`, {
        prompt
    });
    return res.data;
}
