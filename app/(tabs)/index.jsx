import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import useFetch from '../../hooks/useFetch';
import Movie from '../../components/Movie';

export default function MoviesScreen() {
  const {
    data: movies,
    loading,
    error,
  } = useFetch('https://3xx8pf48-3000.brs.devtunnels.ms/movies');

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.text}>Cargando películas...</Text>
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

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Movie
          id={item.id}
          title={item.title}
          poster={item.poster}
          category={item.category}
          description={item.description}
          duration={item.duration}
          rating={item.rating}
        />
      )}
    />
  );
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
  listContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#F3F4F6',
  },
});
