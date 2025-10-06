import { getPopularMovies, getLatestMovies, getTopRatedMovies } from '../lib/tmdb';
import MovieCard from '../components/MovieCard';
import { Search, Film, Star, Clock } from 'lucide-react';

// Metadatos para SEO
export const metadata = {
  title: 'Ver Películas Gratis Online - Estrenos y Clásicos HD',
  description: 'Ver películas gratis online en HD. Los mejores estrenos, clásicos y películas populares. Sin registro, sin límites. ¡Disfruta del mejor cine gratis!',
  keywords: 'ver peliculas gratis, peliculas online gratis, cine gratis, estrenos gratis, peliculas hd',
  openGraph: {
    title: 'Ver Películas Gratis Online',
    description: 'Las mejores películas gratis en HD. Estrenos y clásicos sin límites.',
  },
};

export default async function HomePage() {
  // Obtener datos del servidor (SSR para SEO)
  const [popularMovies, latestMovies, topRatedMovies] = await Promise.all([
    getPopularMovies(),
    getLatestMovies(),
    getTopRatedMovies()
  ]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Film className="text-red-600" size={32} />
              <h1 className="text-2xl font-bold">
                <span className="text-white">Ver</span>
                <span className="text-red-600">Películas</span>
                <span className="text-white">Gratis</span>
              </h1>
            </div>
            
            {/* Buscador */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar películas gratis..."
                  className="w-full bg-gray-800 text-white px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>
            
            {/* Navegación */}
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-red-400 transition-colors">Inicio</a>
              <a href="#" className="hover:text-red-400 transition-colors">Géneros</a>
              <a href="#" className="hover:text-red-400 transition-colors">Estrenos</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900/20 to-gray-900/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ver Películas <span className="text-red-600">Gratis</span> Online
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Disfruta de los mejores estrenos, clásicos y películas populares completamente gratis. 
            Calidad HD, sin registros, sin límites. ¡Tu cine favorito al alcance de un click!
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <Star className="text-yellow-400 mr-2" size={20} />
              Miles de películas
            </div>
            <div className="flex items-center">
              <Clock className="text-green-400 mr-2" size={20} />
              Actualizado diariamente
            </div>
            <div className="flex items-center">
              <Film className="text-red-400 mr-2" size={20} />
              Calidad HD
            </div>
          </div>
        </div>
      </section>

      {/* Películas Populares */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">
            🔥 Películas <span className="text-red-600">Populares</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularMovies.results?.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Últimos Estrenos */}
      <section className="py-12 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">
            🎬 Últimos <span className="text-red-600">Estrenos</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {latestMovies.results?.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Mejor Valoradas */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">
            ⭐ Mejor <span className="text-red-600">Valoradas</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {topRatedMovies.results?.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 Ver Películas Gratis. Disfruta del mejor cine online sin límites.</p>
        </div>
      </footer>
    </div>
  );
}