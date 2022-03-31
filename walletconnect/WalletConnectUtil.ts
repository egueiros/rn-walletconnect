import WalletConnectClient from '@walletconnect/client'
import AsyncStorage from "@react-native-async-storage/async-storage";

export let walletConnectClient: WalletConnectClient

export async function createWalletConnectClient() {
  walletConnectClient = await WalletConnectClient.init({
    controller: true,
    projectId: '',
    relayUrl: 'wss://relay.walletconnect.com',
    metadata: {
      name: 'React Wallet',
      description: 'React Wallet for WalletConnect',
      url: 'https://walletconnect.com/',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    },
    storageOptions: {
      asyncStorage: AsyncStorage,
    }
  })
}
