import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
  ToTop,
} from "./components";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserContextProvider } from "./context/UserContext";
import DetailPost from "./pages/DetailPost";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="relative z-0 bg-primary">
                <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                  <Hero />
                </div>
                <About />
                <Tech />
                <Experience />
                <Works />
                <Feedbacks />
                <div className="relative z-0">
                  <Contact />
                  <StarsCanvas />
                </div>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetailPost />} />
          <Route path="/blog/create" element={<CreateBlog />} />
        </Routes>

        <ToTop />
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
