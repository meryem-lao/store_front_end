import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Showcategory() {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [listproductscategory, setListproductscategory] = useState([]);


    const url = "https://127.0.0.1:8000/ws/categories/" + id;

    const getCategory = async () => {
        try {
            await axios.get(url).then((response) => {
                console.log(response.data.products);
                // console.log(response.data['hydra:member']);
                setCategory(response.data);
                setListproductscategory(response.data.products);
                //setLoading(true)
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategory()
    }, []);
    return (
        <div className="flex justify-center">
            <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                <h5 className="text-gray-900 text-xl font-medium mx-4 my-6">{category.name}</h5>
                <div className="p-24 flex flex-col justify-start">
                    {listproductscategory.length > 0 ?
                        (<table className="min-w-full">
                            <thead className="bg-white border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">

                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                        List Products Name of Category
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listproductscategory.map((product, index) =>
                                    <tr className="bg-gray-100 border-b" key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{++index}</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {product.name}
                                        </td>

                                    </tr>
                                )}
                            </tbody>
                        </table>) : (
                            <h3> There are no products in this category </h3>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
