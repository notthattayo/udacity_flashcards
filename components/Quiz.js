import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { black, white, red, pink, gray } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

class Quiz extends Component {
  state = {
    showAnswer: false,
    question: {},
    currentQuestion: 0,
    correctAnswers: 0,
    finishedQuiz: false,
  };
  constructor(props) {
    super(props);
  }

  setNotification = () => {
    clearLocalNotification().then(setLocalNotification);
  };
  render() {
    const { navigation } = this.props;
    const { deckId, deck } = this.props.route.params;
    const numberOfQuestions = deck.questions.length;

    return (
      <View>
        {numberOfQuestions === 0 ? (
          <View>
            <View style={styles.questionContainer}>
              <Text style={styles.cardText}>No Cards in this deck yet</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewQuestion", { deckId })}
              style={styles.submitBtn}
            >
              <Text style={styles.btnText}>Add Cards</Text>
            </TouchableOpacity>
          </View>
        ) : !this.state.finishedQuiz ? (
          <View>
            <View style={styles.questionContainer}>
              <Text style={styles.cardText}>
                Question - {deck.questions[this.state.currentQuestion].question}
              </Text>
              <Text style={styles.subText}>
                {numberOfQuestions - (this.state.currentQuestion + 1)}{" "}
                question(s) remaining
              </Text>
            </View>

            {!this.state.showAnswer ? (
              <TouchableOpacity
                onPress={() => this.setState({ showAnswer: true })}
                style={styles.submitBtn}
              >
                <Text style={styles.btnText}>Show Answer</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <View style={styles.questionContainer}>
                  <Text style={styles.cardText}>
                    Answer - {deck.questions[this.state.currentQuestion].answer}
                  </Text>

                  <Text style={styles.subText}>How did you do?</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      correctAnswers: this.state.correctAnswers + 1,
                    });
                    if (this.state.currentQuestion < numberOfQuestions - 1) {
                      this.setState({
                        currentQuestion: this.state.currentQuestion + 1,
                      });
                      this.setState({ showAnswer: false });
                    } else {
                      this.setState({ finishedQuiz: true });
                    }
                  }}
                  style={styles.correctBtn}
                >
                  <Text style={styles.btnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.currentQuestion < numberOfQuestions - 1) {
                      this.setState({
                        currentQuestion: this.state.currentQuestion + 1,
                      });
                      this.setState({ showAnswer: false });
                    } else {
                      this.setState({ finishedQuiz: true });
                    }
                  }}
                  style={styles.wrongBtn}
                >
                  <Text style={styles.btnText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <>
            {this.setNotification()}
            <View>
              <View style={styles.questionContainer}>
                <Text style={styles.cardText}>
                  You got {this.state.correctAnswers} right out of{" "}
                  {numberOfQuestions}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("IndividualDeck", { deckId })
                }
                style={styles.submitBtn}
              >
                <Text style={styles.btnText}>Back To Deck</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showAnswer: false,
                    currentQuestion: 0,
                    correctAnswers: 0,
                    finishedQuiz: false,
                  });
                }}
                style={styles.restart}
              >
                <Text style={styles.btnText}>Restart Quiz</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    borderBottomWidth: 1,
    paddingBottom: 40,
  },
  restart: {
    marginBottom: 10,
    backgroundColor: black,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  cardText: {
    color: black,
    fontSize: 27,
    marginBottom: 10,
  },
  subText: {
    color: black,
    fontSize: 20,
    marginBottom: 20,
  },
  submitBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: pink,
    height: 50,
  },
  btnText: {
    color: white,
    fontSize: 20,
  },
  correctBtn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: gray,
    height: 50,
  },
  correctText: {
    color: black,
    fontSize: 20,
  },
  wrongBtn: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: red,
  },
  wrongText: {
    color: white,
    fontSize: 20,
  },
});

export default Quiz;
