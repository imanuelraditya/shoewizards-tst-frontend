/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from "./Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
    firstname: string,
    lastname: string,
    token: string
}

type UserData = [number, string, string, string, string, string, string, string, string, string];

export default function Sidebar(props: any) {
    const [user, setUser] = useState<User[]>([])

    const getUser = async () => {
        try {
            const response = await axios.post(
                "http://shoewizards.cbh8eahqfjh9hnep.eastus.azurecontainer.io/authentications/current_user",
                null,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const userData = [response.data]

            const result = userData.map((user: UserData) => ({
                firstname: user[1],
                lastname: user[2],
                token: user[9],
            }))

            setUser(result)
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    // console.log(user)

    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            toast.success("Logout successful.", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
        catch (error) {
            console.error(error);
            toast.error("Logout failed.", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }
        

    const menuItems = Array.from({ length: props.number }, (_, index) => (
        <li key={index} className="flex flex-col px-4">
            {
                <button
                    type="button"
                    className="flex text-shoewizards-medium-blue bg-white hover:bg-shoewizards-medium-blue hover:text-white font-medium rounded-2xl px-4 py-3 inline-flex group"
                >
                    <div className="flex flex-col w-52">
                        <a
                            href={props[`page${index + 1}`]}
                            className="flex items-center rounded-lg group"
                        >
                            <div className="absolute group text-shoewizards-medium-blue">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 28 33"
                                    className="h-auto w-5 text-shoewizards-medium-blue group-hover:hidden"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d={props[`path${index + 1}`]}
                                        fill="currentcolor"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 28 33"
                                    className="h-auto w-5 text-white hidden group-hover:block group-hover:shadow-xl"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d={props[`path${index + 1}`]}
                                        fill="currentcolor"
                                    />
                                </svg>
                            </div>
                            <span className="flex ms-10 whitespace-nowrap texk-md text-left">
                                {props[`menu${index + 1}`]}
                            </span>
                        </a>
                    </div>
                </button>
            }
        </li>
    ));

    menuItems.splice(
        props.current - 1,
        1,
        <li key={props.current - 1} className="flex flex-col px-4">
            {
                <button
                    type="button"
                    className="flex text-white bg-shoewizards-medium-blue font-medium rounded-2xl px-4 py-3 inline-flex"
                >
                    <div className="flex w-52">
                        <a
                            href={props[`page${props.current}`]}
                            className="flex items-center rounded-lg group"
                        >
                            <div className="absolute group text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 28 33"
                                    className="h-auto w-5 text-white"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d={props[`path${props.current}`]}
                                        fill="currentcolor"
                                    />
                                </svg>
                            </div>
                            <span className="flex-1 ms-10 whitespace-nowrap text-md text-left">
                                {props[`menu${props.current}`]}
                            </span>
                        </a>
                    </div>
                </button>
            }
        </li>,
    );

    return (
        <div className="flex flex-col h-screen">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden"
      >
        <span className="sr-only">Open sidebar</span>
            <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
            </svg>
      </button>

      <div className="fixed top-0 left-0 flex flex-col bg-white w-1/6 h-screen md:flex-col transition-transform -translate-x-full lg:translate-x-0 overflow-y-auto">
        <div className="flex flex-col items-center">
          <div className="flex items-center h-48 mb-4">
            <Logo height="48" width="48" default={props.default} />
          </div>
        </div>

        <div className="flex flex-col">
          <ul className="flex flex-col space-y-4 font-medium text-md text-shoewizards-medium-blue">
            {menuItems}
          </ul>
        </div>

        <div className="mt-auto">
            <div className="flex flex-col px-4 mb-1">
                    <div
                    className="flex text-red-500 bg-white font-medium rounded-2xl px-4 py-3 inline-flex group"
                    >
                    <div className="flex flex-col justify-center w-52">
                            <div className="absolute group text-shoewizards-medium-blue">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" className="h-auto w-6 text-shoewizards-medium-blue">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3337 12C21.3337 13.4144 20.7718 14.771 19.7716 15.7712C18.7714 16.7714 17.4148 17.3333 16.0003 17.3333C14.5858 17.3333 13.2293 16.7714 12.2291 15.7712C11.2289 14.771 10.667 13.4144 10.667 12C10.667 10.5855 11.2289 9.22892 12.2291 8.22872C13.2293 7.22853 14.5858 6.66663 16.0003 6.66663C17.4148 6.66663 18.7714 7.22853 19.7716 8.22872C20.7718 9.22892 21.3337 10.5855 21.3337 12ZM18.667 12C18.667 12.7072 18.386 13.3855 17.8859 13.8856C17.3858 14.3857 16.7076 14.6666 16.0003 14.6666C15.2931 14.6666 14.6148 14.3857 14.1147 13.8856C13.6146 13.3855 13.3337 12.7072 13.3337 12C13.3337 11.2927 13.6146 10.6144 14.1147 10.1143C14.6148 9.61424 15.2931 9.33329 16.0003 9.33329C16.7076 9.33329 17.3858 9.61424 17.8859 10.1143C18.386 10.6144 18.667 11.2927 18.667 12Z" fill="currentcolor"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0002 1.33331C7.90016 1.33331 1.3335 7.89998 1.3335 16C1.3335 24.1 7.90016 30.6666 16.0002 30.6666C24.1002 30.6666 30.6668 24.1 30.6668 16C30.6668 7.89998 24.1002 1.33331 16.0002 1.33331ZM4.00016 16C4.00016 18.7866 4.95083 21.352 6.54416 23.3893C7.66314 21.9198 9.1067 20.729 10.7621 19.9097C12.4175 19.0905 14.2398 18.665 16.0868 18.6666C17.9099 18.6649 19.7094 19.0793 21.3481 19.8784C22.9868 20.6774 24.4214 21.8399 25.5428 23.2773C26.6981 21.7621 27.4759 19.9936 27.812 18.1181C28.1481 16.2426 28.0327 14.314 27.4755 12.492C26.9182 10.6699 25.9351 9.00671 24.6075 7.64003C23.2798 6.27335 21.6458 5.24246 19.8407 4.63266C18.0355 4.02286 16.1111 3.85168 14.2266 4.13328C12.3422 4.41488 10.5519 5.14117 9.00385 6.25205C7.45583 7.36293 6.19458 8.82647 5.32447 10.5216C4.45436 12.2167 4.0004 14.0946 4.00016 16ZM16.0002 28C13.2454 28.0041 10.5739 27.0564 8.4375 25.3173C9.2974 24.0863 10.4419 23.0812 11.7738 22.3876C13.1056 21.6939 14.5852 21.3322 16.0868 21.3333C17.5697 21.3321 19.0315 21.6847 20.3507 22.3619C21.67 23.039 22.8087 24.0211 23.6722 25.2266C21.5192 27.0223 18.8036 28.0039 16.0002 28Z" fill="currentcolor"/>
                                </svg>
                            </div>
                            <span className="flex ms-10 whitespace-nowrap text-md text-left text-shoewizards-medium-blue">
                                {user.map((user) => `${user.firstname} ${user.lastname}`)}
                            </span>
                        </div>
                    </div>
                </div>
                
                <a href="/">
                <div className="flex flex-col px-4 mb-8">
                    <button
                    type="button"
                    className="flex text-red-500 bg-white hover:bg-red-500 hover:text-white font-medium rounded-2xl px-4 py-3 inline-flex group"
                    onClick={handleLogout}
                    >
                    <div className="flex flex-col justify-center w-52">
                            <div className="absolute group text-red-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 28 33"
                                    className="h-auto w-5 text-red-500 group-hover:hidden"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.5554 24.0346L17.7292 26.2083L25.4375 18.5L17.7292 10.7917L15.5554 12.9654L19.5329 16.9583H4.625V20.0417H19.5329L15.5554 24.0346ZM29.2917 4.625H7.70833C6.89058 4.625 6.10632 4.94985 5.52809 5.52809C4.94985 6.10632 4.625 6.89058 4.625 7.70833V13.875H7.70833V7.70833H29.2917V29.2917H7.70833V23.125H4.625V29.2917C4.625 30.1094 4.94985 30.8937 5.52809 31.4719C6.10632 32.0501 6.89058 32.375 7.70833 32.375H29.2917C30.9875 32.375 32.375 30.9875 32.375 29.2917V7.70833C32.375 6.0125 30.9875 4.625 29.2917 4.625Z"
                                        fill="currentcolor"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 28 33"
                                    className="h-auto w-5 text-white hidden group-hover:block group-hover:shadow-xl"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.5554 24.0346L17.7292 26.2083L25.4375 18.5L17.7292 10.7917L15.5554 12.9654L19.5329 16.9583H4.625V20.0417H19.5329L15.5554 24.0346ZM29.2917 4.625H7.70833C6.89058 4.625 6.10632 4.94985 5.52809 5.52809C4.94985 6.10632 4.625 6.89058 4.625 7.70833V13.875H7.70833V7.70833H29.2917V29.2917H7.70833V23.125H4.625V29.2917C4.625 30.1094 4.94985 30.8937 5.52809 31.4719C6.10632 32.0501 6.89058 32.375 7.70833 32.375H29.2917C30.9875 32.375 32.375 30.9875 32.375 29.2917V7.70833C32.375 6.0125 30.9875 4.625 29.2917 4.625Z"
                                        fill="currentcolor"
                                    />
                                </svg>
                            </div>
                            <span className="flex ms-10 whitespace-nowrap text-md text-left">
                                Log Out
                            </span>
                        </div>
                    </button>
                </div>
                </a>
            </div>
        </div>
    </div>
  );
}
