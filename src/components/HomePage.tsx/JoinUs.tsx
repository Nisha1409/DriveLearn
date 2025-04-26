import React from 'react';
import HomeMainButton from '../elements/button/HomeMainButton';

const JoinUs = () => {
    return (
        <div className="px-6 sm:px-12 md:px-24 lg:px-48 mt-20 sm:mt-40 md:mt-56 z-10 relative text-left mb-20">
            <div className="relative joinus h-auto md:h-[270px] gap-6 flex flex-col md:flex-row pt-5 justify-center md:justify-between items-center">
                
                {/* Left Side - Text Content */}
                <div className="w-full md:w-2/3 text-center md:text-left flex flex-col gap-5">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">Improve Our Community</h1>
                    <h2 className="text-sm sm:text-base md:text-xl font-semibold capitalize w-full md:w-2/3">
                        Enhance your personalized learning experience—join us today!
                    </h2>
                    <div className="mt-4 flex justify-center md:justify-start">
                        <HomeMainButton text="Join Us" />
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full md:w-1/3 flex justify-center">
                    <img 
                        src="../../images/joinusbbl.png"  
                        className="joinusShadow h-48 sm:h-56 md:h-64 max-w-full rounded-lg shadow-md" 
                        alt="Join Us" 
                    />
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
