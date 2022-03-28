import React, { useEffect, useState } from 'react';
import { ArrowSmUpIcon } from '@heroicons/react/outline';
import classNames from '../../utils/classNames';

const ScrollToTop = () => {

    const [ isVisible, setIsVisible ] = useState(false);


    const toggleVisibility = () => {
        if(window.pageYOffset > 300) setIsVisible(true)
        else setIsVisible(false)
    }


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
    
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }

    }, []);

    return(
        <div className="fixed bottom-9 right-9 drop-shadow-md">
            <button
                type="button"
                onClick={scrollToTop}
                className={classNames(
                    isVisible ? 'opacity-100' : 'opacity-0',
                    'inline-flex items-center rounded-full bg-orange-700 p-2 text-white shadow-sm transition-opacity hover:bg-orange-800 focus:outline-none',
                )}
            >
                <ArrowSmUpIcon className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
    )
}

export default React.memo(ScrollToTop);