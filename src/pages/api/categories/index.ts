import type { APIRoute } from 'astro';
import { getAllCategories } from '../../../lib/storage';

export const GET: APIRoute = async () => {
  const categories = await getAllCategories();
  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
