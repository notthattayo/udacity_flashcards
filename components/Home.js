import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { black, pink } from "../utils/colors";
import { getDecks } from "../utils/api";
import { receiveDecks } from "../actions";
import { DeviceEventEmitter } from "react-native";

class Home extends Component {
  state = {
    decks: {},
  };
  _isMounted = false;

  initializeData() {
    getDecks()
      .then((decks) => {
        if (decks) {
          let decksParsed = JSON.parse(decks);
          this.props.dispatch(receiveDecks(decksParsed));
          this.setState({ decks: decksParsed });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      DeviceEventEmitter.addListener("asyncStorageUpdated", () => {
        this.initializeData();
      });
    }
    this.initializeData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { navigation } = this.props;
    const { decks } = this.state;
    return (
      <View>
        {Object.keys(decks).length === 0 ? (
          <View>
            <Text style={{ fontSize: 16, textAlign: "center" }}>
              No Decks Found, Please add a new Deck
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewDeck")}
              style={styles.submitBtn}
            >
              <Text style={styles.btnText}>Create New Deck</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              {Object.keys(decks).map((deck) => (
                <TouchableOpacity
                  key={deck}
                  onPress={() =>
                    navigation.navigate("IndividualDeck", {
                      deckId: deck,
                      decks: decks,
                    })
                  }
                >
                  <ScrollView contentContainerStyle={styles.decks}>
                    <Text style={{ fontSize: 24, color: black }}>
                      {decks[deck].title}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      {`${decks[deck].questions.length} flashcards`}
                    </Text>
                  </ScrollView>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                onPress={() => navigation.navigate("NewDeck")}
                style={styles.submitBtn}
              >
                <Text style={styles.btnText}>Create Deck</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "lightgrey",
    padding: 20,
  },
  decks: {
    flex: 1,
    height: 70,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    color: black,
  },
  submitBtn: {
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: pink,
    height: 50,
    color: black,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  btnText: {
    color: black,
    fontSize: 20,
  },
});

export default connect()(Home);
