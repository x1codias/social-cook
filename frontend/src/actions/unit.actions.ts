import { Dispatch } from 'redux';
import axios from 'axios';
import { GET_UNITS } from './types';

export const getUnits =
  (limit: number, offset: number) =>
  async (dispatch: Dispatch) => {
    try {
      const userToken = localStorage.getItem('token');
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + '/units',
        {
          params: {
            limit: limit.toString(),
            offset: offset.toString(),
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      dispatch({
        type: GET_UNITS,
        payload: response.data.units,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
