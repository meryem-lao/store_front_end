
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Postproductform() {
    const [listcategory, setListcategory] = useState([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");
    const [color, setColor] = useState("");
    const [genre, setGenre] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    // with Axios
    const url = "https://127.0.0.1:8000/ws/categories";

    const getCategorys = async () => {
        await axios.get(url).then((response) => {
            // console.log(response.data['hydra:member']);
            setListcategory(response.data['hydra:member']);
        });
    };

    const urlp = "https://127.0.0.1:8000/ws/products";
    const createProduct = async (e) => {
        e.preventDefault();
        await axios.post(urlp, {
            name: name,
            price: parseFloat(price),
            quantityStock: parseFloat(stock),
            image: image,
            color: color,
            genre: genre,
            category: "ws/categories/" + category,
            description: description,
        }).then((response) => {
            console.log(response)
        });
        window.location.replace("/admin")
    };
    console.log({ name: name, price: price, stock: stock, image: image, color: color, genre: genre, category: "ws/categories/" + category, description: description })
    useEffect(() => {
        getCategorys();
    }, []);

    return (
        <div>
            <div className="flex flex-col md:flex-row mr-16 ml-10 mb-20 rounded-lg bg-white shadow-lg">
                <form className="w-full mb-20 px-40 my-8" onSubmit={(e) => createProduct(e)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Product Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="product-name" type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
                           
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Price
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="price" type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                stock
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="stock" type="number" placeholder="" onChange={(e) => setStock(e.target.value)} />
                            
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Image
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="image" type="text" placeholder="Image" onChange={(e) => setImage(e.target.value)} />
                            
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Color
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="" onChange={(e) => setColor(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                            <select className="form-select appearance-none block w-full px-6 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={(e) => setGenre(e.target.value)}>
                                <option>Women</option>
                                <option>Men</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="mb-3 xl:w-96">
                            <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                                <option defaultValue disabled>Category</option>
                                {listcategory.map((category, index) =>
                                    <option value={category.id} key={index}>{category.name}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="">
                        <div className="mb-3 xl:w-96">
                            <textarea onChange={(e) => setDescription(e.target.value)} name="" id="description" cols="60" rows="3" placeholder='Description'></textarea>
                        </div>
                    </div>

                    <button className="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Add Product</button>

                </form>
            </div>
        </div>
    )
}
