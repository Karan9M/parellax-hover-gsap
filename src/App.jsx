import React from "react";
import Navbar from "./components/Navbar";
import MainSection from "./sections/MainSection";
import Footer from "./components/Footer";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

gsap.registerPlugin(CustomEase);
CustomEase.create(
  "customEase",
  "M0,0 C0.126,0.382 0.302,0.712 0.478,0.838 0.654,0.964 0.842,1 1,1 "
);

const App = () => {
  return (
    <main>
      <Navbar />
      <MainSection />
      <Footer />
    </main>
  );
};

export default App;
