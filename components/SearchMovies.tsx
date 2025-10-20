'use client';
import { useState } from 'react';
import { searchMovies } from '../lib/tmdb';
import MovieCard from './MovieCard';


export default function SearchMovies() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    setLoading(true);
    try {
      const result = await searchMovies(query);
      setMovies(result.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setMovies([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas..."
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button 
          type="submit" 
          className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}