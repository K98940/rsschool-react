import api from '@/api/api';
import { LoaderFunction } from 'react-router-dom';

export const episodeLoader: LoaderFunction = async ({ params }) => {
  const response = await api.getEpisode(params?.episodeId || '');
  return response;
};
