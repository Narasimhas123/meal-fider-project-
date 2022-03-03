import React from "react";
import "./Meal.css";
import "./App.css";
import { useState, useRef } from "react";
import Search from "./Search";
import Receipe from "./Receipe";

function Meals() {
  const [keyword, setKeyword] = useState("");
  const [meals, setMeals] = useState([]);
  const [currentReceipe, setCurrentReceipe] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showReceipe, setShowReceipe] = useState(false);
  const resultHeading = useRef();
  const search = async (e) => {
    e.preventDefault();
    if (keyword === "") {
      alert("Please enter a meals");
      return;
    }
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + keyword
      );
      const data = await response.json();
      if (data.meals === null) {
        resultHeading.current.textContent = `There are no search results. Try again`;
        return;
      }
      setMeals(data.meals);
      setShowResult(true);
      setShowReceipe(false);
      setKeyword("");
      resultHeading.current.textContent = `Search result for '${keyword}':`;
    } catch (error) {
      console.log(error);
    }
  };

  const random = async () => {
    try {
      setMeals([]);
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php" + keyword
      );
      const data = await response.json();
      setCurrentReceipe(data.meals[0]);
      setShowReceipe(true);
      setShowResult(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Meal Finder</h1>
      <div className="flex">
        <form className="flex" id="submit" onSubmit={search}>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search for meals or keywords"
          />

          <button className="search-btn" type="submit">
            search
          </button>
        </form>
        <button className="random-btn" id="random" onClick={random}>
          random
        </button>
      </div>

      {showResult ? (
        <div>
          <div id="result-heading">
            <h2 ref={resultHeading}></h2>
          </div>
          <Search meals={meals} />
        </div>
      ) : null}
      {showReceipe ? <Receipe meal={currentReceipe} /> : null}
    </div>
  );
}

export default Meals;
