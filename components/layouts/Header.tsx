import React from 'react';
import { Button } from '../ui/button';

const Header:React.FC = () => {
    
    return <div className='h-[631px]'>
        <div className="flex relative">
            <div>
        <h1 className="font-[900] text-transparent text-8xl header-gradient mt-28 mb-4 relative z-10">
        Build Faster
      </h1>
      <p className="text-2xl max-w-[629px]">Beautifully designed, data-infused components to help you build web applications faster.</p>
      <div className="flex mt-14 space-x-4 relative z-30">
      <Button href="#features">Browse Blocks</Button>
      <Button variant='outline'>Explore the Demo</Button>
      </div>
            </div>
            <img src="/assets/header/dark-blocks.png" alt="background image" className='absolute w-[90%] -top-36 -right-40 z-20 mx-auto'/>
            <img src="/assets/header/gradient.png" alt="background image" className='absolute -top-28 -right-56 z-20 mx-auto'/>
      </div>
      <img src="/assets/header/background.png" alt="background image" className='absolute -top-14 inset-0 w-screen z-0 max-w-[1912px] mx-auto opacity-10'/>
    </div>
}
export default Header;