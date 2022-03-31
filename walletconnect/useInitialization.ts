import { createWalletConnectClient } from './WalletConnectUtil'
import { useCallback, useEffect, useState } from 'react'

export default function useInitialization() {
  const [initialized, setInitialized] = useState(false);

  const onInitialize = useCallback(async () => {
    try {
      await createWalletConnectClient();
      setInitialized(true);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(()=> {
    if (!initialized) {
      onInitialize();
    }
  }, [initialized, onInitialize])

  return { initialized, onInitialize } ;
}
