import "./App.css";
import Game from "./components/tic-tac-toe/Game";
import FirebaseApp from "./firebase/FirebaseApp";
import FirebaseAuth from "./firebase/FirebaseAuth";

function App() {
  return (
    <div className="App">
      {/* <Game /> */}
      {/* <FirebaseApp></FirebaseApp> */}
      <FirebaseAuth></FirebaseAuth>
    </div>
  );
}

export default App;
