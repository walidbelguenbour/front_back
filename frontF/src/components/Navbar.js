import React from "react";
import '../Style/Navbar.css';
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';


function Navbar() {
  return (
    <div className="navbar border-b border-gray-500 bg-white">
      <div className="flex-1">
        <Link className="btn bg-green-500 border-green-500 text-white py-2 px-4 font-montserrat" to='/Login'>تسجيل الدخول</Link>
      </div>

      <div className="flex-none">
      

      <ul className="menu-horizontal px-1">
        <li className="relative px-2 py-0 font-montserrat">
          <Link className="inline-block py-2 px-2 hover:text-orange-500">تنظيم الهيئة الوطنية</Link>
        </li>

        <li className="relative px-2 py-0 font-montserrat">
          <Link to='/Signaler' className="inline-block py-2 px-2 hover:text-orange-500">التبليغ عن الاخطارات</Link>
        </li>

        <li className="relative px-2 py-0 font-montserrat">
          <Link className="inline-block py-2 px-2 hover:text-orange-500">مقالات</Link>
        </li>

        <li className="relative px-2 py-0 font-montserrat">
          <Link to='/' className="inline-block py-2 px-2 hover:text-orange-500">الرئيسية</Link>
        </li>
      </ul>


      </div>

      <div className="flex-2">
        <p className="text-orange-500 text-sm">الهيئة الوطنية لحماية وترقية الطفولة</p>
        <img className="w-12 h-12" src={logo} alt="Logo" />
      </div>
    </div>

  );
}

export default Navbar;