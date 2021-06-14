import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { white, black, gray, pink } from "../utils/colors";
import { saveDeckTitle } from "../utils/api";
import { addDeck } from "../actions";
import { DeviceEventEmitter } from "react-native";

class NewDeck extends Component {
  state = {
    deckTitle: "",
  };
  onTextChange = this.onTextChange.bind(this);
  onSubmit = this.onSubmit.bind(this);

  onTextChange(deckTitle) {
    this.setState(() => ({
      deckTitle,
    }));
  }
  onSubmit() {
    const { deckTitle } = this.state;
    const { dispatch, navigation } = this.props;
    saveDeckTitle(deckTitle).then((newDeck) => {
      console.log(newDeck);
      dispatch(addDeck(newDeck));
      DeviceEventEmitter.emit("asyncStorageUpdated", {});
      navigation.navigate("IndividualDeck", {
        deckId: deckTitle,
        decks: newDeck,
      });
    });
    this.setState(() => ({
      deckTitle: "",
    }));
  }

  render() {
    const { deckTitle } = this.state;
    return (
      <View>
        <Text style={styles.inputLabel}>Deck Name</Text>
        <TextInput
          value={deckTitle}
          placeholder="What is the name of your deck?"
          onChangeText={(deckTitle) => this.onTextChange(deckTitle)}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={this.onSubmit}
          disabled={deckTitle === ""}
          style={deckTitle === "" ? styles.disabledBtn : styles.submitBtn}
        >
          <Text style={deckTitle === "" ? styles.disabledText : styles.btnText}>
            Create Deck
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 20,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: black,
    fontSize: 20,
    height: 50,
    marginTop: 5,
    paddingLeft: 5,
  },
  disabledBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 70,
    marginBottom: 15,
    backgroundColor: gray,
    height: 50,
  },
  submitBtn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginTop: 80,
    marginBottom: 10,
    backgroundColor: pink,
  },
  btnText: {
    color: white,
    fontSize: 20,
  },
  disabledText: {
    color: "lightgrey",
    fontSize: 20,
  },
});

export default connect()(NewDeck);
