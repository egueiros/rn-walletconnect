/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {useState, FC} from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import useInitialization from "./walletconnect/useInitialization";
import useWalletConnectEventsManager from "./walletconnect/useWalleConnectEventsManager";
import { walletConnectClient } from "./walletconnect/WalletConnectUtil";

const App: FC = () => {
  const [pairUri, setPairUri] = useState('');
  const [loading, setLoading] = useState(false)
  const isDarkMode = useColorScheme() === 'dark';
  const { initialized, onInitialize } = useInitialization();
  useWalletConnectEventsManager(initialized);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function onConnect() {
    try {
      setLoading(true)
      await walletConnectClient.pair({ uri: pairUri })
    } catch (err) {
      alert(err)
    } finally {
      setPairUri('')
      setLoading(false)
    }
  }


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.contentContainer}
        style={backgroundStyle}>
        <Text style={styles.text}>'Pair button' will be enabled if WalletConnect client initializes correctly</Text>
        <Text style={styles.text}>Has client initialized? {initialized ? 'yes' : 'no'}</Text>

        {!initialized && <Button title={'Init WalletConnect'} disabled={initialized} onPress={onInitialize} />}

        <Button title={'Pair'} disabled={!initialized} onPress={onConnect} />
        <View style={{backgroundColor: '#C0C0C0', borderRadius: 15}}>
          <TextInput onChangeText={setPairUri} style={{minHeight: 40, padding: 8}} multiline />
        </View>
        {loading && <ActivityIndicator color={'blue'} size={"large"} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {justifyContent: "center", alignContent: "center", margin: 16},
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  text: {textAlign: "center", fontSize: 18, marginBottom: 16},
  highlight: {
    fontWeight: '700',
  },
});

export default App;
