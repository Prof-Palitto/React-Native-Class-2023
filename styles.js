import React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default  styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'gray',
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
  cardContainer: {
    flex: 0.5,
    padding: 5,
  },
  input: {
    width: '85%',
    color: 'white',
    borderColor: 'white',
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginRight: 20,
  },
  search: {
    width: '90%',
    margin: 20,
    flexDirection: 'row',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
