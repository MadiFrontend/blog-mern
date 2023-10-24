import React from 'react'
import { AboutBlog } from '../../data/AboutBlog';
import { FaInstagram } from 'react-icons/fa';
import { FiFacebook , FiTwitter} from 'react-icons/fi';
const About = () => {
    return (
        <div className='container mx-auto'>
            {
                AboutBlog.map((about) => {
                    return (
                        <div key={about.id} className='flex flex-col items-center justify-center mt-20'>
                        <img className='w-[350px] h-[200px] md:w-[600px] md:h-[300px] rounded-[20px]' src={about.imaga} alt="" />
                        <h2 className='text-[24px] font-extrabold text-center lg:mr-12 text-[#000] mt-10'>{about.title}</h2>
                        <p className='text-[16px] text-[#929191] mt-3 text-center lg:text-start  w-[380px] lg:w-[600px]'>{about.description}
                        </p>
                        <span className='text-[#929191] text-[25px]'>,,,,,</span>
                    </div>
                    )
                })
            }
           <div className='flex gap-5 justify-center items-center mt-10'>
            <FaInstagram size={22} color=''/>
            <FiFacebook size={22} color='' />
            <FiTwitter size={22} color='' />
           </div>

        </div>
    )
}

export default About
