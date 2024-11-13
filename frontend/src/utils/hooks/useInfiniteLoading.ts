import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

const useInfiniteLoading = (
  getFunction: () => Promise<void>,
  scrollData: any
) => {
  const [infiniteLoading, setInfiniteLoading] =
    useState(false);

  const handleScroll = useCallback(
    debounce(() => {
      const isAtBottom =
        window.innerHeight +
          document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10;

      if (
        isAtBottom &&
        !infiniteLoading &&
        scrollData.hasMore
      ) {
        setInfiniteLoading(true);
        getFunction();
        setInfiniteLoading(false);
      }
    }, 200),
    [infiniteLoading, scrollData, getFunction]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { infiniteLoading };
};

export default useInfiniteLoading;
