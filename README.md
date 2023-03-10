# Sample Snack app

creo il file dove inserire i dati delle carte da inserire `data.js`

```
const data = [
  {
    id: 1,
    title: 'EXPO',
    image: require('./assets/snack-icon.png'),
    description: 'Description of EXPO',
  },
  {
    id: 2,
    title: 'Wings',
    image: require('./assets/wings.png'),
    description: 'Description of Wings',
  },
  {
    id: 3,
    title: 'Pizza',
    image: require('./assets/pizza.png'),
    description: 'Description of Pizza',
  },
];

export default data;
```
Importo i dati nel mio file App.js `import data from './data';`

Abbiamo quindi eliminato i due componenti AssetExample in favore di una mappatura del data array usando il metodo map(). In questo modo, creiamo una AssetExample card per ogni elemento nel data array, passando il titolo e l'immagine come proprietà. Infine, abbiamo anche aggiunto una key univoca a ogni AssetExample card.

In questo modo per inserire un quarto elemento, sarà sufficiente aggiungerlo nel file `data.js`
```
...
  {
    id: 4,
    title: 'Burger',
    image: require('./assets/burger.png'),
    description: 'Description of Burger',
  },
];
```

Ma...

Aggiungendo un altra Card non abbiamo sufficiente spazio nello schermo...

Per poter Scrollare su e giù possiamo usare una "View" chiamata "ScrollView"
```
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>LA MIA PRIMA APP</Text>
      <ScrollView style={styles.scrollContainer}>
        {data.map((item, index) => (
          <AssetExample key={index} title={item.title} img={item.image} />
        ))}
      </ScrollView>
    </View>
  );
}
```
In realtà invece di usare la ScrollView è più indicato usare la FlatList:
```
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>LA MIA PRIMA APP</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <AssetExample key={item.id} title={item.title} img={item.image} />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
}
```
Ho sostituito ScrollView con FlatList e ho usato la prop "data" per passare i dati a FlatList. Successivamente, ho usato la prop "renderItem" per renderizzare ogni elemento nella lista e la prop "keyExtractor" per specificare una chiave univoca per ogni elemento. Infine, ho aggiunto la prop "contentContainerStyle" per impostare il padding su FlatList.

La FlatList è una scelta migliore rispetto alla ScrollView quando si tratta di visualizzare grandi quantità di dati in una lista scrollabile, poiché rende più efficiente il rendering degli elementi e migliora le prestazioni dell'applicazione. La FlatList inoltre offre una serie di funzionalità utili, come la possibilità di caricare dinamicamente nuovi dati all'infinito o di effettuare rinfreschi dei dati mediante il gesto di pull-to-refresh.


Supponiamo ora di voler disporre le "card" con un layout a 2 colonne

Nella FlatList:
```
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <AssetExample title={item.title} img={item.image} />
          </View>
        )}
```
specifichiamo il numero di colonne
Nello stile:
abbiamo aggiunto il nuovo stile "cardContainer" per posizionare ogni elemento nella griglia a 2 colonne. La prop "flex" è impostata a 0.5 per occupare la metà della larghezza della schermata. 
```
  cardContainer: {
    flex: 0.5,
    padding: 5,
  },
  ```

Per snellire un pò il codice spostiamo gli stili in un file `styles.js`
```
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default styles = StyleSheet.create({
  container: {
 ...
 ```
 e importiamo il file in `App.js`
 ```
 import styles from './styles'
```

Un altra cosa che potremmo aggiungere alla nostra APP, è che una volta selezionato una scheda, questa si APRE mostrando alcuni dettagli riguardo la scheda stessa.

Per fare questo possiamo usare un componente chiamato `<TouchableOpacity` che racchiude la nostra CARD e a cui possimo passare alcune "props": `onPress={() => props.onPress(props)}` e `activeOpacity={0.8}`
    >
Quindi il nostro AssetExample avrà la seguente struttura:
```
function AssetExample(props) {
  const immagine = props.img ? props.img : require('./assets/snack-icon.png');

  return (
    <TouchableOpacity
      onPress={() => props.quandoPremuto(props)}
      activeOpacity={0.8}
    >
      <Card style={styles.card}>
        <View style={styles.compContainer}>
          <Text style={styles.compParagraph}>{props.title}</Text>
          <Image style={styles.logo} source={immagine} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}
```
l'attributo "onPress" del componente "TouchableOpacity" definisce l'azione che viene eseguita quando l'utente preme sulla "card". 

In particolare, quando l'utente preme sulla "card", viene chiamata la funzione "props.quandoPremuto()" passata al componente AssetExample. 

La funzione "props.quandoPremuto()" viene definita nel componente padre App e prende come argomento l'oggetto props della "card" che è stata premuta.

Nel componente padre "App", quando andiamo a renderizzare l'AssetExample andiamo a specificare la funzione che deve essere eseguita quando premiamo la "card"
```
export default function App() {
  ...

    <AssetExample
      title={item.title}
      img={item.image}
      onPress={(item) => console.log(item)}
    />
  );
  ...
  ```

  *** gli STATI
  Gli "stati"(state) in React sono dei contenitori(variabili) di dati che possono essere aggiornati e influenzare il rendering degli elementi dell'interfaccia. 
  
  Con la riga di comando `const [selectedItem, setSelectedItem] = useState(null);`, stiamo dichiarando un nuovo state chiamato "selectedItem" e un metodo per aggiornarlo chiamato "setSelectedItem". 
  
  Inizialmente, il valore di "selectedItem" è impostato su "null". Questo state verrà utilizzato per tenere traccia dell'elemento selezionato dall'utente nella lista. 
  
  Quando l'utente seleziona un elemento, il valore di "selectedItem" viene aggiornato con l'elemento selezionato, e questo influenzerà il rendering della finestra modale che viene aperta per mostrare i dettagli.

Per usare gli stati dobbiamo importartli:

`import React, { useState } from 'react';`

"useState" è un Hook di React che consente di aggiungere uno state locale a un componente funzionale. Questo hook restituisce un array con due elementi: il primo elemento è il valore dello state, mentre il secondo elemento è una funzione per aggiornare il valore dello state. In pratica, useState è una funzione che viene utilizzata per mantenere lo stato interno di un componente funzionale e aggiornarlo, quando necessario, a seguito di eventi o interazioni dell'utente.

Se volessimo modificare il titolo della "card" selezionata, potremmo fare nel seguente modo:
1. aggiungere ad AssetExample un prop che dice se la CARD è stata selezionata:

`selected={selectedItem && selectedItem.id === item.id}`

2. Nel componente AssetExample visualizzo il testo a seconda se la CARD è stata selezionata o meno

`<Text style={styles.compParagraph}>{props.selected ? `SELEZIONATO: ${props.title}` : props.title}</Text>`

3. Nel componente AssetExample riscrivo la funzione "onPress()" 

`onPress={() => setSelectedItem(item)}`

