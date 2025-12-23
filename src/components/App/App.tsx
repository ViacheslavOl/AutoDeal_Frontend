import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import AutomotiveBrand from "../AutomotiveBrand/AutomotiveBrand";
import Advantage from "../Advantage/Advantage";
import Catalog from "../Catalog/Catalog";
import Consultation from "../Consultation/Consultation";
import Review from "../Review/Review";
import Question from "../Question/Question";
import CarSelection from "../CarSelection/CarSelection";
import Footer from "../Footer/Footer";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Hero />
        <AutomotiveBrand />
        <Advantage />
        <Catalog />
        <Consultation />
        <Review />
        <Question />
        <CarSelection />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
