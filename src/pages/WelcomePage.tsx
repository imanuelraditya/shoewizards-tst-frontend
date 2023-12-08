import Navbar from "../components/Navbar"

export default function WelcomePage() {
    return (
        <div className="flex overflow-hidden min-h-screen bg-[url('../../images/LandingPageBackground.png')] bg-no-repeat bg-center bg-cover relative">
            <div className="fixed top-0 left-0 right-0 z-40 w-full shadow-xl">
                <Navbar />
            </div>
        </div>
    )
}