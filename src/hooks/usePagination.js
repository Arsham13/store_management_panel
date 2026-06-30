import { useState } from "react";

export function usePagination(initialPage = 1, initialPageSize = 10) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (num) => setPage(num);

  const changePageSize = (size) => {
    setPageSize(size);
    setPage(1);
  };

  return {
    page,
    pageSize,
    nextPage,
    prevPage,
    goToPage,
    setPageSize: changePageSize,
  };
}
