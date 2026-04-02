"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++)
          pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-16 py-8">
      <button
        className="flex items-center gap-2 font-primary text-[0.85rem] font-bold text-orange bg-white border border-orange/20 rounded-xl px-5 py-3 cursor-pointer transition-all duration-300 hover:bg-orange hover:text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-orange/5"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg
          className="w-[18px] h-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="max-sm:hidden uppercase tracking-wider">Previous</span>
      </button>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="font-primary text-text-muted px-2"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`font-primary text-[0.85rem] font-bold border rounded-xl w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                currentPage === page
                  ? "bg-orange border-orange text-white shadow-md scale-110"
                  : "bg-white border-black/5 text-text-secondary hover:border-orange/40 hover:text-orange"
              }`}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className="flex items-center gap-2 font-primary text-[0.85rem] font-bold text-orange bg-white border border-orange/20 rounded-xl px-5 py-3 cursor-pointer transition-all duration-300 hover:bg-orange hover:text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-orange/5"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="max-sm:hidden uppercase tracking-wider">Next</span>
        <svg
          className="w-[18px] h-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
