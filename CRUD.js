import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CRUDScreen = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addItem = () => {
    if (text.trim() !== '') {
      if (editingId) {
        setItems(items.map(item => (item.id === editingId ? { ...item, value: text } : item)));
        setEditingId(null);
      } else {
        setItems([...items, { id: Date.now().toString(), value: text }]);
      }
      setText('');
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const editItem = (item) => {
    setText(item.value);
    setEditingId(item.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.splitContainer}>
        
        {/* Left Green Side */}
        <View style={styles.leftContainer}>
          <Text style={styles.title}>Manage Your Items</Text>
          <Text style={styles.subtitle}>Add, edit, or remove items below.</Text>
        </View>

        {/* Right White Side */}
        <View style={styles.rightContainer}>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter item"
              value={text}
              onChangeText={setText}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.addButton} onPress={addItem}>
              <Text style={styles.buttonText}>{editingId ? "Update Item" : "Add Item"}</Text>
            </TouchableOpacity>

            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.itemText}>{item.value}</Text>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.editButton} onPress={() => editItem(item)}>
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  splitContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 500,
    maxWidth: 900,
    backgroundColor: 'black',
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#28A745',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28A745',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    borderRightWidth: 3,
    borderRightColor: '#28A745',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1.5,
    borderColor: '#28A745',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#28A745',
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    height: 45,
    width: '100%',
    backgroundColor: '#28A745',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#28A745',  
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6347',  
    padding: 8,
    borderRadius: 5,
  },
});

export default CRUDScreen;
