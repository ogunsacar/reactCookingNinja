import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./Create.css";

export default function Create() {
  //adding states for users recipe's

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState(""); // for every  individual ingredient
  const [ingredients, setIngredients] = useState([]); // to store all the ingredients adn show them on the website
  const ingredientInput = useRef(null); // to reference the element we use that
  // we could use useRef for getting users input. console.log(ingredientInput.current.value); // current is the input element

  const history = useHistory();
  const { data, isPending, error, postData } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  // when form onSubmits run this function
  const handleSubmit = (e) => {
    e.preventDefault();

    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
    // console.log(ingredients);
  };

  // when user add's a new ingredient
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim(); //trim users input if they makes space before or after the ingredient

    if (ing && !ingredients.includes(ing)) {
      // if user types anything and doesnt type it again take previous ingredients array and add new ingredient to it
      setIngredients((prevState) => {
        return [...prevState, ing];
      });
    }
    setNewIngredient(""); // reset the input
    ingredientInput.current.focus(); // current is the input element // after user types automaticly focus on the input element
  };

  //redirect the user when we get data

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        history.push("/");
      }, 1500);
    }
  }, [data]);

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title} // we put value to reset and get the data user types
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">
              +
            </button>
          </div>
        </label>

        <p className="">
          Ingredients:
          {ingredients.map((ing) => (
            <em key={ing}>{ing},</em>
          ))}
        </p>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking time(minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
