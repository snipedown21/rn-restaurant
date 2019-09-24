import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../apis/yelp';
import businessDetails from '../samples/businessDetails';

const SAMPLES = true;

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam('id');

  const getResult = async (id) => {
    if(SAMPLES) {
      setResult(businessDetails);
    }
    else {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    }
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if(!result) {
    return null;
  }

  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.imageStyle} source={{ uri: item }} />
        }}
      >
      </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    width: 300
  }
});

export default ResultsShowScreen;
