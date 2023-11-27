'use client';

import React from 'react';
import ThemeSwitch from '../elements/ThemeSwitch/ThemeSwitch';

const Navbar: React.FC = () => {

    return <div className="h-[76px] w-screen lg:flex-center glassmorphism top-0 z-50 border-b border-gray-50 bg-white/70 dark:border-dark-gray-100 dark:bg-black/50 sticky">
        <div className="max-w-[1500px] mx-auto h-full flex items-center"><img src="/assets/nav-logo.png" alt="footer logo" className="w-32" /><div className="grow" />
            <div className="flex"><ThemeSwitch /></div></div></div>
}
export default Navbar;