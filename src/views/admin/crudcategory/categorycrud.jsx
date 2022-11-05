import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Categorycrud() {
    const [listcategory, setListcategory] = useState([]);

    // with Axios
    const url = "https://127.0.0.1:8000/ws/categories";

    const getCategories = async () => {
        await axios.get(url).then((response) => {
            // console.log(response.data['hydra:member']);
            setListcategory(response.data['hydra:member']);
        });
    };

    const deleteCategory = async (id) => {
        console.log(id)
        try {
            await axios.delete(`https://127.0.0.1:8000/ws/categories/${id}`)
                .then((response) => {
                    // console.log(response.data['hydra:member']);
                    // e.preventDefault();
                    window.location.replace("/admin/category")
                });
        } catch (error) {
            // console.log("you can not delete category related to our products");
            //console.log(error.message);
            alert("You can't delete category related to our products");
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const showCategoryDetails = async (id) => {
        // console.log(id);
        window.location.replace("/admin/showCategory/" + id)
    }

    const selectCategory = (id) => {
        // console.log(id)
        window.location.replace("/admin/updateCategory/" + id)
    };

    return (
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:mx-6 lg:mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <div className='mb-6'>
                                <Link to="/admin/addCategory" className="inline-block px-4 py-2 border-2 border-green-500 text-green-500 font-medium text-xl leading-tight uppercase rounded-lg hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"> Add Category</Link>
                            </div>
                            {listcategory.length > 0 ?
                                (<table className="min-w-full  mb-40 mt-11">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left"></th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Name
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Category Details
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                Update
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                                Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listcategory.map((category, index) =>
                                            <tr className="bg-gray-100 border-b" key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{++index}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{category.name}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button onClick={() => showCategoryDetails(category.id)}> show </button>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                                    <button type="button" onClick={() => selectCategory(category.id)} className="inline-block px-4 py-2 border-2 border-gray-200 text-gray-200 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-7 h-7">
                                                            <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z" />
                                                        </svg>
                                                    </button>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                                                    <button type="button" onClick={() => deleteCategory(category.id)} className="inline-block px-4 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-7 h-7">
                                                            <path fill="red" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>) :
                                (<div role="status" className='flex justify-center py-28 pr-40'>
                                    <svg className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                    <span className="sr-only">Loading...</span>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
