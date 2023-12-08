import Sidebar from "../components/Sidebar"
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
    userid: number,
}

type UserData = [number, string, string, string, string, string, string, string, string, string];

export default function ConsultPage(){
    const [shoetype, setShoetype] = useState(""); // ["Sneakers", "Loafers", "Flip-Flops"]
    const [shoesize, setShoesize] = useState("");
    const [shoecolor, setShoecolor] = useState("");
    const [shoebrand, setShoebrand] = useState("");
    const [initialcondition, setInitialcondition] = useState("");

    const [consultationResult, setConsultationResult] = useState(null);

    const [user, setUser] = useState<User[]>([]);

    const getUser = async () => {
        try {
            const response = await axios.post(
                "https://shoewizardsdb.azurewebsites.net/authentications/current_user",
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
                userid: user[0],
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

    const userid = user && user[0] && user[0].userid;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `https://shoewizardsdb.azurewebsites.net/shoes/shoes?shoetype=${shoetype}&shoesize=${shoesize}&shoecolor=${shoecolor}&shoebrand=${shoebrand}&initialcondition=${initialcondition}`,
                null,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const shoeid = parseInt(response.data.split(" ")[2], 10);

            console.log(shoeid)
            
            if (response.status === 200) {
                try {
                    const response = await axios.post(
                        `https://shoewizardsdb.azurewebsites.net/consultations/consultations?userid=${userid}&shoeid=${shoeid}`,
                        null,
                        {
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );
                    
                    if (response.status === 200) {
                        try {
                            const response = await axios.get(
                                `https://shoewizardsdb.azurewebsites.net/consultations/consultations?userid=${userid}&shoeid=${shoeid}`,
                                {
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                                    },
                                }
                            );

                            const consultationResult = response.data;

                            setConsultationResult(consultationResult);

                            console.log(consultationResult);

                            if (response.status === 200) {
                                try {
                                    await axios.post(
                                        `https://shoewizardsdb.azurewebsites.net/consultations/checkout_consultation?userid=${userid}&shoeid=${shoeid}&addClick=true`,
                                        null,
                                        {
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                            },
                                        }
                                    );
                                }
                                catch (error) {
                                    console.error(error);
                                    toast.error('All carts are currently in used.', {
                                        position: toast.POSITION.TOP_CENTER,
                                    });
                                }
                            }
                        
                        } catch (error) {
                            console.error(error);
                        }
                    }

                } catch (error) {
                    console.error(error);
                }
            }
            
        }

        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="grid grid-cols-6 grid-rows-8 bg-shoewizards-white min-h-screen">
            <div className="col-span-1 row-span-8">
                {/* Sidebar component */}
                <Sidebar number={4}
                current={2}
                menu1="Home"
                path1="M27 14.6465V29.4398C27 30.1188 26.7629 30.77 26.341 31.2501C25.919 31.7303 25.3467 32 24.75 32H19.125C18.5282 32 17.9559 31.7303 17.534 31.2501C17.112 30.77 16.875 30.1188 16.875 29.4398V23.0392C16.875 22.6997 16.7565 22.3741 16.5455 22.1341C16.3345 21.894 16.0484 21.7591 15.75 21.7591H11.25C10.9516 21.7591 10.6655 21.894 10.4545 22.1341C10.2435 22.3741 10.125 22.6997 10.125 23.0392V29.4398C10.125 30.1188 9.88794 30.77 9.46598 31.2501C9.04402 31.7303 8.47173 32 7.87499 32H2.25C1.65326 32 1.08097 31.7303 0.659009 31.2501C0.237052 30.77 2.59985e-08 30.1188 2.59985e-08 29.4398V14.6465C-4.73102e-05 14.2922 0.0645457 13.9417 0.189691 13.6172C0.314836 13.2928 0.497809 13.0014 0.72703 12.7616L11.977 0.683737L11.9925 0.666135C12.4067 0.237512 12.9464 0 13.5063 0C14.0662 0 14.6059 0.237512 15.0201 0.666135C15.0249 0.672397 15.0301 0.678277 15.0356 0.683737L26.2856 12.7616C26.5125 13.0027 26.6931 13.2946 26.8161 13.619C26.939 13.9434 27.0016 14.2933 27 14.6465Z"
                page1="/home"
                menu2="Consult"
                path2="M15.9998 4C23.3332 4 29.3332 8.77333 29.3332 14.6667C29.3332 20.56 23.3332 25.3333 15.9998 25.3333C14.3465 25.3333 12.7598 25.0933 11.2932 24.6667C7.39984 28 2.6665 28 2.6665 28C5.77317 24.8933 6.2665 22.8 6.33317 22C4.0665 20.0933 2.6665 17.5067 2.6665 14.6667C2.6665 8.77333 8.6665 4 15.9998 4Z"
                page2="/consult"
                menu3="Cart"
                path3="M22.2968 25.6C20.7499 25.6 19.5097 27.024 19.5097 28.8C19.5097 29.6487 19.8033 30.4626 20.326 31.0627C20.8487 31.6629 21.5576 32 22.2968 32C23.036 32 23.7449 31.6629 24.2675 31.0627C24.7902 30.4626 25.0839 29.6487 25.0839 28.8C25.0839 27.9513 24.7902 27.1374 24.2675 26.5373C23.7449 25.9371 23.036 25.6 22.2968 25.6ZM0 0V3.2H2.7871L7.80387 15.344L5.90864 19.264C5.69961 19.712 5.57419 20.24 5.57419 20.8C5.57419 21.6487 5.86783 22.4626 6.39051 23.0627C6.9132 23.6629 7.62211 24 8.36129 24H25.0839V20.8H8.94658C8.85418 20.8 8.76557 20.7579 8.70023 20.6828C8.6349 20.6078 8.59819 20.5061 8.59819 20.4C8.59819 20.32 8.61213 20.256 8.64 20.208L9.89419 17.6H20.2761C21.3213 17.6 22.241 16.928 22.7148 15.952L27.7037 5.6C27.8013 5.344 27.871 5.072 27.871 4.8C27.871 4.37565 27.7241 3.96869 27.4628 3.66863C27.2015 3.36857 26.847 3.2 26.4774 3.2H5.86684L4.5569 0M8.36129 25.6C6.81445 25.6 5.57419 27.024 5.57419 28.8C5.57419 29.6487 5.86783 30.4626 6.39051 31.0627C6.9132 31.6629 7.62211 32 8.36129 32C9.10047 32 9.80938 31.6629 10.3321 31.0627C10.8547 30.4626 11.1484 29.6487 11.1484 28.8C11.1484 27.9513 10.8547 27.1374 10.3321 26.5373C9.80938 25.9371 9.10047 25.6 8.36129 25.6Z"
                page3="/cart"
                menu4="Orders"
                path4="M4.10306 1.10306C3 2.20612 3 3.97929 3 7.52941V24.4706C3 28.0207 3 29.7939 4.10306 30.8969C5.20612 32 6.97929 32 10.5294 32H21.8235C25.3736 32 27.1468 32 28.2499 30.8969C29.3529 29.7939 29.3529 28.0207 29.3529 24.4706V7.52941C29.3529 3.97929 29.3529 2.20612 28.2499 1.10306C27.1468 -1.12197e-07 25.3736 0 21.8235 0H10.5294C6.97929 0 5.20612 -1.12197e-07 4.10306 1.10306ZM10.5294 7.52941C10.0302 7.52941 9.5514 7.72773 9.19839 8.08074C8.84538 8.43375 8.64706 8.91253 8.64706 9.41176C8.64706 9.911 8.84538 10.3898 9.19839 10.7428C9.5514 11.0958 10.0302 11.2941 10.5294 11.2941H21.8235C22.3228 11.2941 22.8015 11.0958 23.1546 10.7428C23.5076 10.3898 23.7059 9.911 23.7059 9.41176C23.7059 8.91253 23.5076 8.43375 23.1546 8.08074C22.8015 7.72773 22.3228 7.52941 21.8235 7.52941H10.5294ZM10.5294 15.0588C10.0302 15.0588 9.5514 15.2571 9.19839 15.6102C8.84538 15.9632 8.64706 16.4419 8.64706 16.9412C8.64706 17.4404 8.84538 17.9192 9.19839 18.2722C9.5514 18.6252 10.0302 18.8235 10.5294 18.8235H21.8235C22.3228 18.8235 22.8015 18.6252 23.1546 18.2722C23.5076 17.9192 23.7059 17.4404 23.7059 16.9412C23.7059 16.4419 23.5076 15.9632 23.1546 15.6102C22.8015 15.2571 22.3228 15.0588 21.8235 15.0588H10.5294ZM10.5294 22.5882C10.0302 22.5882 9.5514 22.7866 9.19839 23.1396C8.84538 23.4926 8.64706 23.9714 8.64706 24.4706C8.64706 24.9698 8.84538 25.4486 9.19839 25.8016C9.5514 26.1546 10.0302 26.3529 10.5294 26.3529H18.0588C18.5581 26.3529 19.0368 26.1546 19.3898 25.8016C19.7429 25.4486 19.9412 24.9698 19.9412 24.4706C19.9412 23.9714 19.7429 23.4926 19.3898 23.1396C19.0368 22.7866 18.5581 22.5882 18.0588 22.5882H10.5294Z"
                page4="/orders"/>
            </div>

            {/* Main content area */}
            <div className="col-span-5 flex flex-col">
                <div className="w-full">
                    <div className="mx-20">
                        <div className="row-span-8 my-10 py-7 bg-white rounded-3xl">
                            <h2 className="text-shoewizards-dark-blue text-3xl font-bold ps-9 mb-10">
                            Register Your Shoes
                            </h2>
                            <div className="mx-9 justify-items-center">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-full bg-white rounded-3xl md:mt-0 xl:p-0">
                                        <div className="space-y-4 md:space-y-6 flex items-center justify-center">
                                            <div className="space-y-4 md:space-y-6 w-full">
                                                <form className="max-w-auto mx-auto"
                                                onSubmit={handleSubmit}
                                                >
                                                    <div className="relative z-0 w-full mb-7 group">
                                                    <select
                                                        name="floating_shoetype"
                                                        id="floating_shoetype"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        required
                                                        onChange={(e) => setShoetype(e.target.value)}
                                                    >
                                                        <option value="" disabled selected>
                                                        Select Shoe Type
                                                        </option>
                                                        <option value="Sneakers">Sneakers</option>
                                                        <option value="Loafers">Loafers</option>
                                                        <option value="Flip-Flops">Flip-Flops</option>
                                                    </select>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-7 group">
                                                        <input type="number" name="floating_shoesize" id="floating_shoesize" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                                                        onChange={(e) => setShoesize(e.target.value)}
                                                        />
                                                        <label htmlFor="floating_shoesize" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shoe size</label>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-7 group">
                                                        <input type="text" name="floating_shoecolor" id="floating_shoecolor" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                                                        onChange={(e) => setShoecolor(e.target.value)}
                                                        />
                                                        <label htmlFor="floating_shoecolor" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shoe color</label>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-7 group">
                                                        <input type="int" name="floating_shoebrand" id="floating_shoebrand" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                                                        onChange={(e) => setShoebrand(e.target.value)}
                                                        />
                                                        <label htmlFor="floating_shoebrand" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shoe brand</label>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-7 group">
                                                        <input type="text" name="floating_condition" id="floating_condition" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                                                        onChange={(e) => setInitialcondition(e.target.value)}
                                                        />
                                                        <label htmlFor="floating_condition" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Initial condition</label>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="w-full text-white bg-shoewizards-medium-blue hover:shadow-xl focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-3xl text-sm mt-3 px-5 py-2.5 text-center"
                                                    >
                                                        Register
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {consultationResult === null ? (
                            null
                        ) : (
                            <div className="row-span-8 my-10 py-7 bg-white rounded-3xl" id="Consult">
                                <h2 className="text-shoewizards-dark-blue text-3xl font-bold ps-9 mb-10">
                                Consultation Result
                                </h2>
                                <div className="px-9">
                                    <div className ="py-3 px-4 bg-shoewizards-light-blue rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white mb-10">
                                        {consultationResult}
                                    </div>
                                    <div className ="py-3 px-4 bg-shoewizards-light-blue rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white mb-10">
                                        We already add the recommended products to your cart. Please check your cart to proceed to checkout.
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}