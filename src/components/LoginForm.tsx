import { useState, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
  };

    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            // Make a POST request to the login endpoint
            const response = await axios.post(
                "https://shoewizardsdb.azurewebsites.net/authentications/login",
                formData,
            );

            console.log(response);

            // Extract the token from the response
            const token = response.data.access_token;

            // Save the token to localStorage
            localStorage.setItem("token", token);

            console.log(localStorage.getItem("token"));

            // Display a success notification
            toast.success("Login successful.", {
                position: toast.POSITION.TOP_CENTER,
            }
            );

            navigate("/home");

            // You can redirect to another page or perform other actions here
        } catch (error) {
            console.error(error);
            // Display an error notification
            toast.error("Login failed.", {
                position: toast.POSITION.TOP_CENTER,
            }
            );
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="w-full bg-white rounded-3xl shadow-2xl md:mt-0 xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex items-center justify-center">
                        <div className="p-4 space-y-4 md:space-y-6 sm:p-6 w-full">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-shoewizards-medium-blue md:text-4xl text-center">
                                LOGIN
                            </h1>
                            <form className="space-y-4 md:space-y-6"
                            onSubmit={(e) => handleLogin(e)}
                            >
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-md font-medium text-shoewizards-dark-blue"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required={true}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                <label
                    htmlFor="password"
                    className="block mb-2 text-md font-medium text-shoewizards-dark-blue"
                  >
                    Password
                  </label>
                  <div className="flex items-center justify-between">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10"
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-2/4 transform -translate-y-1/2 text-gray-400 hover:underline mt-4"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? 
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M13.4875 16.14L11.47 14.1212C10.6898 14.4002 9.84643 14.4519 9.03803 14.2702C8.22962 14.0886 7.48941 13.6811 6.90352 13.0952C6.31764 12.5093 5.91018 11.7691 5.72854 10.9607C5.5469 10.1523 5.59856 9.30895 5.8775 8.52875L3.3025 5.95375C1.1725 7.8475 0 10 0 10C0 10 3.75 16.875 10 16.875C11.2005 16.8708 12.3874 16.6207 13.4875 16.14ZM6.5125 3.86C7.61257 3.37928 8.79949 3.12913 10 3.125C16.25 3.125 20 10 20 10C20 10 18.8263 12.1512 16.6988 14.0475L14.1212 11.47C14.4002 10.6898 14.4519 9.84643 14.2702 9.03803C14.0886 8.22962 13.6811 7.48941 13.0952 6.90352C12.5093 6.31764 11.7691 5.91018 10.9607 5.72854C10.1523 5.5469 9.30895 5.59856 8.52875 5.8775L6.5125 3.86Z" fill="currentcolor"/>
                                <path d="M6.90637 9.5575C6.83761 10.0379 6.88167 10.5277 7.03507 10.9881C7.18847 11.4485 7.44698 11.8668 7.79013 12.21C8.13328 12.5531 8.55163 12.8116 9.01203 12.965C9.47243 13.1184 9.96223 13.1625 10.4426 13.0937L6.90637 9.5575ZM13.0939 10.4425L9.55762 6.905C10.038 6.83624 10.5278 6.8803 10.9882 7.0337C11.4486 7.1871 11.867 7.44561 12.2101 7.78876C12.5533 8.13191 12.8118 8.55026 12.9652 9.01066C13.1186 9.47106 13.1626 9.96086 13.0939 10.4412V10.4425ZM17.0576 17.9425L2.05762 2.9425L2.94262 2.0575L17.9426 17.0575L17.0576 17.9425Z" fill="currentcolor"/>
                            </svg>
                        ) :
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10.0002 7.5C9.33712 7.5 8.70124 7.76339 8.23239 8.23223C7.76355 8.70107 7.50016 9.33696 7.50016 10C7.50016 10.663 7.76355 11.2989 8.23239 11.7678C8.70124 12.2366 9.33712 12.5 10.0002 12.5C10.6632 12.5 11.2991 12.2366 11.7679 11.7678C12.2368 11.2989 12.5002 10.663 12.5002 10C12.5002 9.33696 12.2368 8.70107 11.7679 8.23223C11.2991 7.76339 10.6632 7.5 10.0002 7.5ZM10.0002 14.1667C8.89509 14.1667 7.83529 13.7277 7.05388 12.9463C6.27248 12.1649 5.8335 11.1051 5.8335 10C5.8335 8.89493 6.27248 7.83512 7.05388 7.05372C7.83529 6.27232 8.89509 5.83333 10.0002 5.83333C11.1052 5.83333 12.165 6.27232 12.9464 7.05372C13.7278 7.83512 14.1668 8.89493 14.1668 10C14.1668 11.1051 13.7278 12.1649 12.9464 12.9463C12.165 13.7277 11.1052 14.1667 10.0002 14.1667ZM10.0002 3.75C5.8335 3.75 2.27516 6.34167 0.833496 10C2.27516 13.6583 5.8335 16.25 10.0002 16.25C14.1668 16.25 17.7252 13.6583 19.1668 10C17.7252 6.34167 14.1668 3.75 10.0002 3.75Z" fill="currentcolor"/>
                            </svg>
                        )  
                    }
                    </button>
                  </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-shoewizards-medium-blue hover:bg-shoewizards-medium-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    LOGIN
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    Don't have an account yet?{" "}
                                    <a
                                        href="/register"
                                        className="font-medium text-shoewizards-dark-blue hover:underline"
                                    >
                                        Register
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
