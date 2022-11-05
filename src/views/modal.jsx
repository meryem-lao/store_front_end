import React from 'react'

export default function Modal(props) {

    const { setModalOn} = props;

    const handleOkClick = () => {
        setModalOn(false);
    }

    return (
        <div className=' bg-zinc-200 opacity-90 fixed inset-0 z-50 '>
            <div className=' flex h-screen justify-center items-center '>
                <div className=' flex-col justify-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl '>
                    <div className=' flex text-lg text-zinc-600 '>
                        <p>You added the product to the basket</p>
                    </div>
                    <div className=' flex text-lg text-zinc-600 '>
                        <p>Click <span className=' text-green-600 font-bold text-xl'>" + "</span> to increment the quantity</p>
                    </div>
                    <div className=' flex text-lg text-zinc-600 mb-10'>
                        <p>Click <span className=' text-blue-800 font-bold text-xl'>" - "</span> to decrement the quantity</p>
                    </div>
                    <div className=' text-center '>
                        <button onClick={handleOkClick} className=' rounded px-4 py-2 text-white bg-green-400'>Ok</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
