import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getFromStorage(key: string) {
    try {   
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error retrieving data from storage:", error);
    }
    return null;
}

export async function saveToStorage(key: string, data: object) {  
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonValue);
    }
    catch (error) { 
        console.error("Error saving data to storage:", error);
    }
    return null;
}