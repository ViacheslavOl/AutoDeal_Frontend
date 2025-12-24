import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Hero from "../Hero/Hero";
import AutomotiveBrand from "../AutomotiveBrand/AutomotiveBrand";
import Advantage from "../Advantage/Advantage";
import Catalog from "../Catalog/Catalog";
import Consultation from "../Consultation/Consultation";
import Review from "../Review/Review";
import Question from "../Question/Question";
import CarSelection from "../CarSelection/CarSelection";
import Card from "../Card/Card";
import Layout from "../Layout/Layout";

const Home = () => (
  <>
    <Hero />
    <AutomotiveBrand />
    <Advantage />
    <Catalog />
    <Consultation />
    <Review />
    <Question />
    <CarSelection />
  </>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dev" element={<Card />} />
        </Route>
      </Routes>
    </Router>
  );
}
