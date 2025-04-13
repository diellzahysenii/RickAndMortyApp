import React from "react";
import CharacterList from "./components/CharacterList";

function App() {
  return (
    <div className="App">
      <h1 style={{ padding: "1rem" }}>Rick and Morty Explorer</h1>
      <CharacterList />
    </div>
  );
}

export default App;
