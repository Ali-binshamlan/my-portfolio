
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WorkExperience from './components/WorkExperience'
export default function App() {
  return (
    <div>
      <Navbar />
      <div className='mt-10'>
      <HeroSection />
      </div>
      <div className='mt-10'>
        <WorkExperience/>
      </div>
  
      
    </div>
  );
}
