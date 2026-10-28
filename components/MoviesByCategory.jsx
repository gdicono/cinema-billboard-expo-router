import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';

import MovieCategoryCard from './MovieCategoryCard';

import { useRouter } from 'expo-router';

export default function MoviesByCategory({ movies, categories }) {
  const router = useRouter();
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
                <Pressable onPress={() => router.push(`/movie/${movie.id}`)}>
                  <MovieCategoryCard
                    title={movie.title}
                    poster={movie.poster}
                    duration={movie.duration}
                    rating={movie.rating}
                  />
                </Pressable>
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
