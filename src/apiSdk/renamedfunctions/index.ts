import axios from 'axios';
import queryString from 'query-string';
import { RenamedfunctionInterface, RenamedfunctionGetQueryInterface } from 'interfaces/renamedfunction';
import { GetQueryInterface } from '../../interfaces';

export const getRenamedfunctions = async (query?: RenamedfunctionGetQueryInterface) => {
  const response = await axios.get(`/api/renamedfunctions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRenamedfunction = async (renamedfunction: RenamedfunctionInterface) => {
  const response = await axios.post('/api/renamedfunctions', renamedfunction);
  return response.data;
};

export const updateRenamedfunctionById = async (id: string, renamedfunction: RenamedfunctionInterface) => {
  const response = await axios.put(`/api/renamedfunctions/${id}`, renamedfunction);
  return response.data;
};

export const getRenamedfunctionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/renamedfunctions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRenamedfunctionById = async (id: string) => {
  const response = await axios.delete(`/api/renamedfunctions/${id}`);
  return response.data;
};
