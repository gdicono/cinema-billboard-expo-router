import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import Movie from '../components/Movie';

import AddMovieFloatingButton from '../components/AddMovieFloatingButton';
import SegmentControl from '../components/SegmentControl';
import AddMovieModal from '../components/AddMovieModal';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import useFetch from '../hooks/useFetch';

import MoviesByCategory from './MoviesByCategory';

import CategoriesDropDown from './CategoriesDropDown';

import useCreateMovie from '../hooks/useCreateMovie';

export default function Dashboard() {
  const { data, error, loading, fetchData } = useFetch(
    'https://3xx8pf48-3000.brs.devtunnels.ms/movies'
  );

  const {
    data: categories,
    error: errorCategories,
    loading: loadingCategories,
  } = useFetch('https://3xx8pf48-3000.brs.devtunnels.ms/categories');

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedSegment, setSelectedSegment] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState('');

  const { createMovie, loading: creatingMovie, error: createMovieError } = useCreateMovie();

  const handleAddMovie = async (movie) => {
    try {
      const newMovie = await createMovie(movie);

      console.log('Película creada:', newMovie);

      await fetchData();

      setModalVisible(false);

      Alert.alert('Éxito', 'Película agregada correctamente');
    } catch (error) {
      console.error('Error al crear película:', error);

      Alert.alert('Error', error.message);
    }
  };

  if (loading || (selectedSegment === 1 && loadingCategories)) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.loadingText}>Cargando películas...</Text>
      </View>
    );
  }

  if (error || (selectedSegment === 1 && errorCategories)) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error al cargar los datos</Text>
      </View>
    );
  }

  let moviesList;

  if (selectedSegment === 0) {
    const filteredMovies = selectedCategory
      ? (data ?? []).filter((movie) => movie.category === selectedCategory)
      : (data ?? []);

    moviesList = (
      <View style={styles.list}>
        <CategoriesDropDown
          categories={categories ?? []}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={styles.listContent}
          data={filteredMovies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Movie {...item} />}
        />
      </View>
    );
  } else {
    moviesList = <MoviesByCategory movies={data ?? []} categories={categories ?? []} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SegmentControl
        segments={['All Movies', 'Movies By Category']}
        selectedSegment={selectedSegment}
        onSegmentSelect={setSelectedSegment}
        style={{ width: Dimensions.get('window').width - 20 }}
      />

      {moviesList}

      <AddMovieFloatingButton
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={() => {
          console.log('Add Movie Pressed');

          setModalVisible(true);
        }}
      />

      <AddMovieModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddMovie}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
  },

  errorText: {
    color: '#ff4444',
    fontSize: 16,
  },
  list: {
    width: '100%',
    flex: 1,
  },

  listContent: {
    paddingTop: 12,
    paddingBottom: 100,
    alignItems: 'center',
  },
});
