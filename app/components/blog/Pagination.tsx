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
    <div className="flex justify-center items-center gap-4 mt-16 py-8 max-[768px]:gap-3">
      <button
        className="flex items-center gap-2 font-sans text-[0.95rem] font-medium text-foreground bg-white border border-[#e5e5e5] rounded-[0.625rem] px-5 py-3 cursor-pointer transition-all duration-200 hover:bg-surface hover:border-cta hover:text-cta disabled:opacity-40 disabled:cursor-not-allowed max-[768px]:text-[0.875rem] max-[768px]:px-4 max-[768px]:py-[0.625rem] max-[480px]:px-[0.625rem]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg
          className="w-[18px] h-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span className="max-[480px]:hidden">Previous</span>
      </button>

      <div className="flex items-center gap-2 max-[480px]:gap-[0.375rem]">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="font-sans text-foreground/40 px-2"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`font-sans text-[0.95rem] font-medium border rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 max-[768px]:w-9 max-[768px]:h-9 max-[768px]:text-[0.875rem] max-[480px]:w-8 max-[480px]:h-8 max-[480px]:text-[0.8rem] ${
                currentPage === page
                  ? "bg-cta border-cta text-white"
                  : "bg-white border-[#e5e5e5] text-foreground/60 hover:bg-surface hover:border-cta hover:text-cta"
              }`}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className="flex items-center gap-2 font-sans text-[0.95rem] font-medium text-foreground bg-white border border-[#e5e5e5] rounded-[0.625rem] px-5 py-3 cursor-pointer transition-all duration-200 hover:bg-surface hover:border-cta hover:text-cta disabled:opacity-40 disabled:cursor-not-allowed max-[768px]:text-[0.875rem] max-[768px]:px-4 max-[768px]:py-[0.625rem] max-[480px]:px-[0.625rem]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="max-[480px]:hidden">Next</span>
        <svg
          className="w-[18px] h-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
