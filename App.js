import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import data from './data';

function AssetExample({ title, img }) {
  const immagine = img ? img : require('./assets/snack-icon.png');

  return (
    <Card style={styles.card}>
      <View style={styles.compContainer}>
        <Text style={styles.compParagraph}>{title}</Text>
        <Image style={styles.logo} source={immagine} />
      </View>
    </Card>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>LA MIA PRIMA APP</Text>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <AssetExample title={item.title} img={item.image} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 33,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
    marginBottom: 10,
  },
    cardContainer: {
    flex: 0.5,
    padding: 5,
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
  scrollContainer: {
    flexGrow: 1,
  },
});
