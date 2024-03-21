import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [descrtiption, setDescrtiption] = useState("");
  const [todos, setTodos] = useState([]);

  const generateRandomId = () => Math.floor(Math.random() * 100);

  return (
    <div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="title"
        value={title}
      />
      <input
        onChange={(e) => setDescrtiption(e.target.value)}
        type="text"
        placeholder="descrtiption"
        value={descrtiption}
      />
      <button
        onClick={() =>
          setTodos((todos) => [
            ...todos,
            { title, descrtiption, id: generateRandomId() },
          ])
        }
      >
        Submit
      </button>
      <br />
      <br />

      {todos?.map((todo) => {
        return (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.descrtiption}</p>
            <small>{todo.id}</small>
          </div>
        );
      })}
    </div>
  );
}

export default App;
