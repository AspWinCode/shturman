import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const applyState = (state: NetInfoState) => {
      const online = state.isConnected === true && state.isInternetReachable !== false;
      setIsOnline(online);
      setIsConnected(state.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      applyState(state);
    });

    NetInfo.fetch().then((state) => {
      applyState(state);
    });

    return () => unsubscribe();
  }, []);

  return { isOnline, isConnected };
}
