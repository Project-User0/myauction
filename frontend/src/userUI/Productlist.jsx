import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Productlist() {

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:3000/allitems');
                setProduct(response.data);
            } catch (err) {
                console.log('Error fetching products:' ,err);
            }
        };
        fetchProduct();
    }, []);

    const navigate = useNavigate();
    const productDetails = (PID) => {
        navigate(`/product?pid=${PID}`);

    };


    return (
        <>
            <div className="flex flex-col gap-2 py-4" id="product">
                <div className="flex justify-between items-center py-3 xl:px-14 lg:px-16 md:px-18 sm:px-6 px-4">
                    <h1 className="text-xl font-semibold">Products for Bids</h1>
                    <a className="text-pink-900 text-[13px]" href="/viewmore">View more <i class="px-1 fa-solid fa-angle-right"></i></a>
                </div>
                <div className="flex flex-wrap justify-center gap-3 h-auto w-full">
                    {product.map(data => (
                        <div className="flex flex-col bg-white rounded overflow-hidden w-[300px]">
                            <div className="relative">
                                <div className="cursor-pointer">
                                    {JSON.parse(data.proImage)[0] && (
                                        <img
                                            className="w-full"
                                            src={`http://localhost:3000/productImage/${JSON.parse(data.proImage)[0]}`}
                                            alt="Product Image"
                                            onClick={() => productDetails(data.pid)}
                                        />
                                    )}
                                    <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 rounded text-sm font-medium">
                                        Available
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-medium mb-1">{data.productName}</h3>
                                <p className="text-gray-800 text-sm mb-4">
                                    {data.type}
                                </p>
                                {(() => {
                                    const postDate = new Date(data.submitted);
                                    const durationInDays = data.days || 0;

                                    if (isNaN(postDate.getTime())) {
                                        return <p className="text-red-800 text-[13px]">Invalid date</p>;
                                    }

                                    const endDate = new Date(postDate);
                                    endDate.setDate(endDate.getDate() + durationInDays);

                                    const month = String(endDate.getMonth() + 1).padStart(2, '0');
                                    const day = String(endDate.getDate()).padStart(2, '0');
                                    const year = endDate.getFullYear();
                                    let hours = endDate.getHours();
                                    const minutes = String(endDate.getMinutes()).padStart(2, '0');
                                    const ampm = hours >= 12 ? 'PM' : 'AM';
                                    hours = hours % 12 || 12;

                                    const formatted = `${month}-${day}-${year}, ${hours}:${minutes} ${ampm}`;

                                    return <p className="text-red-800 text-[13px]">Ends at {formatted}</p>;
                                })()}

                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-lg">Rs.{data.price}</span>
                                    <button className="bg-transparent text-gray-900 border border-gray-800 rounded-[100px] font-bold py-2 px-4 text-[13px] hover:bg-black hover:text-white outline-none cursor-pointer">
                                        <a href="/login">Bid Now</a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Productlist;
