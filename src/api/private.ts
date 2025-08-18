import api from "./axiosConfig";
import { ICollection } from "@/types/collection";

//Collection APIs
export const addCollection = async (collection: Omit<ICollection, "createdAt" | "updatedAt" | "user" | "_id">) => {
    const response = await api.post("/collections", collection);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(response.data.message);
    }
}

export const getCollections = async () => {
    const response = await api.get("/collections");
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(response.data.message);
    }
}
export const getCollection = async (id: string) => {
    const response = await api.get(`/collections/${id}`);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error(response.data.message);
    }
}

