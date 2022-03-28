import NextNprogress from 'nextjs-progressbar';

const PageProgress = ({
    color = process.env.NEXT_PUBLIC_PRIMARY_COLOR,
    height = 3,
    showSpinner =  false
    }) => {
    return <NextNprogress 
        color={color} 
        height={height} 
        options={{ showSpinner }} />
}

export default PageProgress;