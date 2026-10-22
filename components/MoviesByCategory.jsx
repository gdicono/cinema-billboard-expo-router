import { View, Text, StyleSheet, FlatList } from 'react-native';
import Movie from './Movie';
import MovieCategoryCard from './MovieCategoryCard';

export default function MoviesByCategory({ movies, categories }) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.container}
      renderItem={({ item: category }) => {
        const categoryMovies = movies.filter((movie) => movie.category === category.name);

        return (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.name}</Text>

            <FlatList
              data={categoryMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item: movie }) => (
                <MovieCategoryCard
                  title={movie.title}
                  poster={movie.poster}
                  duration={movie.duration}
                  rating={movie.rating}
                />
              )}
            />
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingBottom: 100,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
});
