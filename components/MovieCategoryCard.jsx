import { View, Text, Image, StyleSheet } from 'react-native';
import { getRatingStars, formatDuration } from '../utils/formatters';

export default function MovieCategoryCard({ title, poster, duration, rating }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: poster }} style={styles.poster} resizeMode="cover" />

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      {duration !== undefined && duration !== null && (
        <Text style={styles.duration}> 🕒 {formatDuration(duration)}</Text>
      )}

      {rating != null && (
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{getRatingStars(rating)}</Text>
          <Text style={styles.rating}>{rating}/10</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginLeft: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    marginBottom: 4,
  },
  poster: {
    width: '100%',
    height: 170,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 8,
    minHeight: 36,
  },
  ratingContainer: {
    marginTop: 6,
  },
  stars: {
    fontSize: 12,
    color: '#F5A623',
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  duration: {
    fontSize: 13,
    color: '#4B5563',
  },
});
