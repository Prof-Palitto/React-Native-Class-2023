import React, { useState } from 'react';
import {
  Modal,
  Button,
  Text,
  View,
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
import CustomButton from './components/myButton';

function AssetExample(props) {
//  console.log(props);
  return (
    <TouchableOpacity
      onPress={() => props.quandoPremuto(props)}
      activeOpacity={0.8}>
      <Card>
        <View style={styles.compContainer}>
          <Text style={styles.compParagraph}>
            {props.selected
              ? `SELEZIONATO: ${props.info.Title}`
              : props.info.Title}
          </Text>
            {props.info.Poster != 'N/A'
              ? <Image style={styles.logo} source={{ uri: props.info.Poster }} />
              : <Image style={styles.logo} source={require('./assets/snack-icon.png')} />}
        </View>
        <View style={styles.footer}>
          <Text style={styles.compParagraph}>{props.info.Type}</Text>
          <Text style={styles.compParagraph}>{props.info.Year}</Text>
        </View>
        {props.details && (
          <Text style={styles.compParagraph}>{props.details}</Text>
        )}
      </Card>
    </TouchableOpacity>
  );
}

export default function App() {
  const API_URL = 'http://www.omdbapi.com/?apikey=c4bfce58';
  const [selectedItem, setSelectedItem] = useState(null);
  const [text, setText] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [movies, setMovies] = useState();
  const [description, setDescription] = useState('Descrizione del film');
  const searchMovie = async () => {
    console.log('seachMovie with title: ' + text);
    if (text) {
      const response = await fetch(`${API_URL}&s=${text}`);
      const data = await response.json();

      //console.log(data.Search);
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };
  const getMovieInfo = async(imdbID) => {
    console.log('getMovieInfo: ' + imdbID);
    if (imdbID) {
      const response = await fetch(`${API_URL}&i=${imdbID}`);
      const data = await response.json();

      console.log('PLOT: '+data.Plot);
      return(data);
    } else {
      return({});
    }

  }
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
                info={item}
                quandoPremuto={async() => {
                  const movieInfo = await getMovieInfo(item.imdbID)
                  setDescription(movieInfo.Plot)
                  setModalVisible(true);
                  setSelectedItem(item);
                }}
                selected={selectedItem && selectedItem.imdbID === item.imdbID}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.imdbID.toString()}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}>
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              borderColor: 'black',
              borderWidth: 2,
              margin: 50,
              marginTop: 100,
              backgroundColor: 'orange',
              alignItems: 'center',
              paddingTop: 20,
              paddingBottom: 60,
            }}>
            {selectedItem && (
              <AssetExample
                info={selectedItem}
                details={description}
                quandoPremuto={() => {
                  console.log('PREMUTO');
                }}
              />
            )}
            <CustomButton
              name="close"
              onPress={() => {
                setModalVisible(false);
                setSelectedItem(null);
              }}
            />
          </View>
          <TouchableOpacity
            style={{ margin: 20 }}
            onPress={() => {
              setModalVisible(false);
              setSelectedItem(null);
            }}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
