import { registerForPushNotificationsAsync } from "@/utils/registerforpushnotificationsasyn";
import { router, useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Duration, intervalToDuration, isBefore } from "date-fns";
import { TimeSegment } from "@/components/timerSegment";
import { getFromStorage, saveToStorage } from "@/utils/storage"; // Ensure you import saveToStorage

const frequency = 10 * 1000; 
const countdownStorageKey = "countdownState"; // Removed stray "666"
 
type persistedCountDownState = {
  currentNotificationId: string | null;
  completedonTimeStamp: number[] | null;
  lastUpdatedTimestamp: number | null;
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // Provide an initial state object (or use appropriate defaults)
  const [countdownState, setCountdownState] = useState<persistedCountDownState>({
    currentNotificationId: null,
    completedonTimeStamp: [],
    lastUpdatedTimestamp: Date.now(),
  });
  
  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 },
  });

  console.log("status", status);

  const router = useRouter();
  const lastUpdatedTimestamp = countdownState.lastUpdatedTimestamp || Date.now();

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      if (value) {
        setCountdownState(value);
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    init();
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const timeStamp = lastUpdatedTimestamp + frequency;
      setIsLoading(false); // Set loading to false after fetching data
      const overdue = isBefore(timeStamp, Date.now());
      const distance = intervalToDuration({
        start: overdue ? timeStamp : Date.now(),
        end: overdue ? Date.now() : timeStamp,
      });
      setStatus({ isOverdue: overdue, distance });
    };
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, [lastUpdatedTimestamp]);

  const scheduleNotification = async () => {
    let pushNotificationId: string | undefined;
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      console.log("Notification permission granted");
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hello",
          body: "This is a test notification",
        },
        trigger: {
          seconds: frequency / 1000,
          repeats: false,
          type: 'timeInterval', // Type is required for TypeScript
        } as Notifications.TimeIntervalTriggerInput,
      });
      console.log("Notification scheduled", pushNotificationId);
    } else if (result === "denied") {
      console.log("Notification permission denied");
      if (Device.isDevice) {
        Alert.alert("Permission Denied", "Please enable notifications in your settings.");
      }
    } else if (result === "undetermined") { 
      if (Device.isDevice) {
        Alert.alert("Permission Undetermined", "Please enable notifications in your settings.");
      }
    }

    if (pushNotificationId) {
      setCountdownState((prev) => ({ ...prev, currentNotificationId: pushNotificationId }));
      await Notifications.cancelScheduledNotificationAsync(pushNotificationId);
    }

    // Create a new countdown state object
    const newCountDownState: persistedCountDownState = {
      currentNotificationId: pushNotificationId || null,
      completedonTimeStamp: countdownState.completedonTimeStamp || [],
      lastUpdatedTimestamp: Date.now(),
    };
    // Update state and persist the new state
    setCountdownState(newCountDownState);
    await saveToStorage(countdownStorageKey, newCountDownState);
  };
if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={[styles.container, status.isOverdue ? styles.containerLate : undefined]}>
      {status.isOverdue ? (
        <Text style={styles.overdueText}>Thing Overdue By</Text>
      ) : (
        <Text style={styles.overdueText}>Thing Due In....</Text>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
        <TimeSegment number={status.distance.days ?? 0} unit={"Days"} />
        <TimeSegment number={status.distance.hours ?? 0} unit={"Hours"} />
        <TimeSegment number={status.distance.minutes ?? 0} unit={"Minutes"} />
        <TimeSegment number={status.distance.seconds ?? 0} unit={"Seconds"} />
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>I have done the Thing</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  button: { 
    backgroundColor: "#5C8C46",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { 
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 1,
  },
  overdueText: {  
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  containerLate: {
    backgroundColor: "#f8d7da",
  },
});
