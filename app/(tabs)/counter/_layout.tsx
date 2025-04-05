import { Stack } from "expo-router";
import { Text } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false , 
      headerRight : () => {
        return <Text>Hello</Text>;
      }}} />
      {/* <Stack.Screen name="details" options={{ title: "Task details" }} /> */}
    </Stack>
  );
}