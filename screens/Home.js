import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: "http://6d53ce2523cc.ngrok.io"
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        return this.setState({
          listData: response.data.data
        });
      })
      .catch(error => {
        console.log("Home.........")
        Alert.alert(error.message);
      });
  };

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={`Planet : ${item.name}`}
      subtitle={`Distance from earth : ${item.distance_from_earth}`}
      titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
      chevron
      onPress={() =>
        this.props.navigation.navigate("Details", { planet_name: item.name })
      }
    />
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { listData } = this.state;

    if (listData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>PlanetWorld</Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            style={{width:'100%',height:'100%'}}
            keyExtractor={this.keyExtractor}
            data={this.state.listData}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988"
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    width:'100%'

  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743",

  },
  lowerContainer: {
    flex: 0.9,
    height:1000
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainerText: {
    fontSize: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e"
  },
  listContainer: {
    backgroundColor: "#eeecda",
    width:'100%'
  }
});
