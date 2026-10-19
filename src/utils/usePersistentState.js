import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function usePersistentState(storageKey, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  // 1. Load once when the app starts
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored !== null && !cancelled) {
          setValue(JSON.parse(stored));
        }
      } catch (error) {
        console.warn(`Could not load ${storageKey}`, error);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  // 2. Save every time the value changes (but only after loading)
  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(storageKey, JSON.stringify(value)).catch((error) =>
      console.warn(`Could not save ${storageKey}`, error)
    );
  }, [value, loaded, storageKey]);

  return [value, setValue, loaded];
}