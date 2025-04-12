import './App.css';
import petImage from './petpic.png';

function App() {
  return (
    <div className="landing">
      <div className="image-container">
        <img src={petImage} alt="Pet" />
      </div>
      <div className="text-container">
        <h1>🌳 The Park 🌳</h1>
        <p>A place to share all your favorite pet pictures with you family and friends!</p>
        <button>Sign Up</button><br></br>
        <button>Log In</button>
      </div>
    </div>
  );
}
export default App;