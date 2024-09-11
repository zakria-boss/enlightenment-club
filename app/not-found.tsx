import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#30323B] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-[#30323B] mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="bg-[#EEAE13] text-[#30323B] font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}