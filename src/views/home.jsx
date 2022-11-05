import React, { useEffect, useState } from 'react'
import Header from '../components/layout/header'
import Footer from '../components/layout/footer'
import { Carousel } from 'flowbite-react'
import ListProducts from '../components/listProducts'
import Modal from './modal'


export default function Home() {

  // Cart
  const [cart, setCart] = useState(
    () => {
      // getting stored value
      const saved = localStorage.getItem("notrepannier");
      const initialValue = JSON.parse(saved);
      return initialValue || [];
    }
  );


  const [modalOn, setModalOn] = useState(false)


  //  +1 and -1 in the shop icon
  const onAdd = (product) => {
    // console.log('onadd');
    const exist = cart.find((x) => x.id === product.id);
    if (exist) {
      const newCart = cart.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCart(newCart);
    } else {
      const newCart = [...cart, { ...product, qty: 1 }];
      setCart(newCart);
      setModalOn(true);
    }
  }
  const onRemove = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      const newCart = cart.filter((x) => x.id !== product.id);
      setCart(newCart);
    } else {
      const newCart = cart.map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCart(newCart);
    }
  }

  useEffect(() => {
    localStorage.setItem("notrepannier", JSON.stringify(cart));
  }, [cart]);

  const [category, setCategory] = useState("")

  return (
    <div>
      <Header countCart={cart.length}></Header>
      <div className="mx-auto max-w-2xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-2">
        <div className="h-96 bg-black">
          <Carousel>
            <img
              src="https://www.numero.com/sites/default/files/styles/large/public/2022-04/push-sacs-vente-christies-herm%C3%A8s-numero-magazine.jpg?itok=WlQQuUoQ"
              alt="..."
            />
            <img
              src="https://cdn2.chrono24.com/images/uhren/25372422-rr72aviyri2l1w3zvvigu8am-ExtraLarge.jpg"
              alt="..."
            />
            <img
              src="https://images.hbjo-online.com/sites/ferret/uploads/images/62c3eb0d73b86627e1feb9db67_5e18426de057b5e172d67959aashutterstock1429001417.jpg"
              alt="..."
            />
          </Carousel>
        </div>
        <div>
          <h1 className='text-4xl text-center my-10 font-bold '> Products </h1>
          <div className='flex justify-center items-baseline'>
            <h3 className=' font-bold underline px-14 '> Filter : </h3>
            <div>
              <button onClick={() => { setCategory(""); console.log("") }} className='px-3 py-1 rounded-lg bg-slate-200 text-center m-2'>Show All Products</button>
              <button onClick={() => { setCategory("Men"); console.log("Men") }} className='px-3 py-1 rounded-lg bg-slate-200 text-center m-2'>Men</button>
              <button onClick={() => { setCategory("Women"); console.log("Women") }} className='px-3 py-1 rounded-lg bg-slate-200 text-center m-2'>Women</button>
            </div>
          </div>
          <ListProducts cart={cart} onAdd={onAdd} onRemove={onRemove} query={category}></ListProducts>
        </div>
      </div>
      {modalOn && <Modal setModalOn={setModalOn} />}
      <Footer></Footer>
    </div>
  )
}
