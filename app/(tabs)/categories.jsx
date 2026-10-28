import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import useFetch from '../../hooks/useFetch';
import data from '../../data/data.json';
import MoviesByCategory from '../../components/MoviesByCategory';

export default function CategoriesScreen() {
  const categories = data.categories;
  const {
    data: movies,
    loading,
    error,
  } = useFetch('https://3xx8pf48-3000.brs.devtunnels.ms/movies');

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.text}>Cargando categorías...</Text>
      </View>
    );
  }

  if (error || !movies) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>No se pudieron cargar las películas</Text>
      </View>
    );
  }

  return <MoviesByCategory movies={movies} categories={categories} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 10,
    color: '#6B7280',
  },
  error: {
    color: '#EF4444',
  },
});
