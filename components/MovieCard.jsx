import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '../lib/tmdb';
import { Star, Play } from 'lucide-react';

export default function MovieCard({ movie }) {
  return (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      {/* Imagen de la película */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={getImageUrl(movie.poster_path)}
          alt={`Ver ${movie.title} gratis - Película online`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay con botón play */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-600 text-white p-3 rounded-full hover:bg-red-700">
            <Play size={24} fill="currentColor" />
          </button>
        </div>
        
        {/* Rating */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-yellow-400 px-2 py-1 rounded flex items-center text-sm">
          <Star size={14} fill="currentColor" className="mr-1" />
          {movie.vote_average?.toFixed(1)}
        </div>
      </div>

      {/* Información de la película */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
          <Link href={`/ver-pelicula-gratis/${movie.id}-${movie.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}>
            {movie.title}
          </Link>
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-3">
          {movie.overview}
        </p>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <Link 
            href={`/ver-pelicula-gratis/${movie.id}-${movie.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
          >
            Ver Gratis
          </Link>
        </div>
      </div>
    </div>
  );
}