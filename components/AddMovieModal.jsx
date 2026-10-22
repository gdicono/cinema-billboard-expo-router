import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import data from '../data/data.json';
import CategoriesDropDown from './CategoriesDropDown';

export default function AddMovieModal({ visible, onClose, onSubmit }) {
  const categories = data.categories;
  const [selectedCategory, setSelectedCategory] = useState('');

  const [title, setTitle] = useState('');
  const [poster, setPoster] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = () => {
    if (!title || !poster || !description || !duration || !rating || !selectedCategory) {
      alert('Please fill in all fields');
      return;
    }

    const durationNumber = Number(duration);
    const ratingNumber = Number(rating);

    if (!Number.isFinite(durationNumber) || durationNumber <= 0) {
      alert('Duration must be a positive number');
      return;
    }

    if (!Number.isFinite(ratingNumber) || ratingNumber < 0 || ratingNumber > 10) {
      alert('Rating must be a number between 0 and 10');
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

    if (onSubmit) {
      onSubmit(newMovie);
    }

    setTitle('');
    setPoster('');
    setDescription('');
    setDuration('');
    setRating('');
    setSelectedCategory('');

    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Movie</Text>

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={[styles.input, styles.descriptionInput]}
          />

          <TextInput
            placeholder="Poster URL"
            value={poster}
            onChangeText={setPoster}
            style={[styles.input, styles.descriptionInput]}
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
            style={[styles.input, styles.descriptionInput]}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Rating (0-10)"
            value={rating}
            onChangeText={setRating}
            style={[styles.input, styles.descriptionInput]}
            keyboardType="decimal-pad"
          />

          <CategoriesDropDown
            categories={categories}
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
