import { Image, StyleSheet, Text, View } from 'react-native';

import { getRatingStars, formatDuration } from '../utils/formatters';

const Movie = ({ title, poster, category, description, duration, rating }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: poster }} style={styles.poster} resizeMode="cover" />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {category ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.category}>{category}</Text>
          </View>
        ) : null}

        {rating !== undefined && rating !== null && (
          <View style={styles.ratingContainer}>
            <Text style={styles.stars}>{getRatingStars(rating)}</Text>
            <Text style={styles.rating}>{rating}/10</Text>
          </View>
        )}

        {duration != null && <Text style={styles.duration}>🕒 {formatDuration(duration)}</Text>}

        <Text style={styles.description} numberOfLines={4}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '92%',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  poster: {
    width: 110,
    height: 165,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },

  info: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
    gap: 9,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F1FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  category: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },

  stars: {
    color: '#F5A623',
    fontSize: 13,
  },

  rating: {
    fontSize: 12,
    color: '#6B7280',
  },

  duration: {
    fontSize: 13,
    color: '#4B5563',
  },

  description: {
    fontSize: 13,
    lineHeight: 19,
    color: '#6B7280',
  },
});
