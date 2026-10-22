import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

const CategoriesDropDown = ({ categories, onSelectCategory, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.dropdownButtonText}>{selectedCategory || 'Select a category...'}</Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownList}>
          <FlatList
            data={[{ id: 'all', name: 'All movies' }, ...categories]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dropdownItem, selectedCategory === item.name && styles.selectedItem]}
                onPress={() => handleSelectCategory(item.id === 'all' ? '' : item.name)}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    selectedCategory === item.name && styles.selectedItemText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CategoriesDropDown;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
    width: '100%',
  },
  dropdownButton: {
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  arrow: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
  dropdownList: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
  },
  selectedItemText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
