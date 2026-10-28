import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import data from '../data/data.json';
import CategoriesDropDown from '../components/CategoriesDropDown';
import useCreateMovie from '../hooks/useCreateMovie';

export default function AddMovie() {
  const router = useRouter();
  const { createMovie, loading } = useCreateMovie();

  const categories = data.categories;
  const [selectedCategory, setSelectedCategory] = useState('');

  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async () => {
    if (!title || !poster || !description || !duration || !rating || !selectedCategory) {
      Alert.alert('Atención', 'Por favor completa todos los campos');
      return;
    }

    const durationNumber = Number(duration);
    const ratingNumber = Number(rating);

    if (!Number.isFinite(durationNumber) || durationNumber <= 0) {
      Alert.alert('Error', 'La duración debe ser un número positivo');
      return;
    }

    if (!Number.isFinite(ratingNumber) || ratingNumber < 0 || ratingNumber > 10) {
      Alert.alert('Error', 'El rating debe ser un número entre 0 y 10');
      return;
    }

    const newMovie = {
      title: title.trim(),
      poster: poster.trim(),
      description: description.trim(),
      duration: durationNumber,
      rating: ratingNumber,
      category: selectedCategory.trim(),
      reviews: [],
    };

    try {
      await createMovie(newMovie);
      Alert.alert('Éxito', 'Película agregada correctamente');
      router.back(); // regresamos a la pantalla anterior
    } catch (err) {
      Alert.alert('Error', err.message || 'No se pudo guardar la película');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Movie</Text>

      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />

      <TextInput
        placeholder="Poster URL"
        value={poster}
        onChangeText={setPoster}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="url"
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.descriptionInput]}
        multiline
      />

      <TextInput
        placeholder="Duration (minutes)"
        value={duration}
        onChangeText={setDuration}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Rating (0-10)"
        value={rating}
        onChangeText={setRating}
        style={styles.input}
        keyboardType="decimal-pad"
      />

      <CategoriesDropDown
        categories={categories}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#f4511e" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Close" color="#777" onPress={() => router.back()} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
});
