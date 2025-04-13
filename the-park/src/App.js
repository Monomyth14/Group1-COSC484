import './App.css';
import petImage from './petpic.png';
import logo from './logo2.png'

function App() {
  return (
    <div className="landing">
      <div className="image-container">
        <img src={petImage} alt="Pet" />
      </div>
      <div className="text-section">
        <div className="text-container">
          <img src={logo} alt="Pet Social Logo" className="logo" />
          <p>A place to share all your favorite pet pictures with family and friends.</p>
          <button>Sign Up</button>
          <button>Log In</button>
        </div>
      </div>
    </div>
  );
}
export default App;