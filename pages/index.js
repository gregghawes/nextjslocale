import { useMemo } from 'react';
import { NextSeo } from "next-seo";
import { fetcher } from '../utils/fetcher';
import { useRouter } from 'next/router';
import { Basic } from '../components/layout';
import useSWR from "swr";
import Link from 'next/link';
import { strToLocale } from '../utils/locales';

const Homepage = ({ test }) => {
    
    //getStaticProps has already run 
    console.log('test', test) //returned from getStaticProps

    const router = useRouter();
    const { locale, defaultLocale } = router; //router object will return the current locale based on the URL and the default Locale specfied in the next-seo-config.js

    //const { data, error } = useSWR(`/data-endpoint?locale=${locale}`, fetcher); //this data would have already been fetched so should be available immediately 
    
    //console.log('isLoading', !data && !error); //should always be false as data was fetched in getStaticProps

    const formattedLocale = useMemo(() => strToLocale(locale), [ locale ]);

    const formattedDefaultLocale = useMemo(() => strToLocale(defaultLocale), [ defaultLocale ]);

    const localisationsForPage = ['en-gb', 'en-us']; //this should be from db so you can see which languages this page has in order to build the hreflang tags

    return(
        <>
            <NextSeo
                title={`${formattedLocale} Page Title`}
                description={`${formattedLocale} Meta Description`}
                canonical={`${process.env.NEXT_PUBLIC_HOST}${locale !== defaultLocale ? `/${locale}/`: '/'}`}
                languageAlternates={localisationsForPage.map(localisation => ({
                    hrefLang: strToLocale(localisation),
                    href: `${process.env.NEXT_PUBLIC_HOST}${localisation.toLowerCase() !== defaultLocale ? `/${localisation.toLowerCase()}/` : ''}`
                }))}/>
            <div className='w-3/4 mx-auto pt-20'>
                <div className="bg-white rounded-lg">
                    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block">{`Current Locale is ${formattedLocale}`}</span>
                            <span className="block">{`Default Locale is ${formattedDefaultLocale}`}</span>
                        </h2>
                        <div className="mt-8 flex justify-center">
                            {localisationsForPage.map(localisation => 
                                <div className="inline-flex rounded-md shadow ml-3" key={localisation}>
                                    <Link href="/" locale={localisation.toLowerCase()} passHref>
                                        <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                                            {`Visit ${strToLocale(localisation)}`}
                                        </a>
                                    </Link>
                                </div>
                            )}
                            <div className="inline-flex rounded-md shadow ml-3">
                                <Link href={`/${locale === defaultLocale ? 'soccer' : 'football'}/`} locale={locale} passHref>
                                    <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                                        {`Visit ${locale === defaultLocale ? 'soccer' : 'football'}`}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

Homepage.Layout = Basic;// you can create a layout which will wrap around your component if you specify it here


/**
 * getStaticProps should be used when the data will be the same for all visistors
 * if this is an authenticated route then getServerSideProps should be used.
 */
export const getStaticProps = async context => {
    /**
     *  context.locale will reference the current requested locale based on the URL
     *  all accepted locales and the default locale are referenced in the next-seo.config.js
     */
    const { locale } = context; 

    // const [ data, data1, data2, data3 ] = await Promise.all([
    //     fetcher(`/data-endpoint?locale=${locale}`),
    //     fetcher(`/data1-endpoint?locale=${locale}`),
    //     fetcher(`/data2-endpoint?locale=${locale}`),
    //     fetcher(`/data3-endpoint?locale=${locale}`),
    // ])   //fetch all data that is required to be rendered initially 

    // if(!data){
    //     return{
    //         notFound: true
    //     }
    // } best to handle 404 errors in getServerSideProps and getStaticProps you can also do redirects here. https://nextjs.org/docs/api-reference/data-fetching/get-static-props

    return{
        props:{
            test: 'something', // you can return any props you like from getStaticProps
            // fallback: {  but the best way to pass fetched data is by using fallback and useSWR https://swr.vercel.app/examples/ssr as it caches the response, revalidates and mutates
            //     [`/data-endpoint?locale=${locale}`]: data,
            //     [`/data1-endpoint?locale=${locale}`]: data1,
            //     [`/data2-endpoint?locale=${locale}`]: data2,
            //     [`/data3-endpoint?locale=${locale}`]: data3,
            // }
        }
    }
}

export default Homepage;
