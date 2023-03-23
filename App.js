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
import styles from './styles';
import { MaterialIcons } from '@expo/vector-icons';

function AssetExample(props) {
  const immagine = props.img == 'N/A' ? require('./assets/snack-icon.png') : `{uri: '${props.img}'}`;


  console.log('TITLE: ' + props.title)

  return (
    <TouchableOpacity
      onPress={() => props.quandoPremuto(props)}
      activeOpacity={0.8}>
      <Card>
        <View style={styles.compContainer}>
          <Text style={styles.compParagraph}>
            {props.selected ? `SELEZIONATO: ${props.title}` : props.title}
          </Text>
          <Image style={styles.logo} source={{uri: props.img}} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function App() {
  const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=c4bfce58';
  const [selectedItem, setSelectedItem] = useState(null);
  const [text, setText] = useState();
  const [movies, setMovies] = useState();

  const searchMovie = async () => {
    console.log('seachMovie with title: ' + text);
    if (text) {
      const response = await fetch(`${API_URL}&s=${text}`);
      const data = await response.json();

      console.log(data.Search);
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  const handleSubmit = () => {
    console.log('SUBMIT: ' + text);
    searchMovie();
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
        <TouchableOpacity onPress={handleSubmit}>
          <MaterialIcons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        numColumns={2}
        data={movies}
        renderItem={({ item }) => {
          //console.log(item);
          return (
            <View style={styles.cardContainer}>
              <AssetExample
                title={item.Title}
                img={item.Poster}
                quandoPremuto={() =>
                  selectedItem && selectedItem.imdbID === item.imdbID
                    ? setSelectedItem(null)
                    : setSelectedItem(item)
                }
                selected={selectedItem && selectedItem.imdbID === item.imdbID}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.imdbID.toString()}
      />
    </View>
  );
}
