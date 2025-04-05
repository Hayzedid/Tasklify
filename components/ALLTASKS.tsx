import { TouchableOpacity, View, Text, Alert, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

type props = {
    name: string; 
    isCompleted?: boolean;
};
export function ItemList({name, isCompleted} : props) {
     const handleDelete = () => {
        Alert.alert(
         `Are you sure you want to delete this ?`,
          "This action cannot be undone.",
          [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
      
        );
      };
  return (
     <View style={[styles.itemContainer, isCompleted ? styles.itemContainerCompleted: undefined]} >
          <Text style={[styles.itemText, isCompleted ? styles.completeditemText : undefined]}>{name}</Text>
            <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}  >
            <AntDesign name="closecircle" size={24} color= {isCompleted ? "grey" : "red"} />
            </TouchableOpacity>
          </View>
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
    fontWeight: "200"
  },
  completeditemText: {
      color: "white", 
      fontSize: 18,
      fontWeight: "600",
      padding: 10,
      borderRadius: 8,
      textDecorationLine: 'line-through'
    },
});
