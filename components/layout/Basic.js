import React from 'react';

const Basic = ({ children }) => {
    return(
        <div className='min-h-screen bg-gray-100'>
            {children}
        </div>
    )
}

export default React.memo(Basic);