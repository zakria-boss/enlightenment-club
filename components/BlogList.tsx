import { Blog } from '@prisma/client'
import { BlogCard } from './BlogCard'

interface BlogListProps {
  blogs: Blog[]
}

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          excerpt={blog.content.substring(0, 150) + '...'}
          author={blog.author}
          date={new Date(blog.publishedAt).toISOString()}
          slug={blog.slug}
        />
      ))}
    </div>
  )
}
