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


