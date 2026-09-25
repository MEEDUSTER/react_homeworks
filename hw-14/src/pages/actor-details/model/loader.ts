import { type LoaderFunctionArgs } from 'react-router-dom';

export const actorDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const actorId = params.actorId;
  if (!actorId || isNaN(Number(actorId))) {
    throw new Response('Некоректний ID актора', { status: 400 });
  }
  return { actorId: Number(actorId) };
};
