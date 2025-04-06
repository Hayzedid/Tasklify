import { TouchableOpacity, View, Text, Alert, StyleSheet, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

type props = {
    name: string; 
    isCompleted?: boolean;
    onDelete: () => void;
    onToggle: () => void;
    
};
export function ItemList({name, isCompleted, onDelete, onToggle } : props) {
     const handleDelete = () => {
      console.log("Delete pressed");
        Alert.alert(
         `Are you sure you want to delete this ?`,
          "This action cannot be undone.",
          [
            { text: "OK", onPress: () => onDelete(), style: "destructive" },
            { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }
          ]
      
        );
      };
  return (
    <Pressable  onPress={() => {
      console.log("Pressed item:", name);
      onToggle();
    }}  style={[styles.itemContainer, isCompleted ? styles.itemContainerCompleted: undefined]} >
      <View style={[styles.row]}>
          <Entypo name={isCompleted ? "check" : "circle"} size={24} color={isCompleted ? "green" : "black"} />
          <Text style={[styles.itemText, isCompleted ? styles.completeditemText : undefined]}>{name}</Text>
      </View>
            <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}  style={{ padding: 10 }}>
            <AntDesign name="closecircle" size={24} color= {isCompleted ? "grey" : "red"} />
            </TouchableOpacity>
        
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#5C8C46',
        borderBottomColor: '#1a759f',
        borderBottomWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 4,
        marginHorizontal: 16,
  },
    itemContainerCompleted: {
        backgroundColor: '#0B2559',
        borderBottomColor: '#1a759f',
        borderBottomWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        marginVertical: 4,
        marginHorizontal: 16,
    },

  itemText:{
    fontSize: 18, 
    fontWeight: "200",
    flex: 1,
    padding: 10,
  },
  completeditemText: {
      color: "white", 
      fontSize: 18,
      fontWeight: "600",
      padding: 10,
      borderRadius: 8,
      textDecorationLine: 'line-through'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        padding: 10,  
      }
});
