import React from "react";
import { Link } from "react-router-dom";
import data from "../data";

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: "",
      difficulty: "",
    };
  }
  componentDidMount() {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ categories: data.trivia_categories });
      });
  }

  selectDifficulty = (level) => {
    this.setState({
      difficulty: level,
    });
  };
  render() {
    return (
      <>
        <h2 className="text-5xl text-center py-12 text-red-400 font-semibold">
          Difficulty
        </h2>
        <div className="mx-auto text-center ">
          <button
            className={`text-xl  px-8 py-2 bg-yellow-300 hover:bg-red-400 mx-6 rounded-md ${
              this.state.difficulty === "easy" ? "active" : ""
            }`}
            onClick={() => this.selectDifficulty("easy")}
          >
            Easy
          </button>
          <button
            className={`text-xl  px-8 py-2 bg-yellow-300 hover:bg-red-400 mx-6 rounded-md ${
              this.state.difficulty === "medium" ? "active" : ""
            }`}
            onClick={() => this.selectDifficulty("medium")}
          >
            Medium
          </button>
          <button
            className={`text-xl  px-8 py-2 bg-yellow-300 hover:bg-red-400 mx-6 rounded-md ${
              this.state.difficulty === "hard" ? "active" : ""
            }`}
            onClick={() => this.selectDifficulty("hard")}
          >
            Hard
          </button>
        </div>
        <h2 className="text-5xl text-center py-12 text-red-400 font-semibold">
          {" "}
          All Categories
        </h2>
        {!this.state.categories ? (
          <span className="loader"></span>
        ) : (
          <ul className="grid grid-cols-3 gap-8 gap-y-16 py-10">
            {this.state.categories.map((category) => {
              return (
                <li
                  className=" mx-4 my-2  rounded-md flex h-40 border-solid border-gray-400 bg-gray-100"
                  key={category.id}
                >
                  <img
                    className=" basis-4/12 shrink grow-0 w-40 h-40 object-cover"
                    src={data[category.name]}
                    alt={category.name}
                  />
                  <div className="basis-8/12 shrink grow-0 p-6  ">
                    <h2 className="text-xl font-semibold pb-6">
                      {category.name}
                    </h2>
                    <Link
                      className="px-4 py-2 bg-yellow-300 hover:bg-red-400 rounded-lg inline-block cursor-pointer"
                      to={`/quiz?category=${category.id}&difficulty=${this.state.difficulty}`}
                    >
                      Take Quiz?
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </>
    );
  }
}
