import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "services/blog.service";

import { Blog, BlogsResponse } from "types/blog.types";

export default async function BlogsPage() {
    const response: BlogsResponse = await getBlogs();

    const blogs: Blog[] = response || [];

    return (
        <main className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold">
                        Latest Blogs
                    </h1>

                    <p className="mt-3 text-gray-500 text-lg">
                        Read latest articles from our ecommerce platform
                    </p>
                </div>

                {/* Blogs */}
                {blogs.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center">
                        No blogs found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog: Blog) => {
                            const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.Image[0].url}`

                            return (
                                <Link
                                    href={`/blogs/${blog.slug}`}
                                    key={blog.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                                >
                                    {/* Image */}
                                    <div className="relative h-[250px] w-full bg-gray-200">
                                        <Image
                                            src={imageUrl}
                                            alt={blog.Title}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm text-gray-400">
                                                {new Date(
                                                    blog.createdAt
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl font-bold line-clamp-2">
                                            {blog.Title}
                                        </h2>

                                        <p className="mt-4 text-gray-600 line-clamp-3">
                                            {blog.shortDescription}
                                        </p>

                                        <div className="mt-6">
                                            <span className="font-semibold">
                                                Read More →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
