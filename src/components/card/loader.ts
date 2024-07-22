import { LoaderFunctionArgs } from 'react-router-dom';

type episodeLoaderParams = (p: LoaderFunctionArgs) => string;

export const episodeLoader: episodeLoaderParams = ({ params }) => params.episodeId || '';
