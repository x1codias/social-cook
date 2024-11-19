import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dispatch } from 'redux';
import useInfiniteLoading from './useInfiniteLoading';

const useFetchDataInfinite = (
  getFunction: (
    limit: number,
    offset: number
  ) => (dispatch: Dispatch) => Promise<void>,
  scrollData: any
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [initialLoading, setInitialLoading] =
    useState(true);
  const isFetchingRef = useRef(false);

  const getData = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setInitialLoading(true);

    try {
      await dispatch(
        getFunction(scrollData.limit, scrollData.offset)
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setInitialLoading(false);
      isFetchingRef.current = false;
    }
  }, [dispatch, scrollData]);

  // Effect for fetching data on mount
  useEffect(() => {
    getData();
  }, [getData]);

  const { infiniteLoading } = useInfiniteLoading(
    getData,
    scrollData
  );

  return { initialLoading, infiniteLoading };
};

export default useFetchDataInfinite;
