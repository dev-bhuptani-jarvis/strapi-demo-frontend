export interface Category {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface CategoryWithProducts extends Category {
    categories: Category[];
}

export interface CategoriesResponse {
    data: Category[];
}

export interface CategoryDetails {
    categories: CategoryDetail[];
}

export interface CategoryDetail {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    description: object[];
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    shortDescription: string;
}