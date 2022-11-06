import React from "react";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNo: 9,
      answers: {},
      questions: null,
    };
  }
  componentDidMount() {
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
  randomizeAnswers = (allAnswers) => {
    return allAnswers.sort(() => Math.random() - 0.5);
  };
  handleSelect = (question, answer) => {
    this.setState({
      answers: Object.assign(this.state.answers, this.state.answers, {
        [question]: answer,
      }),
    });
  };

  render() {
    let { questionNo, questions } = this.state;

    return (
      <div className="w-1/2 mx-auto">
        <p>Question {questionNo}/10</p>
        <progress min="0" max="10" value={questionNo}></progress>
        {!questions ? (
          <span className="loader"></span>
        ) : (
          <>
            <h2
              dangerouslySetInnerHTML={{
                __html: `${questions[questionNo].question}`,
              }}
              className="text-4xl font-bold my-10"
            ></h2>
            <ul>
              {this.randomizeAnswers(
                questions[questionNo].incorrect_answers
                  .concat(questions[questionNo].correct_answer)
                  .map((answer) => {
                    return (
                      <li
                        className="text-xl py-4 px-6 border-solid border-2 border-slate-200 rounded-md my-6 hover:text-green-500 cursor-pointer"
                        onClick={() => this.handleSelect(questionNo, answer)}
                      >
                        {answer}
                      </li>
                    );
                  })
              )}
            </ul>
          </>
        )}
      </div>
    );
  }
}
