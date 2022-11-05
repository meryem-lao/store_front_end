import axios from 'axios';
import { Alert, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer1 from '../../components/layout/footer';
import Header from '../../components/layout/header';

export default function Showcarddetails(props) {
    const [carts, setCarts] = useState([]);

    const itemsPrice = carts.reduce((a, c) => a + c.qty * c.price, 0); 

    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('notrepannier'));
        if (carts) {
            setCarts(carts);
        }
        //console.log(carts)
    }, []);

    const clearAll = () => {
        window.localStorage.setItem("notrepannier", JSON.stringify([]));
        window.location.replace("/shopList");
    }

    const deleteitem = (id) => {
        console.log(id)
        let panier = JSON.parse(localStorage.getItem('notrepannier'));
        console.log(panier)
        panier.forEach((product, index) => {
            product.id === id && panier.splice(index, 1)
        });
        window.localStorage.setItem("notrepannier", JSON.stringify(panier));
        window.location.replace("/shopList");
    }

    const addToOrder = async (e) => {
        e.preventDefault();
        let lastInsertId;
        await axios.post("https://127.0.0.1:8000/ws/orders", {
            user: "/ws/users/1",
            total: itemsPrice,
            confirmation: "In Progress",

        }).then((response) => {
            lastInsertId = response.data.id

        });

        const test = async (url, data) => {
            try {
                await axios.post(url, data

                ).then((response) => {
                    console.log(response)
                });

            } catch (e) {
                console.log(e.response)
            }

        }

        carts.forEach((product) => {
            test("https://127.0.0.1:8000/ws/order_details", {
                "quantity": product.qty,
                "product": "ws/products/" + product.id,
                "idOrder": "ws/orders/" + lastInsertId
            })

        })

        window.location.replace("/")

    };

    return (
        <div>
            <Header countCart={carts.length}></Header>
            <div className="py-16 bg-gray-50">
                <div className="pb-8 mr-16 ml-9 rounded-lg bg-white shadow">
                    {/* <h5 className="text-gray-900 text-xl font-medium mx-4 my-6">{user.firstName}</h5> */}
                    <h3 className="text-center text-gray-900 text-xl font-bold mx-4 my-6 pt-12"> Shopping cart </h3>
                    <div className="p-8 flex flex-col justify-start">
                        {carts.length > 0 ?
                            (<table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">

                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Product
                                        </th>

                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Product Price
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Quantity
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.map((ordd, index) =>
                                        <tr className="bg-gray-100 border-b" key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{++index}</td>

                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <img className="w-28 h-28 rounded-full" src={ordd.image} alt="" />
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {ordd.price} DT
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {ordd.qty}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button onClick={() => deleteitem(ordd.id)} type="button" className="inline-block text-red-600 font-medium">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7">
                                                        <path fill="red" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                    <tr className='font-bold'>
                                        <td colSpan="4" className='py-6 px-8 text-right'>
                                            Total :
                                        </td>
                                        <td colSpan="1" className='py-6 px-4'>
                                            {itemsPrice} DT
                                        </td>
                                    </tr>
                                </tbody>
                            </table>) : (
                                <h3> There are no products in this cart </h3>
                            )
                        }
                    </div>
                    <div className='flex justify-between'>
                        <div className='m-6'>
                            <Link to="/" className='inline-block px-4 py-2 border-2 border-slate-400 text-slate-400 font-medium text-xl leading-tight uppercase rounded-lg hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'>Continue Shopping</Link>
                        </div>
                        <div className='flex'>
                            <div className='m-6'>
                                <button onClick={clearAll} className="inline-block px-4 py-2 border-2 border-slate-400 text-slate-400 font-medium text-xl leading-tight uppercase rounded-lg hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Clear All</button>
                            </div>
                            <div className='m-6'>
                                <button onClick={(e) => addToOrder(e)} className="inline-block px-4 py-2 border-2 border-slate-400 text-slate-400 font-medium text-xl leading-tight uppercase rounded-lg hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">To Order</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer1></Footer1>
        </div>
    )
}
