import React from 'react'
import { Navbar } from "flowbite-react";
import { Link } from 'react-router-dom';

export default function Header(props) {
  const { countCart } = props;
  return (
    <Navbar
      fluid={true}
      rounded={true}
    >
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Miral Accessoires
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 mt-2">
        <Link className='ml-2' to="/shopList">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
        </Link>
        <Link to='#' className='mr-2'>
          {/* Cart */}
          {countCart ? (
            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">{countCart}</button>
          ) : (
            <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">0</button>
          )
          }
        </Link>
        <Link to="#" className="text-sm mx-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="/"
          active={true}
        >
          Home
        </Navbar.Link>
        <Navbar.Link href="#">
          Contact
        </Navbar.Link>
        <Navbar.Link href="/admin">
          Admin
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
