
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Postcategory() {

    const [name, setName] = useState("");

    const urlp = "https://127.0.0.1:8000/ws/categories";
    const createCategory = async (e) => {
        e.preventDefault();
        await axios.post(urlp, {
            name: name,
        }).then((response) => {
            console.log(response)
        });
        window.location.replace("/admin/category")
    };
    console.log({ name: name })


    return (
        <div>
            <div className="flex flex-col md:flex-row mr-16 ml-10 mb-20 rounded-lg bg-white shadow-lg">
                <form className="w-full mb-20 px-40 my-8" onSubmit={(e) => createCategory(e)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Category Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="product-name" type="text" placeholder="Category Name" onChange={(e) => setName(e.target.value)} />
                            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                        </div>
                    </div>

                    <button className="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Add Category</button>

                </form>
            </div>
        </div>
    )
}
