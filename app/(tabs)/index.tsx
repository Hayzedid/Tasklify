import { StatusBar } from 'expo-status-bar';
import { FlatList, ScrollView, StyleSheet,  TextInput,  View ,Text , LayoutAnimation} from 'react-native';
import { Link } from 'expo-router';
import { ItemList } from '@/components/ALLTASKS';
import { useEffect, useState } from 'react';
import { getFromStorage, saveToStorage } from '@/utils/storage';
import * as Haptics from 'expo-haptics';


const storageKey = 'item-List';



type itemListType = {
  id: string;
  name: string;
  isCompleted?: boolean;
  completedonTimeStamp?: number;
  lastUpdatedTimestamp?: number;
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
  const [itemList, setitemList] = useState<itemListType[]>([]);
  const [value, setValue] = useState('');

useEffect(() => {
  const fetchInitial = async () => {
    const data = await getFromStorage(storageKey);
    if (data) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setitemList(data);
    }
  };
  fetchInitial();
},[]);



  const handleSubmit = () => {if (value) {
    const newItem: itemListType = {
      id: Math.random().toString(),
      name: value,
      isCompleted: false,
      
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setitemList((prev) => [...prev, newItem]);
    saveToStorage(storageKey, itemList);
    setValue('');
  }}

  const handleDelete = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setitemList((prev) => prev.filter((item) => item.id !== id));
    saveToStorage(storageKey, itemList);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
  const handleComplete = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setitemList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (item.completedonTimeStamp) { 
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }

          if (!item.isCompleted) {
            return { ...item, isCompleted: true, completedonTimeStamp: Date.now() };
          } else {
            return { ...item, isCompleted: false, completedonTimeStamp: undefined };
          }
        }
        return item;
      })
    );
    saveToStorage(storageKey, itemList);
  };
  

  
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
  renderItem={({ item }) => (
    <ItemList name={item.name} isCompleted={item.isCompleted} onDelete={() => handleDelete(item.id)} onToggle={() => {handleComplete(item.id)}} />
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
