import axios from 'axios';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ShowOrderdetals() {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [user, setUser] = useState({});
    //const [loading, setLoading] = useState(false);
    const [listdetailsorder, setListdetailsorder] = useState([]);

    const url = "https://127.0.0.1:8000/ws/orders/" + id;

    const getOrder = async () => {
        try {
            await axios.get(url).then((response) => {
                console.log(response.data);
                // console.log(response.data['hydra:member']);
                setOrder(response.data);
                setUser(response.data.user);
                setListdetailsorder(response.data.orderDetails);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrder()
    }, []);

    const updateOrderConfirmation = async (conf, e) => {
        e.preventDefault()
        let orderupdate = {
            confirmation: conf,
        }

        try {
            await axios.put(`https://127.0.0.1:8000/ws/orders/${id}`, orderupdate).then((response) => {
                window.location.replace("/admin/crudorder")
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
            <div className="mr-16 ml-9 rounded-lg bg-white shadow-lg mb-28">
                <h3 className="text-center text-gray-900 text-xl font-bold mx-4 my-6 pt-12"> Order Details </h3>
                <p className='ml-8 font-medium'>Order Number : {order.id}</p>
                <div className=' flex justify-end mr-20 mt-8'>
                    <div>
                        <p><span className='font-medium'>{user.firstName} {user.lastName}</span>, {user.address}.</p>
                        <p><span className='font-medium'>Phone Number : </span>{user.phoneNumber}</p>
                        <p><span className='font-medium'>Email : </span>{user.email}</p>
                    </div>
                </div>
                <div className="p-8 flex flex-col justify-start">
                    {listdetailsorder.length > 0 ?
                        (<table className="min-w-full">
                            <thead className="bg-white border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">

                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Product
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Product Image
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Product Price
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listdetailsorder.map((ordd, index) =>
                                    <tr className="bg-gray-100 border-b" key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{++index}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {ordd.product.name}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <img className="w-28 h-28 rounded-full" src={ordd.product.image} alt="" />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {ordd.product.price} DT
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {ordd.quantity}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>) : (
                            <h3> There are no products in this category </h3>
                        )
                    }
                </div>
                <div className='text-right pr-28'>
                    <button onClick={(e) => updateOrderConfirmation("Refused", e)} className="inline-block border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mr-14 px-4 py-3">
                        Order Refused
                    </button>
                    <button onClick={(e) => updateOrderConfirmation("Validated", e)} className="inline-block border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mr-14 px-4 py-3">
                        Order Validated
                    </button>
                    <button onClick={(e) => updateOrderConfirmation("Delivered", e)} className="inline-block border-2 border-cyan-900 text-cyan-900 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out my-6 px-4 py-3">
                        Order Delivered
                    </button>
                </div>
            </div>
        </div>
    )
}
