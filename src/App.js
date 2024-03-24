import './App.css';
import Footer from './componenets/Footer/Footer';
import Hero from './componenets/Hero/Hero';
import Plans from './componenets/Plans/Plans';
import Programs from './componenets/Programs/Programs';
import Reasons from './componenets/Reasons/Reasons';
function App() {
  return (
    <div className="App">
        <Hero/>
        <Programs/>
        <Reasons/>
        <Plans/>
        <Footer/>
    </div>
  );
}

export default App;
