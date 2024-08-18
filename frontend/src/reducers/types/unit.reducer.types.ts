import { GET_UNITS } from '../../actions/types';
import { Unit } from '../../types/Unit';

export interface UnitState {
  scrollData: {
    units: Unit[] | [];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface UnitPayload {
  units: Unit[] | [];
  total: number;
}

interface GetUnitsAction {
  type: typeof GET_UNITS;
  payload: UnitPayload;
}

export type UnitActionTypes = GetUnitsAction;
