import { Dispatch } from 'redux';
import axios from 'axios';
import { GET_UNITS } from './types';

export const getUnits =
  (limit: number, offset: number) =>
  async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + '/units',
        {
          params: {
            limit: limit.toString(),
            offset: offset.toString(),
          },
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({
        type: GET_UNITS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
