import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('../../public/images/LandingPageBackground.png')] bg-no-repeat bg-center bg-cover relative">
      <div className="flex flex-col fixed top-0 left-0 right-0 z-40 w-full shadow-xl">
        <Navbar />
      </div>
      <div className="flex flex-col justify-center flex-grow w-1/2">
        <LoginForm />
      </div>
    </div>
  );
}
