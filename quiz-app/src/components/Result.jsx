import { decode } from "html-entities";
import React from "react";
import { Link } from "react-router-dom";

export default class Result extends React.Component {
  constructor(props) {
    super(props);
  }
  calculateScore = (answers, questions) => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.correct_answer === answers[index]) {
        score++;
      }
    });
    return score;
  };
  render() {
    let { answers, questions } = this.props.location.state;
    return (
      <>
        <div className="flex justify-between my-10 w-4/5 mx-auto">
          <h2 className="text-2xl font-bold text-red-500">
            Result of the Quiz
          </h2>
          <button className="px-6 py-2 text-white bg-green-500 rounded-md text-xl">
            <Link
              to={{
                pathname: "/quiz",
                state: { retest: true, questions: questions },
              }}
            >
              Retake this quiz!
            </Link>
          </button>
        </div>

        <table className="border-collapse w-4/5 mx-auto my-10 ">
          <thead>
            <tr>
              <th
                scope="col"
                className="border-1 border-solid border-gray-300 p-6 text-lg w-1/2"
              >
                Question
              </th>
              <th
                scope="col"
                className="border-1 border-solid border-gray-300 p-6 text-lg "
              >
                Correct Answers
              </th>
              <th
                scope="col"
                className="border-1 border-solid border-gray-300 p-6 text-lg"
              >
                You Selected
              </th>
              <th
                scope="col"
                className="border-1 border-solid border-gray-300 p-6 text-lg"
              >
                Right Or Wrong
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => {
              return (
                <tr key={question.question}>
                  <td className="border-1 border-solid border-gray-300 p-6 font-semibold text-lg">
                    {decode(question.question)}
                  </td>
                  <td className="border-1 border-solid border-gray-300 p-6">
                    {decode(question.correct_answer)}
                  </td>
                  <td className="border-1 border-solid border-gray-300 p-6">
                    {answers[index]}
                  </td>
                  <td className="border-1 border-solid border-gray-300 border-collapse p-6 text-center">
                    {question.correct_answer === answers[index] ? (
                      <i className="fa-regular fa-circle-check text-green-500 text-xl"></i>
                    ) : (
                      <i className="fa-regular fa-circle-xmark text-red-500 text-xl"></i>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan="2"
                className="border-1 border-solid border-gray-300 text-xl font-semibold  text-center py-6"
              >
                Total Correct
              </td>
              <td
                colSpan="2"
                className="border-1 border-solid border-gray-300 text-xl font-semibold text-center"
              >
                {this.calculateScore(answers, questions)}
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    );
  }
}
