import { useLocalSearchParams, Stack } from 'expo-router';
import useFetch from '../../hooks/useFetch';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { formatDuration, getRatingStars } from '../../utils/formatters';

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  const { data, error, loading } = useFetch(`https://3xx8pf48-3000.brs.devtunnels.ms/movies/${id}`);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.loadingText}>Cargando películas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar los datos</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: data.title }} />

      <Image source={{ uri: data.poster }} style={styles.poster} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.category}>{data.category}</Text>
        <Text style={styles.duration}>🕒 {formatDuration(data.duration)}</Text>
        <Text style={styles.rating}>
          {getRatingStars(data.rating)} {data.rating}/10
        </Text>
        <Text style={styles.description}>{data.description}</Text>

        {data.reviews?.length === 0 ? (
          <Text style={styles.emptyReviews}>Aún no hay reviews para esta película</Text>
        ) : (
          <FlatList
            data={data.reviews}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image
                    source={require('../../assets/profile-circle-svgrepo-com.png')}
                    style={{ width: 36, height: 36 }}
                  />
                  <View>
                    <Text style={styles.reviewerName}>{item.username}</Text>
                    <Text style={styles.reviewRating}>⭐ {item.rating}/10</Text>
                  </View>
                </View>
                <Text style={styles.reviewText}>{item.review}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
  },

  poster: {
    width: '100%',
    height: 300,
    backgroundColor: '#E5E7EB',
  },

  content: {
    padding: 18,
    gap: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },

  category: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F1FF',
    color: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    fontSize: 13,
    fontWeight: '600',
  },

  duration: {
    fontSize: 14,
    color: '#4B5563',
  },
  rating: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4B5563',
    marginVertical: 4,
  },

  emptyReviews: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#9CA3AF',
    marginTop: 10,
  },

  reviewCard: {
    width: 250,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  reviewRating: {
    fontSize: 12,
    color: '#D97706',
  },
  reviewText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 18,
  },
});
