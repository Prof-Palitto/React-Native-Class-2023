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

