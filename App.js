import React, { useState } from 'react';
import {
  Modal,
  Button,
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
import CustomButton from './components/myButton';
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
          {props.details && <Text style={styles.compParagraph}>{props.details}</Text>}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [text, setText] = useState();
  const [modalVisible, setModalVisible] = useState(false);
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
        <TouchableOpacity onPress={handleSubmit}>
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
                quandoPremuto={() => {
                  setModalVisible(true);
                  setSelectedItem(item);
                }}
                selected={selectedItem && selectedItem.id === item.id}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
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
                title={selectedItem.title}
                img={selectedItem.image}
                details={selectedItem.description}
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
