import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function HospitalPagination({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) {
  const getPages = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1)

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push("...")
    }
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        variant="outline"
        size="sm"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Prev
      </Button>

      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={i} className="px-2">
            •••
          </span>
        ) : (
          <Button
            key={i}
            onClick={() => onPageChange(page as number)}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            disabled={isLoading}
            // className={`${currentPage === page ? "bg-teal-400 text-white hover:bg-teal-700" : ""}`}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        variant="outline"
        size="sm"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>

      <span className="text-sm text-muted-foreground ml-4">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  )
}
