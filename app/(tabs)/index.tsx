import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet,  TextInput,  View ,Text } from 'react-native';
import { Link } from 'expo-router';
import { ItemList } from '@/components/ALLTASKS';
import { useState } from 'react';
type itemListType = {
  id: string;
  name: string;
  isCompleted?: boolean;
};
// const initialState: itemListType[] = [
//   { id: '1', name: 'Coffee', isCompleted: true },
//   { id: '2', name: 'Tea', isCompleted: true },
//   { id: '3', name: 'Sugar', isCompleted: false },
//   { id: '4', name: 'Garri' },
//   { id: '5', name: 'Groundnut' },
//   { id: '6', name: 'Omi tutu' },
// ];
export default function App() {
  const [itemList, setItemList] = useState<itemListType[]>([]);
  const [value, setValue] = useState('');
  const handleSubmit = () => {if (value) {
    const newItem: itemListType = {
      id: Math.random().toString(),
      name: value,
      isCompleted: false,
    };
    setItemList((prev) => [...prev, newItem]);
    setValue('');
  }}
  return (
<FlatList
  style={styles.container}
  contentContainerStyle={styles.contentContainer}
  stickyHeaderIndices={[0]}
  ListEmptyComponent={
         <View style={styles.listEmptyContainer}>
              <Text>Your shopping list is empty</Text>
            </View>
          }
  ListHeaderComponent={
    <TextInput
      placeholder="E.g Coffee"
      style={styles.textInput}
      value={value}
      onChangeText={setValue}
      returnKeyType="done"
      onSubmitEditing={handleSubmit}
    />
  }
  data={itemList}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <ItemList name={item.name} isCompleted={item.isCompleted} />
  )}
/>
  );
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  listEmptyContainer: {
        justifyContent: "center",
       alignItems: "center",
        marginVertical: 18,
      }

});
