/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    focalPoint: string | null;
    width: number | null;
    height: number | null;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ProductCategory {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface ProductDescriptionChild {
    type: string;
    text: string;
}

export interface ProductDescriptionBlock {
    type: string;
    children: ProductDescriptionChild[];
}

export interface Product {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    description: ProductDescriptionBlock[];
    price: number;
    shortDescription: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images: ProductImage;
    products: ProductCategory;
}

export interface ProductsResponse {
    data: Product[];
}