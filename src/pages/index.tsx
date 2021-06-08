import Head from 'next/head';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="app relative h-full w-full flex justify-center items-center overflow-hidden">
      <Head>
        <title>Star Wars</title>
        <meta name="description" content="Star Wars" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="logo flex flex-col text-alt font-meg text-9xl tracking-widest font-bold">
        <div>STAR</div>
        <div>WARS</div>
      </div>
      <Choose />
    </div>
  );
}

const Choose = () => {
  return (
    <Link href="/movies">
      <div className="choose absolute bottom-0 px-2 py-1 cursor-pointer bg-alt filter hover:brightness-75 transition duration-300 ease-in-out flex items-center">
        <span>Choose a star wars movie</span>
        <span className="material-icons">arrow_drop_down</span>
      </div>
    </Link>
  );
};
