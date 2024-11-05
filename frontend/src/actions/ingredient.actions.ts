import { Dispatch } from 'redux';
import axios from 'axios';
import {
  GET_INGREDIENTS,
  CREATE_INGREDIENT,
} from './types';

export const getIngredients =
  (limit: number, offset: number) =>
  async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + '/ingredients',
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
        type: GET_INGREDIENTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const createIngredient =
  (name: string) => async (dispatch: Dispatch) => {
    try {
      const userToken = JSON.parse(
        localStorage.getItem('token') as string
      );
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/ingredients',
        { name },
        {
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        }
      );
      dispatch({
        type: CREATE_INGREDIENT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
