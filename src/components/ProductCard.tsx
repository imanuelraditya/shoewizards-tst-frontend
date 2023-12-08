type Product = {
    productid: number;
    productname: string;
    productdescription: string;
    price: number;
    stock: number;
    producttype: string;
}

export default function ProductCard({ data }: { data: Product[] }) {
    const productList = data.map(({productname, productdescription, price }) => {
        const priceidr = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        const image = productname.replace(/\s/g, '');

        return (
            <a>
                <div className="w-52 h-72 bg-white rounded-3xl shadow-md hover:shadow-xl">
                    <div className="flex items-center h-32 w-full">
                        <img className="object-cover h-full w-full rounded-3xl" src={`../../images/${image}.png`} alt={productname} />
                    </div>
                    <div className="mt-3 px-4">
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{productname}</h5>
                        <div className="mt-2 flex items-center">
                            <span className="px-1.5 font-light italic text-sm">{productdescription}</span>
                        </div>
                        <div className="mt-2 flex items-center">
                            <span className="px-1.5 font-medium text-sm">Rp {priceidr},00</span>
                        </div>
                    </div>
                </div>
            </a>
        );
    });

    return <>{productList}</>;
}
