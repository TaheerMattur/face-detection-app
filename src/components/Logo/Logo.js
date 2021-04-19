import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'

const Logo = () => {
  return (
    <div className='ma1 mt4' style={{display: 'flex', justifyContent: 'center'}}>
        <Tilt 
            className="Tilt br2 shadow-3" 
            style={{ height: 130, width: 130 }}
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.6}
            scale={1.02}> 
        </Tilt>
    </div>
  );
}

export default Logo;