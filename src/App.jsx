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
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import { UserContextProvider } from "./context/UserContext";
import DetailPost from "./pages/DetailPost";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/404";
import Home from "./pages/admin/Home";
import Projects from "./pages/admin/Projects";
import Blogs from "./pages/admin/Blogs";
import CreateProject from "./pages/admin/CreateProject";
import EditProject from "./pages/admin/EditProject";

const App = () => {
  return (
    <UserContextProvider>
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
          <Route exact path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<DetailPost />} />
          <Route path="/blog/create" element={<CreateBlog />} />
          <Route path="/blog/edit/:id" element={<EditPost />} />
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/blogs" element={<Blogs />} />
          <Route path="/admin/projects" element={<Projects />} />
          <Route path="/admin/blogs/create" element={<CreateBlog />} />
          <Route path="/admin/projects/create" element={<CreateProject />} />
          <Route path="/admin/blogs/:id/edit" element={<EditPost />} />
          <Route path="/admin/projects/:id/edit" element={<EditProject />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToTop />
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
