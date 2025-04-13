import React from "react";
import CharacterList from "./components/CharacterList";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="lang-switcher">
        <LanguageSwitcher />
      </div>
      <h1>Rick and Morty Explorer</h1>
      <CharacterList />
    </div>
  );
}

export default App;
