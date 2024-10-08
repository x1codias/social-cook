import Unit from '../models/unit.model';

export const getUnitsService = async (
  offset: number,
  limit: number
) => {
  const { count, rows } = await Unit.findAndCountAll({
    offset,
    limit,
  });

  return {
    total: count,
    units: rows.map(row => row.dataValues),
  };
};
