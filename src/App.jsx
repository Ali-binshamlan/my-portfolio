import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WorkExperience from "./components/WorkExperience";
import MyProjects from "./components/MyProjects";
import ProjectDetails from "./components/ProjectDetails";
import MySkills from "./components/MySkills";
import GetInTouch from "./components/GetInTouch";
import Projects from "./components/Projects";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop /> 
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="">
                <HeroSection />
              </div>
              <div className="">
                <WorkExperience />
              </div>
              <div className="">
                <MyProjects />
              </div>
              <div className="">
                <MySkills />
              </div>
              <div className="">
                <GetInTouch />
              </div>
            </>
          }
        />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/Contact" element={<GetInTouch />} />
      </Routes>
    </>
  );
}
