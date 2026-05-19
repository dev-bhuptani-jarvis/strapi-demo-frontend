// types/blog.types.ts

export interface BlogContentChild {
    type: string;
    text: string;
}

export interface BlogContentBlock {
    type: string;
    level?: number;
    format?: string;
    children: (
        | BlogContentChild
        | {
            type: string;
            children: BlogContentChild[];
        }
    )[];
}

export interface BlogImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

export interface BlogImageFormats {
    thumbnail?: BlogImageFormat;
    small?: BlogImageFormat;
    medium?: BlogImageFormat;
    large?: BlogImageFormat;
}

export interface BlogImage {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    focalPoint: string | null;
    width: number;
    height: number;
    formats: BlogImageFormats;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Blog {
    id: number;
    documentId: string;
    Title: string;
    slug: string;
    Description: BlogContentBlock[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    shortDescription: string | null;
    Image: BlogImage[];
}

export type BlogsResponse = Blog[];