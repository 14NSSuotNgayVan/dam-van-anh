import { Link } from "react-router-dom";
import arrowRight from "../assets/arrow-right.svg"
const Home = () => {
    return <>
        <h1 className="font-bold">Dam Van Anh</h1>
        <h4 className="mt-4">Implementation of a coding challenge for <b className="text-[#747bff] uppercase">99tech</b> company</h4>
        <ul className="mt-8">
            <li><Link className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2" to={"https://github.com/14NSSuotNgayVan/dam-van-anh/blob/main/src/problem1/problem1.md"}>Implementation for problem 1 <img src={arrowRight} className="w-4 ml-2" alt="arrow-right" /></Link></li>
            <li><Link className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2" to={"/problem2"}>Implementation for problem 2 <img src={arrowRight} className="w-4 ml-2" alt="arrow-right" /></Link></li>
            <li><Link className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2" to={"https://github.com/14NSSuotNgayVan/dam-van-anh/blob/main/src/problem3/problem3.md"}>Implementation for problem 3 <img src={arrowRight} className="w-4 ml-2" alt="arrow-right" /></Link></li>
        </ul>
    </>;
};
export default Home;