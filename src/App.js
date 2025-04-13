import React from "react";
import CharacterList from "./components/CharacterList";
import LanguageSwitcher from "./components/LanguageSwitcher";

function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <LanguageSwitcher />
      <h1 style={{ padding: "1rem", textAlign: "center" }}>Rick and Morty Explorer</h1>
      <CharacterList />
    </div>
  );
}

export default App;
