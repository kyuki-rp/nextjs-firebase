import Head from 'next/head'

const Seo = ({title, description}) => {
  
    return (
        <Head>
        <title>{title}</title>
        <meta name="description" key="description" content={description} />
        </Head>
    )

}

export default Seo