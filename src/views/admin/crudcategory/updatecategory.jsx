import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Updatecategory() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [products, setProducts] = useState();

    const [category, setCategory] = useState([]);

    const url = "https://127.0.0.1:8000/ws/categories/" + id;

    const getCategory = async () => {
        try {
            await axios.get(url).then((response) => {
                setCategory(response.data);
                setName(response.data.name);
                setProducts(response.data.products.id);
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategory()
    }, []);




    const updateCategory = async (e) => {
        e.preventDefault()
        let categoryupdated = {
            name: name,
            product: "ws/products/" + products,
        }
        console.warn(categoryupdated);
        try {
            await axios.put(`https://127.0.0.1:8000/ws/categories/${id}`, categoryupdated).then((response) => {
                window.location.replace("/admin")
                console.log(categoryupdated)
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row mr-16 ml-10 mb-20 rounded-lg bg-white shadow-lg">
                <form className="w-full mb-20 px-40 my-8" onSubmit={(e) => updateCategory(e)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Category Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="category-name" type="text" placeholder="Category Name" defaultValue={category.name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <button className="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={() => updateCategory}>Update Category</button>
                </form>
            </div>
        </div>
    )
}
