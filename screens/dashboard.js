import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import { Card, Title, Paragraph, Button, ActivityIndicator } from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import { FilterByDate, FilterByYear } from '../redux/actionCreators';
import { fetchLaunchData } from '../services/apiFetch'

export default function Dashboard() {
  const dispatch = useDispatch();
  const filteredByYearState = useSelector(state => state)
  const [loaded, setLoaded] = useState(false)
  const [sortState, SetSortState] = useState(false)
  const [launchList, setLaunchList] = useState([]);

  const data = async () => {
    const allData = await fetchLaunchData();
    if (allData) {
      setLaunchList(allData);
      setLoaded(true);
    }
    return allData;
  };

  useEffect(() => {
    data();
  }, []);

  function timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const time = date + ' ' + month + ' ' + year + ' '
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

  const handleSortAscending = (array) => {
    SetSortState(false)
    return array.sort((a, b) => parseFloat(a.flight_number) - parseFloat(b.flight_number))
  };

  const handleSortDescending = (array) => {
    SetSortState(true)
    return array.sort((a, b) => parseFloat(b.flight_number) - parseFloat(a.flight_number))
  };

  return !loaded ? (
    <ActivityIndicator animating={true} />
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.TitleContainer}>
        <Text style={styles.Title}>SpaceX Launches</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" icon="arrow-down-circle" color='blue' onPress={() => handleSortByYear}>Filter by Year</Button>
          {!sortState ? <Button mode="contained" icon="arrow-down-circle" color='blue' onPress={() => handleSortDescending(launchList)}>Sort Descending</Button>
            : 
          <Button mode="contained" icon="arrow-up-circle" color='blue' onPress={() => handleSortAscending(launchList)}>Sort Ascending</Button>
            }
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
});