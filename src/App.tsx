import CharacterCounter  from "./components/CharacterCounter/CharacterCounter";

function App() {
  return(
     <div className="min-h-screen bg-white p-8">
      {/* minWords and maxWords are optional — try it without them too */}
      <CharacterCounter minWords={50} maxWords={300} />
    </div>

  )
}

export default App;