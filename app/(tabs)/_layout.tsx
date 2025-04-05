import { Stack, Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function Layout(){
    return (
        < Tabs>         
        <Tabs.Screen name="index" options={{ title: "All Tasks", tabBarIcon: () => (
          <Entypo name="list" size={24} color="black" />),
        }}
      /> 
        <Tabs.Screen name="counter" options={{title: "Add a new task",  tabBarIcon: () => (
            <Entypo name="clock" size={24} color="black" />
          ),}}/>
        <Tabs.Screen name="idea" options={{title: "Edit task", tabBarIcon: ({ color, size }) => (
            <Entypo name="light-bulb" size={24} color="black" /> ),
          }}/>
        <Tabs.Screen name="details" options={{title: "Task details"}}/>
        </Tabs>
    )
}