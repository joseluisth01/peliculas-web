import { getPopularMovies, getLatestMovies, getTopRatedMovies } from '../lib/tmdb';
import MovieCard from '../components/MovieCard';
import SearchMovies from '../components/SearchMovies';
import { Search, Film, Star, Clock } from 'lucide-react';

export const metadata = {
  title: 'Ver Películas Gratis Online - Estrenos y Clásicos HD',
  description: 'Ver películas gratis online en HD. Los mejores estrenos, clásicos y películas populares. Sin registro, sin límites. ¡Disfruta del mejor cine gratis!',
  keywords: 'ver peliculas gratis, peliculas online gratis, cine gratis, estrenos gratis, peliculas hd',
};

export default async function HomePage() {
  const [popularMovies, latestMovies, topRatedMovies] = await Promise.all([
    getPopularMovies(),
    getLatestMovies(),
    getTopRatedMovies()
  ]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <SearchMovies />

        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">🔥 Películas Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {popularMovies.results?.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}