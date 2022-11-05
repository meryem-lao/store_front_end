import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Updateproductform() {

    const [listcategory, setListcategory] = useState([]);

    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");
    const [color, setColor] = useState("");
    const [genre, setGenre] = useState("");
    const [categoryp, setCategoryp] = useState();
    const [description, setDescription] = useState("");
    const [product, setProduct] = useState([]);

    const url = "https://127.0.0.1:8000/ws/products/" + id;

    const getProduct = async () => {
        try {
            await axios.get(url).then((response) => {
                // console.log(response.data);
                // console.log(response.data.category.id);
                // console.log(response.data['hydra:member']);
                setProduct(response.data);
                setName(response.data.name);
                setPrice(response.data.price);
                setStock(response.data.quantityStock);
                setImage(response.data.image);
                setColor(response.data.color);
                setGenre(response.data.genre);
                setCategoryp(response.data.category.id);
                setDescription(response.data.description);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const urli = "https://127.0.0.1:8000/ws/categories";
    const getCategorys = async () => {
        await axios.get(urli).then((response) => {
            // console.log(response.data['hydra:member']);
            setListcategory(response.data['hydra:member']);
            setLoading(true)
        });
    };

    useEffect(() => {
        getCategorys()
    }, []);

    useEffect(() => {
        getProduct()
    }, []);

    const updateProduct = async (e) => {
        e.preventDefault()
        let productupdated = {
            name: name,
            price: parseFloat(price),
            quantityStock: parseFloat(stock),
            image: image,
            color: color,
            genre: genre,
            category: "ws/categories/" + categoryp,
            description: description,
        }
        console.warn(productupdated);
        try {
            await axios.put(`https://127.0.0.1:8000/ws/products/${id}`, productupdated).then((response) => {
                window.location.replace("/admin")
                console.log(productupdated)
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row mr-16 ml-10 mb-20 rounded-lg bg-white shadow-lg">
                <form className="w-full mb-20 px-40 my-8" onSubmit={(e) => updateProduct(e)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Product Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="product-name" type="text" placeholder="Product Name" defaultValue={product.name} onChange={(e) => setName(e.target.value)} />
                           </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Price
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="price" type="number" placeholder="Price" defaultValue={product.price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                stock
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="stock" type="number" placeholder="" defaultValue={product.quantityStock} onChange={(e) => setStock(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Image
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="image" type="text" placeholder="Image" defaultValue={product.image} onChange={(e) => setImage(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2 my-2">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Color
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="" defaultValue={product.color} onChange={(e) => setColor(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex justify-center my-6">
                        <div className="mb-3 xl:w-96">
                            <select className="form-select appearance-none block w-full px-6 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" defaultValue={product.genre} onChange={(e) => setGenre(e.target.value)}>
                                <option value="Women" selected={product.genre === "Women" && "selected"}>Women</option>
                                <option value="Men" selected={product.genre === "Men" && "selected"}>Men</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center my-2">
                        <div className="mb-3 xl:w-96">
                            {product.category &&
                                <select className="form-select appearance-none block w-full px-6 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example" defaultValue={product.category.id} onChange={(e) => setCategoryp(e.target.value)}>
                                    {loading && listcategory.map((category, index) =>
                                        <option value={category.id} key={index}>{category.name}</option>
                                    )}
                                </select>}
                        </div>
                    </div>
                    <div className="">
                        <div className="mb-3 xl:w-96">
                            <textarea name="" id="description" cols="60" rows="5" defaultValue={product.description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>

                    <button className="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={() => updateProduct}>Update Product</button>
                </form>
            </div>
        </div>
    )
}
