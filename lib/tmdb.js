const API_KEY = process.env.TMDB_API_KEY;
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = process.env.TMDB_BASE_URL;

console.log('BASE_URL:', BASE_URL); // Añade esto para depuración
console.log('ACCESS_TOKEN:', ACCESS_TOKEN ? 'Token present' : 'Token missing');

async function fetchFromTMDB(endpoint) {
  try {
    if (!BASE_URL) {
      throw new Error('BASE_URL is not defined');
    }

    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}language=es-ES`;
    console.log('Fetching URL:', url); // Añade esto para depuración

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cachea por 1 hora
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching data: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('TMDB Fetch Error:', error);
    return { results: [] }; // Retorna un objeto vacío para evitar errores
  }
}

export async function getPopularMovies(page = 1) {
  return fetchFromTMDB(`/movie/popular?page=${page}`);
}

export async function getTopRatedMovies(page = 1) {
  return fetchFromTMDB(`/movie/top_rated?page=${page}`);
}

export async function getLatestMovies(page = 1) {
  return fetchFromTMDB(`/movie/now_playing?page=${page}`);
}

export async function searchMovies(query, page = 1) {
  return fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
}

export function getImageUrl(path, size = 'w500') {
  if (!path) return '/placeholder-movie.jpg'; // Imagen por defecto
  return `https://image.tmdb.org/t/p/${size}${path}`;
}