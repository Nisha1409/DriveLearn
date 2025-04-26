import React from 'react';
import { Divider } from 'antd';

const Footer = () => {
    return (
        <div className="bg-secondbg h-auto pt-10 mt-20 sm:mt-40 md:mt-44 relative px-6 sm:px-12 md:px-24 lg:px-48">
            
            {/* Top Footer Section */}
            <div className="topfooter uppercase text-sm font-medium flex flex-col md:flex-row gap-8 justify-between">
                <div className="w-full md:w-3/5 flex flex-col md:flex-row justify-between text-sm text-left font-normal">
                    {[
                        { title: "Content", items: ["New services", "Blog"] },
                        { title: "Links", items: ["About us", "Join us", "Business", "Jobs"] },
                        { title: "Legal", items: ["Terms and conditions", "License agreement", "Privacy policy", "Cookies settings"] },
                        { title: "Support", items: ["FAQ", "Contact"] },
                    ].map((section, index) => (
                        <ul key={index} className="mb-4">
                            <li className="text-base font-semibold mb-2">{section.title}</li>
                            {section.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    ))}
                </div>

                {/* Social Media Section */}
                <div className="w-full md:w-1/3 flex flex-col items-center uppercase text-center">
                    <h2 className="text-base font-semibold">Follow Us</h2>
                    <div className="mt-6 flex justify-center gap-6">
                        {["linkedin", "facebook", "insta", "tiktok", "whatsapp"].map((platform) => (
                            <img key={platform} src={`../../images/${platform}.png`} className="h-7 max-w-full" alt={platform} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider & Copyright Section */}
            <div className="flex flex-col items-center my-7">
                <Divider style={{ borderWidth: "1px", borderColor: "#25323B", opacity: "0.7" }} />
                <div className="flex flex-col md:flex-row justify-between items-center w-full px-5 mt-6">
                    <div className="flex items-center gap-4">
                        <img src="../../images/logo.png" className="h-9 max-w-full" alt="Logo" />
                        <span className="capitalize text-sm sm:text-base font-semibold">© Copyrights Promptly AI. All rights reserved.</span>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="absolute capitalize font-medium flex justify-center md:justify-evenly items-center bottom-0 text-secondbg w-full bg-mainblack h-16">
                <span className="text-center text-sm sm:text-base">Your trusted learning companion.</span>
            </div>
        </div>
    );
};

export default Footer;
