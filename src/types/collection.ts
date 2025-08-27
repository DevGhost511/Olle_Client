export interface ICollection {
    _id: string;
    name: string;
    category: string;
    valuation: {min: number, max: number};
    description: string;
    imageURL: string;
    user: string;
    categories: { name: string, value: string }[];
    threadId: string;
    createdAt: Date;
    updatedAt: Date;
    price: number[];
    rarerate: number;
}