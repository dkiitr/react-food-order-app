import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";

const Meals = () => {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            // const res = await fetch("http://localhost:3000/meals");
            const res = await fetch("./available-meals.json");
            const mealsData = await res.json();
            // console.log(mealsData);
            setLoadedMeals(mealsData);
        }
        fetchMeals();
    }, []);

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
};

export default Meals;
