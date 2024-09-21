
import './App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import WeatherApp from './weather';
import MyGarden from './MyGarden';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <WeatherApp/>
    <MyGarden/>
    <Footer/>
    
    </div>
  );
}

export default App;
