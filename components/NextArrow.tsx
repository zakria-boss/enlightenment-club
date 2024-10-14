import { ChevronRight } from "lucide-react"

interface ArrowProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>
  }

  const NextArrow = ({ onClick }: ArrowProps) => (
    <div
      className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-30 cursor-pointer transition-transform duration-300 hover:scale-110"
      onClick={onClick}
    >
      <div className="bg-[#EEAE13] p-3 rounded-full shadow-lg hover:bg-[#d99d11] transition-colors duration-300">
        <ChevronRight size={24} color="white" />
      </div>
    </div>
  )

  export default NextArrow;