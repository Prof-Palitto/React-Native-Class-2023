import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import data from './data';
import styles from './styles';

function AssetExample(props) {
  const immagine = props.img ? props.img : require('./assets/snack-icon.png');
console.log(props)
  return (
    <TouchableOpacity onPress={() => props.onPress(props)} activeOpacity={0.8}>
      <Card style={styles.card}>
        <View style={styles.compContainer}>
          <Text style={styles.compParagraph}>{props.selected ? `SELEZIONATO: ${props.title}` : props.title}</Text>
          <Image style={styles.logo} source={immagine} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>LA MIA PRIMA APP</Text>
<FlatList
  data={data}
  numColumns={2}
  renderItem={({ item }) => (
    <View style={styles.cardContainer}>
      <AssetExample
        title={item.title}
        img={item.image}
        selected={selectedItem && selectedItem.id === item.id}
        onPress={() => setSelectedItem(item)}
      />
    </View>
  )}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={styles.scrollContainer}
/>
    </View>
  );
}
