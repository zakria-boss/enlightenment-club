import { BlogCard } from './BlogCard'

interface Blog {
  id: string
  title: string
  content: string
  author: string
  publishedAt: string
  slug: string
}

interface BlogListProps {
  blogs: Blog[]
}

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          title={blog.title}
          excerpt={blog.content.substring(0, 150) + '...'}
          author={blog.author}
          date={blog.publishedAt}
          slug={blog.slug}
        />
      ))}
    </div>
  )
}