import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  date: string
  slug: string
}

export function BlogCard({ title, excerpt, author, date, slug }: BlogCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all duration-300 transform hover:shadow-lg hover:scale-105 bg-white border border-gray-200 rounded-lg">
      <CardHeader className="p-5">
        <CardTitle className="text-xl font-bold text-[#30323B] leading-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 flex-grow">
        <p className="text-gray-700 text-base mb-4">{excerpt}</p>
      </CardContent>
      <CardFooter className="p-5 flex justify-between items-center border-t border-gray-200">
        <div className="text-sm text-gray-500">
          By {author} on {new Date(date).toLocaleDateString()}
        </div>
        <Link href={`/blog/${slug}`} className="text-primary font-semibold hover:underline">
          Read more
        </Link>
      </CardFooter>
    </Card>
  )
}
