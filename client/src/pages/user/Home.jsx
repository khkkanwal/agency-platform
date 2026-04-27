import React from "react";
import {
  About,
  About2,
  Hero,
  Navbar,
  ServiceCard,
  TopBar,
  Portfolio,
  Blog,
  Contact,
  Footer,
} from "../../components";

function Home() {
  return (
    <div>
      <TopBar />
      <Navbar />
      <Hero />
      <ServiceCard />
      <About />
      <About2 />
      <Portfolio />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
