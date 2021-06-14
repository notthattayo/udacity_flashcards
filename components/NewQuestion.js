import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { addCardToDeck } from "../utils/api";
import { gray, pink, white } from "../utils/colors";
import { DeviceEventEmitter, TouchableOpacity } from "react-native";
class NewQuestion extends Component {
  state = {
    question: "",
    answer: "",
  };
  constructor(props) {
    super(props);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeAnswer = this.changeAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeQuestion(question) {
    this.setState(() => ({
      question,
    }));
  }
  changeAnswer(answer) {
    this.setState(() => ({
      answer,
    }));
  }
  handleSubmit() {
    const { route, navigation } = this.props;
    const { deckId } = route.params;
    const { question, answer } = this.state;
    const card = {
      question: question,
      answer: answer,
    };
    addCardToDeck(deckId, card).then((newDecks) => {
      DeviceEventEmitter.emit("asyncStorageUpdated", {});
      navigation.navigate("IndividualDeck", {
        deckId,
        decks: newDecks,
      });
      this.setState(() => ({
        question: "",
        answer: "",
      }));
    });
  }
  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.labelInput}>Question</Text>
        <TextInput
          value={question}
          onChangeText={(question) => this.changeQuestion(question)}
          placeholder="add your question"
          style={styles.textInput}
        />
        <Text style={styles.labelInput}>Answer</Text>
        <TextInput
          value={answer}
          onChangeText={(answer) => this.changeAnswer(answer)}
          placeholder="add the answer"
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={this.handleSubmit}
          disabled={!answer || !question}
          style={!question || !answer ? styles.disabledBtn : styles.submitBtn}
        >
          <Text
            style={!question || !answer ? styles.disabledText : styles.btnText}
          >
            Save Card
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  labelInput: {
    fontSize: 18,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20,
    height: 50,
  },
  submitBtn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: pink,
  },
  btnText: {
    color: white,
    fontSize: 20,
  },
  disabledBtn: {
    marginBottom: 10,
    backgroundColor: gray,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },

  disabledText: {
    color: "lightgrey",
    fontSize: 20,
  },
});
export default NewQuestion;
