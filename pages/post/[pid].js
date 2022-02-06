import Head from "next/head";
import styles from '../../styles/Home.module.css'
import Image from "next/image";
import * as Posts from '../../lib/post';
import Link from "next/link";
import { useRouter } from "next/router";
// import { Router, useRouter } from "next/router";

// export async function getStaticProps({ params }) {
export async function getStaticProps({ params }) {

    // console.log("Context:" + context);

    const randomImg = Posts.getRandomPost();


    // if (context) {
    //     if (context['params']) {
    //         if(context['params']['pid']) {
            
        
    if (params.pid === `random`) {
        console.log('random');
        return {
            redirect: {
                destination: `/post/${randomImg.pid}`,
                permanent: false
            },
            revalidate: 1
        }
    }
    
    let img = Posts.getPost(params.pid); 
    // let img = Posts.getRandomPost();

    return {
        props: {
            img,
            randomImg
        }
    };    
            // }
    //     }
    // }

    // return {
    //     notFound: true
        // redirect: {
        //     destination: '/',
        //     permanent: false
        // }
    // };


}

export default function Post({ img, randomImg }) {

    // const router = useRouter();
    // router.push(`/post/${img.pid}`);

    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>
    }


    return (
        <div className={styles.container}>
        <Head>
            <title>PP #{img.pid}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <div style={{padding: "10px", textAlign: "center", height: "90vh", border: 10, borderStyle: 'solid', position: "relative"}}>
            {/* <Image src={currentImage.public} alt="" width={currentImage.width} height={currentImage.height} layout='' objectFit=''></Image> */}
            {/* <Image src="/photos/mileena_s_secret_workout__mortal_kombat__by_pactdart_dezd2c2-pre.jpg" alt="" width={"730px"} height={"1095px"} layout='' objectFit=''></Image> */}
            {/* <Image src={img.public} alt="" width={img.dimensions.width} height={img.dimensions.height} layout='' objectFit=''></Image> */}
            {/* <Image src={img.public} alt="" width={img.dimensions.width} height={img.dimensions.height} layout="fill" objectFit='contain'></Image> */}
            <Image src={img.public} alt="" layout="fill" objectFit='contain'></Image>
            </div>        
            <div style={{ width: "100%", textAlign: "center"}}>
            {/* <div>#{img.index}</div> */}
            <div>
                <Link href={"/post/" + randomImg.pid}>
                    <a>NEXT</a>            
                </Link>
            </div>

            </div>
        </main>
        </div>
    )
}

export async function getStaticPaths() {

    const posts = Posts.getPosts();
    const paths = posts.map((post) => ({
        params: { pid: `${post.pid}` }
    }));
    // paths.push({
    //     params: { pid: `random` }
    // });

    return {
        paths,
        fallback: true
    };
}