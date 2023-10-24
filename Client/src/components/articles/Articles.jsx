import React from 'react'
const Articles = () => {
    return (
        <div className='container mx-auto'>
            <div className='flex items-center justify-center mt-10'>

                <div className='bg-[#eee] w-[40%] h-[2px]'></div>
                <h1 className='borderArticles text-[28px] text-[#000] font-extrabold text-center px-5'>Articles</h1>
                <div className='bg-[#eee] w-[40%] h-[2px]'></div>
            </div>
            <div className='flex flex-col justify-center text-center mt-20'>
                <h1 className='text-[#3b82f6] font-extrabold text-[28px]'>Our Blogs</h1>
                <p className='text-[16px] text-[#929191] w-[380px] lg:w-[600px] mt-5 text-center m-auto'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, commodi cum! Assumenda, provident. Repellat, eaque veniam nulla, quibusdam quisquam iste o</p>
            </div>

            {/* <div className='bg-[#b8d9ec] h-auto pb-5 w-[95%] m-auto rounded-[30px] mt-10'>
                <div className='pt-5'>
                    <img className='w-[80px] h-[80px] m-auto  rounded-full' src={blog} alt="" />
                </div>
                <h1 className='text-[#000] text-[28px] font-extrabold text-center pt-12'>
                    Artificial Intelligenc Beyond Imgainations
                </h1>
                <p className='text-center md:w-[600px] lg:w-[900px] m-auto font-bold pt-5 text-[14px] text-[#94a3b8] '><span className='text-[#000] font-bold text-[16px]'>Lorem ipsum, dolor</span> sit amet consectetur adipisicing elit. Quas vitae, <span className='text-[#000] font-bold text-[16px]'>fugit repellendus </span>distinctio ex non obcaecati itaque vel dignissimos suscipit enim ducimus praesentium libero dolor nobis! Unde ad voluptatem cupiditate.</p>

            </div> */}

        </div>
    )
}

export default Articles
