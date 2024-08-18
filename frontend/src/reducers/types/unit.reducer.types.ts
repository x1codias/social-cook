import { GET_UNITS } from '../../actions/types';
import { Unit } from '../../types/Unit';

export interface UnitState {
  units: Unit[] | [];
}

export interface UnitPayload {
  units: Unit[];
}

interface GetUnitsAction {
  type: typeof GET_UNITS;
  payload: UnitPayload;
}

export type UnitActionTypes = GetUnitsAction;
