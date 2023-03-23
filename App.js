import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import data from './data';
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';

function AssetExample(props) {
  const immagine = props.img ? props.img : require('./assets/snack-icon.png');

  return (
    <TouchableOpacity
      onPress={() => props.quandoPremuto(props)}
      activeOpacity={0.8}>
      <Card>
        <View style={styles.compContainer}>
          <Text style={styles.compParagraph}>
            {props.selected ? `SELEZIONATO: ${props.title}` : props.title}
          </Text>
          <Image style={styles.logo} source={immagine} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [text, setText] = useState();
  const handleSubmit = () => {
    console.log('SUBMIT: ' + text);
    inputText = '';
    setText('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="LA MIA PRIMA APP"
          returnKeyType="search"
          onSubmitEditing={handleSubmit}
          onChangeText={setText}
          value={text}></TextInput>
        <TouchableOpacity
          onPress={handleSubmit}>
          <MaterialIcons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        numColumns={2}
        data={data}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <View style={styles.cardContainer}>
              <AssetExample
                title={item.title}
                img={item.image}
                quandoPremuto={() => (selectedItem && selectedItem.id === item.id) ? setSelectedItem(null) : setSelectedItem(item)}
                selected={selectedItem && selectedItem.id === item.id}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
