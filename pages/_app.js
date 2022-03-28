import Error from "next/error";
import { SWRConfig } from 'swr';
import { DefaultSeo } from 'next-seo';
import { PageProgress } from "../components/progress";
import { ScrollToTop } from '../components/buttons';
import SEO from '../next-seo.config';
import "../styles/globals.css";

const Noop = ({ children }) => <>{children}</>

const App = ({ Component, pageProps = {} }) => {

    const { fallback = {}, error, ...rest } = pageProps; 
    //fallback will be all your prefected data from getStaticProps or getServerSideProps
    if(error) console.error(error);
    
    const Layout = Component.Layout || Noop; //wrap component in layout if exists

    return(
        <>
            <PageProgress />
            <SWRConfig value={{ fallback }}> 
                <DefaultSeo {...SEO}/>
                    <Layout {...rest}>
                        {error //if error return the nextjs error page otherwise return the component
                            ?   <Error 
                                    statusCode={error.status || error.statusCode || 500} 
                                    title={error.message} />
                            :   <Component {...rest} /> }
                    </Layout>
                    <ScrollToTop />
            </SWRConfig>
        </>
    ) 
}

export default App;
