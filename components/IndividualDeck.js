import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { white, pink, black, gray } from "../utils/colors";
import { getDeck } from "../utils/api";
import { DeviceEventEmitter } from "react-native";
class IndividualDeck extends Component {
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      DeviceEventEmitter.addListener("asyncStorageUpdated", () => {
        if (this.props.route.params.deckId) {
          getDeck(this.props.route.params.deckId);
        }
      });
    }
  }
  render() {
    const { navigation, route } = this.props;
    const { deckId, decks } = route.params;
    return (
      <View>
        <View style={styles.questionContainer}>
          <Text style={styles.cardText}>{deckId}</Text>
          <Text style={{ fontSize: 25 }}>
            {decks[deckId].questions.length} flashcards
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Quiz", { deckId, deck: decks[deckId] })
          }
          style={styles.submitBtn}
        >
          <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewQuestion", { deckId })}
          style={styles.addBtn}
        >
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  questionContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 40,
    justifyContent: "space-between",
    backgroundColor: gray,
    borderBottomWidth: 1,
  },
  submitBtn: {
    marginTop: 80,
    marginBottom: 10,
    backgroundColor: black,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  btnText: {
    color: white,
    fontSize: 20,
  },
  cardText: {
    color: black,
    fontSize: 40,
  },
  addBtn: {
    alignItems: "center",
    backgroundColor: pink,
    height: 50,
    alignItems: "center",
  },
});
export default connect()(IndividualDeck);
