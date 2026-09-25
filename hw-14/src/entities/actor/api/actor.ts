import { tmdbClient } from '@/shared/api';
import { type ActorResponse, type ActorDetails, type MovieCreditsResponse } from '../model/types';

export const actorApi = {
  getPopular: async (page: number): Promise<ActorResponse> => {
    const { data } = await tmdbClient.get<ActorResponse>('/person/popular', {
      params: { page },
    });
    return data;
  },

  search: async (query: string, page: number): Promise<ActorResponse> => {
    const { data } = await tmdbClient.get<ActorResponse>('/search/person', {
      params: { query, page },
    });
    return data;
  },

  getDetails: async (id: number): Promise<ActorDetails> => {
    const { data } = await tmdbClient.get<ActorDetails>(`/person/${id}`);
    return data;
  },

  getMovieCredits: async (id: number): Promise<MovieCreditsResponse> => {
    const { data } = await tmdbClient.get<MovieCreditsResponse>(`/person/${id}/movie_credits`);
    return data;
  },
};

export const getPopularActors = actorApi.getPopular;
export const searchActors = actorApi.search;
export const getActorDetails = actorApi.getDetails;
export const getActorMovieCredits = actorApi.getMovieCredits;
