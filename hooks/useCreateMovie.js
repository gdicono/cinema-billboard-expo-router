import { useState } from 'react';

const API_URL = 'https://3xx8pf48-3000.brs.devtunnels.ms/movies';

const useCreateMovie = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMovie = async (movie) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Película que se enviará:', movie);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });

      const responseText = await response.text();

      console.log('Estado del POST:', response.status);
      console.log('Respuesta del servidor:', responseText);

      if (!response.ok) {
        throw new Error(`Error al crear película. HTTP ${response.status}: ${responseText}`);
      }

      return responseText ? JSON.parse(responseText) : null;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createMovie, loading, error };
};

export default useCreateMovie;
