import React from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
// import { GrImage } from 'react-icons/gr';
import { BiImages } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";
const Write = () => {
  return (
    <div className="container mx-auto mt-16 ">
      <div className="bg-[#fff] shadow-2xl w-[70%] h-[320px] rounded-[20px] m-auto">
        <div className="flex p-5">
          <img className="w-[70px] h-[70px] rounded-full mt-5" alt="" />
          <span className="font-bold text-[#000] mt-8 ml-3">
            Mahdi Hosseini
          </span>
        </div>
        <div className="ml-6 mt-5">
          <textarea
            id="message"
            cols="105"
            rows="3"
            className="focus:outline-none"
            placeholder="Writer Articles ....."
          ></textarea>
        </div>
        <form>
          <div className="flex justify-between mt-5">
            <div className="flex ml-6">
              <div>
                <input type="file" />
                {/* <BiImages size={25} color='gray' className='mt-4' /> */}
              </div>
              <button className="w-[130px] h-[40px] ml-5 pl-3 mt-2 bg-gray-200 border rounded-[30px] flex items-center">
                <HiOutlineDocumentText size={25} color="gray" />
                <span className="text-[#929191] text-[14px] text-center pl-1 mt-1">
                  Document
                </span>
              </button>
            </div>
            <div className="mr-6">
              <button className="w-[120px] h-[50px] rounded-[10px] shadow-xl bg-[#122d58]">
                <Link className="text-[14px] text-[#fff]" to="#">
                  Submit
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;
