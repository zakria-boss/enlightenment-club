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
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          By {author} on {new Date(date).toLocaleDateString()}
        </div>
        <Link href={`/blog/${slug}`} className="text-primary hover:underline">
          Read more
        </Link>
      </CardFooter>
    </Card>
  )
}