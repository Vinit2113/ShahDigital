const CataloguePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  loading,
}) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  



  return (
    <>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2 px-2">
        <button
          className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            disabled={loading}
            onClick={() => onPageChange(i + 1)}
            className={`rounded-lg px-3 py-1 text-sm transition ${
              currentPage === i + 1
                ? "bg-blue-950 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="rounded-lg border px-3 py-1 text-sm disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CataloguePagination;
