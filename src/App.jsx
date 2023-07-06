import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  ToTop,
  SectionBlog,
} from "./components";
import Blog from "./pages/Blog";
import DetailPost from "./pages/DetailPost";
import NotFound from "./pages/404";
import Playgrounds from "./pages/Playgrounds";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative z-0 bg-primary">
              <Navbar />
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Hero />
              </div>
              <About />
              <Tech />
              <Experience />
              <Works />
              <SectionBlog />
              <div className="relative z-0">
                <Contact />
                <StarsCanvas />
              </div>
            </div>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<DetailPost />} />
        <Route path="/playgrounds" element={<Playgrounds />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToTop />
    </BrowserRouter>
  );
};

export default App;
