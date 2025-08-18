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

export const imageIdentify = async (threadId: string | null, prompt: string, image_url: string) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/image-identify`, {
        threadId,
        image_url,
        prompt
    });
    return res.data;
}

export const olleAIChatStream = (threadId: string | null, prompt: string, onMessage: (msg: string) => void, onStatus: (status: string) => void, onEnd: () => void) => {
    if (!threadId) {
        console.error('ThreadID is required for AI chat stream');
        onEnd();
        return null;
    }
    
    const url = `${process.env.NEXT_PUBLIC_API_URL}/olle-chat?threadId=${encodeURIComponent(threadId)}&prompt=${encodeURIComponent(prompt)}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
        if (event.data === '[DONE]') {
            eventSource.close();
            onEnd();
        } else {
            try {
                const parsed = JSON.parse(event.data);
                if (parsed.event === "thread.message.in_progress") {
                    // Assistant is preparing, show loading
                    onStatus("in_progress");
                } else if (parsed.event === "thread.message.delta") {
                    const text = parsed?.data?.delta?.content?.[0]?.text?.value;
                    if (text) {
                        onMessage(text);
                    }
                }
            } catch (e) {
                // Optionally handle parse errors
                console.error('Failed to parse SSE chunk:', e, event.data);
            }
        }
    };

    eventSource.onerror = () => {
        eventSource.close();
        onEnd();
    };

    return eventSource;
};

export const getChats = async (threadId: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chats/${threadId}`);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(response.data.message);
    }
}
