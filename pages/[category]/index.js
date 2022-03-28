import { useMemo } from 'react';
import { Basic } from '../../components/layout';
import { useRouter } from 'next/router';
import { strToLocale } from '../../utils/locales';
import useSWR from "swr";
import Link from 'next/link';

const Category = ({ test }) => {

    //getStaticProps has already run 
    console.log('test', test) //returned from getStaticProps

    const router = useRouter();
    const { locale, defaultLocale, query } = router;
    const { category } = query; //the category from the URL
    
    console.log('router', router);
    //const { data, error } = useSWR(`/data-endpoint?locale=${locale}`, fetcher); //this data would have already been fetched so should be available immediately 
    
    //console.log('isLoading', !data && !error); //should always be false as data was fetched in getStaticProps

    const formattedLocale = useMemo(() => strToLocale(locale), [ locale ]);

    const formattedDefaultLocale = useMemo(() => strToLocale(defaultLocale), [ defaultLocale ]);

    const localisationsForPage = [
        { locale: 'en-gb', category: 'football' },
        { locale: 'en-us', category: 'soccer '}
    ]

    return(
        <>
            {/* add in the NextSeo component as shown on the homepage */}
            <div className='w-3/4 mx-auto pt-20'>
                <div className="bg-white rounded-lg">
                    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block">{`Current Locale is ${formattedLocale}`}</span>
                            <span className="block">{`Default Locale is ${formattedDefaultLocale}`}</span>
                            <span className="block">{`Category Name is ${category}`}</span>
                        </h2>
                        <div className="mt-8 flex justify-center">
                            <div className="inline-flex rounded-md shadow ml-3">
                                <Link href={'/'} locale={locale} passHref>
                                    <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                                        {`Visit Home`}
                                    </a>
                                </Link>
                            </div>
                            {localisationsForPage.map(localisation => 
                                <div className="inline-flex rounded-md shadow ml-3" key={localisation.locale}>
                                    <Link href={`/${localisation.category.trim()}/`} locale={localisation.locale.toLowerCase()} passHref>
                                        <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                                            {`Visit ${strToLocale(localisation.locale)} ${localisation.category}`}
                                        </a>
                                    </Link>
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Category.Layout = Basic;

/**
 * because this is a variable page name because it's index.js inside the [category] folder we need to use getStaticPaths in order to tell nextjs which paths exist
 */
export const getStaticPaths = async context => {
    /**
     * fetch every possible [category] for all languages, anything not registered here will return a 404 page not found error due to fallback: false
     */

    // const [ enGB, enUS ] = await Promise.all([
    //     fetcher('/en-gb-endpoint'),
    //     fetcher('/en-us-endpoint')
    // ]);

    return{
        paths: [
            { params: { category: 'football' }, locale: 'en-gb' }, //category is the param which is named in the file [category], it can be [anything]
            { params: { category: 'soccer' }, locale: 'en-us'}
        ],
        fallback: false
    }
}

/**
 * getStaticProps should be used when the data will be the same for all visistors
 * if this is an authenticated route then getServerSideProps should be used.
 */
 export const getStaticProps = async context => {
    /**
     *  context.locale will reference the current requested locale based on the URL
     *  all accepted locales and the default locale are referenced in the next-seo.config.js
     * 
     *  params will have the category from the URL
     */
    const { locale, params } = context; 
    const { category } = params;
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

export default Category;