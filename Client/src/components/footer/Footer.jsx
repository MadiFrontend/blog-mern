import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div className='bg-[#122d58]  h-auto mt-[6rem] pb-7'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2'>
                    <div className='flex flex-col justify-center text-center lg:text-start mt-12 md:ml-12'>
                        <h1 className='text-[#fff] font-extrabold text-[28px]'>Subscribe For New Contacy</h1>
                        <p className='text-[#fff] text-[16px]'>Ny Becoming Member of Our Blog, You Have Access Articles And Contacy</p>
                    </div>
                    <div>
                        <form className='m-auto md:m-0 pt-10'>
                            <p className='text-[#fff] text-[12px] ml-[5rem] mb-1'>Email</p>
                            <div className="relative ml-[4rem]  md:text-left">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <AiOutlineMail size={22} color='#fff' />
                                </div>
                                <input type="email" placeholder='info255@gmail.com' id="default-search" className="block md:w-[60%] w-[320px] md:h-[45px] bg-[#2e466f] p-[6px] pl-12 text-sm text-gray-900  rounded-[20px]  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

                            </div>

                        </form>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Footer
