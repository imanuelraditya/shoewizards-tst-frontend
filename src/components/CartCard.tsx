import axios from "axios"

type Product = {
    product_id: number;
    productname: string;
    productdescription: string;
    price: number;
    quantity: number;
}

export default function CartCard({ data }: { data: Product[] }) {
    const productList = data.map(({ product_id, productname, productdescription, price, quantity }) => {
        const priceidr = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const image = productname.replace(/\s/g, '');

        const handleAdd = async () => {
            try {
                const response = await axios.post(
                    `https://shoewizards.azurewebsites.net/smartcart-cart/cart_addproduct?id_product=${product_id}&addClick=true`,
                    null,
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                console.log(response);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }

        const handleRemove = async () => {
            try {
                const response = await axios.post(
                    `https://shoewizards.azurewebsites.net/smartcart-cart/cart_removeproduct?id_product=${product_id}&addClick=false`,
                    null,
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                console.log(response);
                window.location.reload();
            } catch (error) {
                console.error(error);
            }
        }

        return (
            <div className="flex flex-col bg-white justify-center items-center py-8 md:flex-row">
                <div className="flex flex-col w-full leading-normal">
                    <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 w-5/6">
                        {productname}
                    </h5>
                    <p className="my-3 font-normal text-md text-gray-700 w-5/6">
                        {productdescription}
                    </p>
                    <p className="mt-3 font-normal text-md text-gray-500 w-5/6">
                        Rp {priceidr},00
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center w-1/6">
                    <div className="flex flex-row items-center h-24 w-40 rounded-3xl md:h-24 md:w-40 md:rounded-3xl">
                        <img
                            src={`../../images/${image}.png`}
                            alt={productname}
                            className="object-cover h-full w-full rounded-3xl mb-4"
                        ></img>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="flex flex-row justify-center items-center">
                            <button
                                type="button"
                                className="text-white bg-shoewizards-medium-blue hover:text-shoewizards-medium-blue border-2 border-shoewizards-medium-blue hover:bg-white font-bold text-lg rounded-full text-sm px-2 py-2 text-center shadow-xl"
                                onClick={handleRemove}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                >
                                    <path
                                        d="M15.5003 11.4551H5.50033C5.27931 11.4551 5.06735 11.3673 4.91107 11.2111C4.75479 11.0548 4.66699 10.8428 4.66699 10.6218C4.66699 10.4008 4.75479 10.1888 4.91107 10.0325C5.06735 9.87626 5.27931 9.78847 5.50033 9.78847H15.5003C15.7213 9.78847 15.9333 9.87626 16.0896 10.0325C16.2459 10.1888 16.3337 10.4008 16.3337 10.6218C16.3337 10.8428 16.2459 11.0548 16.0896 11.2111C15.9333 11.3673 15.7213 11.4551 15.5003 11.4551Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                            <p className="mx-6 font-normal text-sm text-gray-700">
                                {quantity}
                            </p>
                            <button
                                type="button"
                                className="text-white bg-shoewizards-medium-blue hover:text-shoewizards-medium-blue border-2 border-shoewizards-medium-blue hover:bg-white font-bold text-lg rounded-full text-sm px-2 py-2 text-center shadow-xl"
                                onClick={handleAdd}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="10"
                                    height="10"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                >
                                    <path
                                        d="M10.5003 4.79013V16.4568M4.66699 10.6235H16.3337"
                                        stroke="currentColor"
                                        stroke-width="1.66667"
                                        strokeLinecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return productList
}