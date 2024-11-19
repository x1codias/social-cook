import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dispatch } from 'redux';

const useFetchData = (
  getFunction: () => (dispatch: Dispatch) => Promise<void>
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
      await dispatch(getFunction());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setInitialLoading(false);
      isFetchingRef.current = false;
    }
  }, [dispatch]);

  // Effect for fetching data on mount
  useEffect(() => {
    getData();
  }, [getData]);

  return { initialLoading };
};

export default useFetchData;
