import { ChevronLeft, ChevronRight } from "lucide-react";

const AdminPostPagination = ({ query, setQuery, pagination }) => {
  const handlePrev = () => {
    if (query.page > 1) {
      setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };
  const handleNext = () => {
    if (query.page < pagination.totalPages) {
      setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };
  return (
    <div className="w-full my-10 flex justify-center gap-7 flex-wrap">
      <button
        onClick={handlePrev}
        className="cursor-pointer disabled:hidden "
        disabled={query.page === 1}
      >
        <ChevronLeft />
      </button>
      <span>
        Page {pagination.currentPage} of {pagination.totalPages}{" "}
      </span>
      <button
        onClick={handleNext}
        className="cursor-pointer disabled:hidden"
        disabled={query.page === pagination.totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default AdminPostPagination;
