import Logo from "./Logo";

type Order = {
    productname: string;
    quantity: number;
}

export default function OrderCard({ data }: { data: Order[] }) {
    const orderlist = data.map(({ productname, quantity }) => {
        const orderList = () => {
            let orderStr = "";
            for (let i = 0; i < quantity; i++) {
                orderStr += productname;
                if (i !== quantity - 1) {
                    orderStr += ", ";
                }
            }
            return (
                <p className="mt-2 font-normal text-lg text-gray-700 w-11/12">{orderStr}</p>
            );
        }
                
        return (
            <div className="flex flex-row bg-white border-b border-gray-300 py-10 md:flex-row justify-start">
                <div className="flex">
                    <div className="flex flex-row h-36 w-36 rounded-3xl md:rounded-3xl">
                        <Logo />
                    </div>
                </div>
                <div className="flex flex-col w-full leading-normal ms-12">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 w-11/12">Shoewizards</h5>
                    <div className="flex flex-col md:flex-row items-center my-2">
                        <div className="flex text-white bg-shoewizards-light-blue h-6 w-6 rounded-full text-sm justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.471 4.52869C13.5959 4.65371 13.6661 4.82324 13.6661 5.00002C13.6661 5.1768 13.5959 5.34634 13.471 5.47135L7.13762 11.8047C7.0126 11.9297 6.84306 11.9999 6.66629 11.9999C6.48951 11.9999 6.31997 11.9297 6.19495 11.8047L3.19495 8.80469C3.07352 8.67895 3.00632 8.51055 3.00784 8.33575C3.00936 8.16096 3.07947 7.99375 3.20307 7.87014C3.32668 7.74654 3.49389 7.67642 3.66869 7.6749C3.84348 7.67339 4.01189 7.74058 4.13762 7.86202L6.66629 10.3907L12.5283 4.52869C12.6533 4.40371 12.8228 4.3335 12.9996 4.3335C13.1764 4.3335 13.3459 4.40371 13.471 4.52869Z" fill="white" />
                            </svg>
                        </div>
                        <p className="font-normal text-lg text-gray-700 w-11/12 ms-3">Order Created</p>
                    </div>
                    {orderList()}
                </div>
            </div>
        ); 
    });

    return orderlist;
}