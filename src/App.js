import React from "react";
import CharacterList from "./components/CharacterList";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <CharacterList />
    </div>
  );
}

export default App;
