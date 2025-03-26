import React, { useState } from 'react';
import './App.css';
import axios from 'axios'; // Импортиране на Axios

const API_URL = 'http://127.0.0.1:8000'; // URL на бекенд API-то

function App() {
  const [ingredients, setIngredients] = useState(['', '', '']);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // Добавяне на state за индикация при зареждане
  const [error, setError] = useState('');       // Добавяне на state за показване на грешки

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, '']);
  };

  const getRecipes = async () => {
    setLoading(true);
    setError('');
    try {
 const response = await axios.post(`${API_URL}/recipes/`, ingredients.filter(ing => ing !== ''));

      setRecipes(response.data.recipes); // Обновяване на state с рецептите от бекенда
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Възникна грешка при получаване на рецептите. Моля, опитайте отново по-късно.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Какво имаш в хладилника?</h1>
        <div>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Продукт ${index + 1}`}
              value={ingredient}
              onChange={(event) => handleIngredientChange(index, event)}
            />
          ))}
          {ingredients.length < 6 && (
            <button onClick={addIngredientField}>Добави продукт</button>
          )}
        </div>
        <button onClick={getRecipes} disabled={loading}>
          {loading ? 'Зареждане...' : 'Намери рецепти'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {recipes.length > 0 && (
          <div>
            <h2>Рецепти:</h2>
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>{recipe.title}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;