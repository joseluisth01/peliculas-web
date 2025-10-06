const API_KEY = process.env.TMDB_API_KEY;
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = process.env.TMDB_BASE_URL;

// Función base para hacer peticiones con Bearer token (más moderno)
async function fetchFromTMDB(endpoint) {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}language=es-ES`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
  }
  
  return response.json();
}

// Obtener películas populares
export async function getPopularMovies(page = 1) {
  return fetchFromTMDB(`/movie/popular?page=${page}`);
}

// Obtener películas más valoradas
export async function getTopRatedMovies(page = 1) {
  return fetchFromTMDB(`/movie/top_rated?page=${page}`);
}

// Obtener últimos estrenos
export async function getLatestMovies(page = 1) {
  return fetchFromTMDB(`/movie/now_playing?page=${page}`);
}

// Buscar películas
export async function searchMovies(query, page = 1) {
  return fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
}

// Obtener detalles de una película
export async function getMovieDetails(movieId) {
  return fetchFromTMDB(`/movie/${movieId}?append_to_response=videos,credits,reviews`);
}

// Función helper para construir URLs de imágenes
export function getImageUrl(path, size = 'w500') {
  if (!path) return '/placeholder-movie.jpg'; // Imagen por defecto
  return `https://image.tmdb.org/t/p/${size}${path}`;
}