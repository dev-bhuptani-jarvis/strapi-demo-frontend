/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    getBlogBySlug,
    getBlogs,
} from "services/blog.service";

import {
    Blog,
    BlogsResponse,
} from "types/blog.types";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const blogs: BlogsResponse = await getBlogs();

    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export default async function BlogDetailPage({
    params,
}: Props) {
    const { slug } = await params;

    const blog: Blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-100">
            {/* Hero Image */}
            <section className="relative h-[500px] w-full">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.Image?.[0]?.url}`}
                    alt={blog.Title}
                    fill
                    unoptimized
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-10 left-10 max-w-4xl text-white">
                    <h1 className="mt-6 text-6xl font-bold leading-tight">
                        {blog.Title}
                    </h1>

                    <p className="mt-4 text-lg text-gray-200">
                        Published on{" "}
                        {new Date(
                            blog.createdAt
                        ).toLocaleDateString()}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="mx-auto max-w-5xl px-6 py-16">
                {/* Breadcrumb */}
                <div className="mb-10 text-sm text-gray-500">
                    <Link href="/">
                        Home
                    </Link>

                    <span className="mx-2">
                        /
                    </span>

                    <Link href="/blogs">
                        Blogs
                    </Link>

                    <span className="mx-2">
                        /
                    </span>

                    <span>{blog.Title}</span>
                </div>

                {/* Short Description */}
                {blog.shortDescription && (
                    <div className="mb-10 rounded-2xl bg-white p-8 shadow-sm">
                        <p className="text-2xl leading-10 text-gray-700">
                            {
                                blog.shortDescription
                            }
                        </p>
                    </div>
                )}

                {/* Main Content */}
                <div className="rounded-2xl bg-white p-10 shadow-sm">
                    <div className="prose prose-lg max-w-none">
                        {blog.Description?.map(
                            (
                                block,
                                index
                            ) => {
                                if (
                                    block.type ===
                                    "heading"
                                ) {
                                    const text =
                                        block.children
                                            ?.map(
                                                (
                                                    child
                                                ) =>
                                                    "text" in
                                                        child
                                                        ? child.text
                                                        : ""
                                            )
                                            .join(
                                                ""
                                            );

                                    if (
                                        block.level ===
                                        1
                                    ) {
                                        return (
                                            <h1
                                                key={
                                                    index
                                                }
                                                className="mt-8 text-5xl font-bold text-black"
                                            >
                                                {
                                                    text
                                                }
                                            </h1>
                                        );
                                    }

                                    if (
                                        block.level ===
                                        2
                                    ) {
                                        return (
                                            <h2
                                                key={
                                                    index
                                                }
                                                className="mt-8 text-4xl font-bold text-black"
                                            >
                                                {
                                                    text
                                                }
                                            </h2>
                                        );
                                    }

                                    return (
                                        <h3
                                            key={
                                                index
                                            }
                                            className="mt-8 text-3xl font-bold text-black"
                                        >
                                            {
                                                text
                                            }
                                        </h3>
                                    );
                                }

                                if (
                                    block.type ===
                                    "paragraph"
                                ) {
                                    return (
                                        <p
                                            key={
                                                index
                                            }
                                            className="mt-5 text-lg leading-9 text-gray-700"
                                        >
                                            {block.children
                                                ?.map(
                                                    (
                                                        child
                                                    ) =>
                                                        "text" in
                                                            child
                                                            ? child.text
                                                            : ""
                                                )
                                                .join(
                                                    ""
                                                )}
                                        </p>
                                    );
                                }

                                if (
                                    block.type ===
                                    "list"
                                ) {
                                    return (
                                        <ul
                                            key={
                                                index
                                            }
                                            className="mt-6 list-disc space-y-3 pl-6"
                                        >
                                            {block.children?.map(
                                                (
                                                    item: any,
                                                    itemIndex: number
                                                ) => (
                                                    <li
                                                        key={
                                                            itemIndex
                                                        }
                                                        className="text-lg text-gray-700"
                                                    >
                                                        {item.children?.map(
                                                            (
                                                                child: { text: string }
                                                            ) =>
                                                                child.text
                                                        )}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    );
                                }

                                return null;
                            }
                        )}
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-10">
                    <Link
                        href="/blogs"
                        className="inline-block rounded-xl bg-black px-6 py-3 text-white"
                    >
                        ← Back To Blogs
                    </Link>
                </div>
            </section>
        </main>
    );
}
