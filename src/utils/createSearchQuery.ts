import { type IQuery } from '../schemes/meetup/interfaces';
import { generateQueryValues } from './generateQueryValues';

export const createSearchQuery = (queries: IQuery) => {
  const { to, from, sort } = queries;
  let query = generateQueryValues(queries);

  if (query && (from || to)) {
    query += ' AND ';
  }

  if (from && !to) {
    query += `timestamps > '${from}'`;
  }

  if (!from && to) {
    query += `timestamps < '${to}'`;
  }

  if (from && to) {
    query += `timestamps BETWEEN '${new Date(
      from
    ).toISOString()}' AND '${new Date(to).toISOString()}'`;
  }

  if (query) {
    return `SELECT * FROM meetups WHERE ${query}`;
  }

  return `SELECT * FROM meetups ${sort ? `ORDER BY ${sort}` : 'ORDER BY id'}`;
};
