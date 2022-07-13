import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import { FilterByDate, FilterByYear } from '../redux/actionCreators';
import { fetchLaunchData } from '../services/apiFetch'

export default function Dashboard() {
  const dispatch = useDispatch();
  const filteredByYearState = useSelector(state => state) 
  const [launchList, setLaunchList] = useState([]);

  const data = async () => {
    const allData = await fetchLaunchData();
    if (allData) {
      setLaunchList(allData);
    }
    return allData;
  };

  useEffect(() => {
    data();
  }, []);

  function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year + ' '
  return time;
}
  const handleSortByYear = (year) => {
    if (year) {
      dispatch(FilterByYear(year));
      setLaunchList(filteredByYearState)
    } else {
      return;
    }
  };

  const handleSortByDate = () => {
    dispatch(FilterByDate())
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>SpaceX Launches</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" icon="arrow-down-circle" color='blue' onPress={() => handleSortByYear}>Filter by Year</Button>
        <Button mode="contained" icon="arrow-down-circle" color='blue' onPress={() => handleSortByDate}>Sort Descending</Button>
        {/* <Button mode="contained" color='blue' onPress={() => console.log('Pressed')}>Refresh</Button> */}
        </View>
      <FlatList
        data={launchList}
        keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
            <View>
              <Card
              mode='elevated'
              elevation={5}
              >
                <Card.Content>
                    <Title>
                      <Text> #{item.flight_number}</Text>
                      <Text> {item.mission_name}</Text>
                    </Title>
                  </Card.Content>
                   <Card.Content>
                    <Paragraph> {item.rocket.rocket_name} </Paragraph>
                  </Card.Content>
                   <Card.Content>
                    <Paragraph>{timeConverter(item.launch_date_unix)}</Paragraph>
                  </Card.Content>

              </Card>
            </View>
          )
        }}
        />
    </SafeAreaView>
  )
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
   },
   TitleContainer: {
     justifyContent: 'center',
     alignSelf: 'center',
     
   },
   Title: {
     fontSize: 28,
     fontWeight: '600' 
   },
   buttonContainer: {
     margin: 12,
     flexDirection: 'row',
     justifyContent: 'space-around',
   },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});