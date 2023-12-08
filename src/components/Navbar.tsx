import Logo from "./Logo";

export default function Navbar() {
    return (
        <nav className="bg-white border-gray-200">
        <div className="min-w-screen flex flex-wrap items-center justify-between mx-10 p-1">
            <a href="/" className="flex items-center space-x-4 rtl:space-x-reverse">
                <Logo height="20" width="20" />
                <span className="self-center text-2xl text-shoewizards-medium-blue font-bold whitespace-nowrap medium:text-white">ShoeWizards</span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 medium:text-gray-400 medium:hover:bg-gray-700 medium:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <a href="/login">
                <button type="button" className="w-auto text-shoewizards-medium-blue bg-white hover:text-white border-2 border-shoewizards-medium-blue hover:bg-shoewizards-medium-blue font-bold text-lg rounded-full px-16 py-2 text-center">LOGIN</button>
            </a>
            </div>
        </div>
        </nav>
    );
}