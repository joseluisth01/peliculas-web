'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-red-600">¡Ups! Algo salió mal</h2>
      <p className="text-gray-600 mt-4">{error.message}</p>
      <button 
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}