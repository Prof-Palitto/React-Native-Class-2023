import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';

function AssetExample(props) {
  const immagine = props.img ? props.img : require("./assets/snack-icon.png");

  return (
    <Card>
      <View style={styles.compContainer}>
        <Text style={styles.compParagraph}>
          EXPO
        </Text>
        <Image style={styles.logo} source={immagine} />
      </View>
    </Card>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <AssetExample />
      <Text style={styles.paragraph}>
        LA MIA PRIMA APP
      </Text>
      <AssetExample img={require("./assets/wings.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  compContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  compParagraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },
});
