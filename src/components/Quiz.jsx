import { decode } from "html-entities";
import React from "react";
import { Link } from "react-router-dom";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNo: 0,
      questions: null,
    };
  }
  componentDidMount() {
    if (this.props.location.state) {
      this.props.location.state.retest &&
        this.setState({ questions: this.props.location.state.questions });
    } else if (localStorage.questionNo && localStorage.questions) {
      this.setState({
        questionNo: JSON.parse(localStorage.questionNo),
        questions: JSON.parse(localStorage.questions),
      });
    } else {
      let query = {};
      let queries = new URLSearchParams(this.props.location.search);
      queries.forEach((value, key) => {
        query[key] = value;
      });
      fetch(
        `https://opentdb.com/api.php?amount=10&category=${query.category}&difficulty=${query.difficulty}`
      )
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            questions: data.results,
          })
        );
    }

    window.addEventListener("beforeunload", () => {
      this.handleUpdateLocalStorage("questionNo", this.state.questionNo);
      this.handleUpdateLocalStorage("questions", this.state.questions);
    });
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", () => {
      this.handleUpdateLocalStorage("questionNo", this.state.questionNo);
      this.handleUpdateLocalStorage("questions", this.state.questions);
    });
  }
  randomizeAnswers = (allAnswers) => {
    return allAnswers.sort(() => Math.random() - 0.5);
  };
  nextQuestion = () => {
    if (this.state.questionNo < 10) {
      this.setState({
        questionNo: this.state.questionNo + 1,
      });
    }
  };
  handleUpdateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  render() {
    let { questionNo, questions } = this.state;

    return (
      <div className="w-1/2 mx-auto py-6 min-h-73">
        <p className="font-semibold">Question {questionNo + 1}/10</p>
        <progress min="0" max="10" value={questionNo + 1}></progress>
        {!questions ? (
          <span className="loader"></span>
        ) : (
          <Question
            questionNo={questionNo}
            questions={questions}
            answers={this.randomizeAnswers(
              questions[questionNo].incorrect_answers.concat(
                questions[questionNo].correct_answer
              )
            )}
            nextQuestion={this.nextQuestion}
            handleUpdateLocalStorage={this.handleUpdateLocalStorage}
          />
        )}
      </div>
    );
  }
}

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_answers: {},
    };
  }
  handleSelect = (question, answer) => {
    this.setState((prevState) => {
      return {
        user_answers: { ...prevState.user_answers, [question]: answer },
      };
    });
  };
  componentDidMount() {
    if (localStorage.user_answers) {
      this.setState({
        user_answers: JSON.parse(localStorage.user_answers),
      });
    }
    window.addEventListener("beforeunload", () =>
      this.props.handleUpdateLocalStorage(
        "user_answers",
        this.state.user_answers
      )
    );
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", () =>
      this.props.handleUpdateLocalStorage(
        "user_answers",
        this.state.user_answers
      )
    );
  }

  render() {
    let { user_answers } = this.state;
    let { answers, nextQuestion, questionNo, questions } = this.props;
    let singleQuestion = questions[questionNo];
    return (
      <>
        <h2 className="text-4xl font-bold my-10">
          {decode(singleQuestion.question)}
        </h2>
        <ul>
          {answers.map((answer) => {
            return (
              <li
                key={answer}
                className={`text-xl py-4 px-6 border-solid border-2 border-slate-200 rounded-md my-6 hover:text-green-500 cursor-pointer ${
                  user_answers[questionNo] === answer ? "selected" : ""
                }`}
                onClick={() => this.handleSelect(questionNo, answer)}
              >
                {decode(answer)}
              </li>
            );
          })}
        </ul>
        {questionNo < 9 ? (
          <button
            className={`px-8 mr-0 ml-auto py-2 bg-green-500 text-xl font-semibold text-white rounded-sm text-left my-12 block ${
              user_answers[questionNo]
                ? "bg-green-600"
                : "bg-slate-400 cursor-not-allowed"
            }`}
            onClick={this.state.user_answers[questionNo] ? nextQuestion : null}
          >
            Next
          </button>
        ) : (
          <button
            className={`px-8 mr-0 ml-auto py-2 bg-green-500 text-xl font-semibold text-white rounded-sm text-left my-12 block ${
              user_answers[questionNo]
                ? "bg-green-600"
                : "bg-slate-400 cursor-not-allowed"
            }`}
          >
            <Link
              to={{
                pathname: "/quiz/result",
                state: {
                  answers: user_answers,
                  questions,
                },
              }}
            >
              Submit
            </Link>
          </button>
        )}
      </>
    );
  }
}
