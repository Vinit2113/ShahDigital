// @ts-ignore
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-10 px-2">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded-lg border border-blue-100 text-blue-900 disabled:opacity-40 hover:bg-blue-50"
      >
        Prev
      </button>

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg border transition ${
            currentPage === page
              ? "bg-[#0a54ff] text-white border-[#0a54ff]"
              : "border-blue-100 text-blue-900 hover:bg-blue-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded-lg border border-blue-100 text-blue-900 disabled:opacity-40 hover:bg-blue-50"
      >
        Next
      </button>
    </div>
  );
};

// @ts-ignore
// const LoadMore = ({ onLoadMore, loading }) => {
//   return (
//     <div className="flex justify-center mt-10">
//       <button
//         onClick={onLoadMore}
//         disabled={loading}
//         className="px-8 py-3 bg-[#0a54ff] text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {loading ? "Loading..." : "Load More"}
//       </button>
//     </div>
//   );
// };

export default Pagination;
