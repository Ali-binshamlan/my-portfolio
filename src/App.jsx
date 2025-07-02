// App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import WorkExperience from "./components/WorkExperience";
import MyProjects from "./components/MyProjects";
import ProjectDetails from "./components/ProjectDetails"; // تأكد أنه موجود

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="mt-10">
                <HeroSection />
              </div>
              <div className="mt-10">
                <WorkExperience />
              </div>
              <div className="mt-10">
                <MyProjects />
              </div>
            </>
          }
        />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Routes>
    </>
  );
}
