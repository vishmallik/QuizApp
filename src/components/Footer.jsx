import React from "react";

export default function Footer() {
  return (
    <footer className=" mx-auto bg-black text-center mt-4 py-6 text-white">
      <p className="text-xl">&copy; Visawjeet Mallik, 2022</p>
      <a
        href="https://github.com/vishmallik/QuizApp"
        className="text-4xl py-2 inline-block "
      >
        <i className="fab fa-github hover:text-yellow-400"></i>
      </a>
    </footer>
  );
}
