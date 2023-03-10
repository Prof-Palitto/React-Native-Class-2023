import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default styles = StyleSheet.create({
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
