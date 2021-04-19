import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
       <p className='f5 pa2 white'>
           {'This brain will detect faces in your pictures. Give it a try.. Provide an image link below :'}
       </p>
       <div className='center'>
            <div className='form center pa3 br3 shadow-5'>
                <input className=' f5 pa2 br2 ba b--light-blue w-70 center' type='text' onChange={onInputChange}/>
                <button className='f4 ph3 pv2 br2 dib white bg-dark-blue link w-30 grow' onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    </div>
  );
}

export default ImageLinkForm;