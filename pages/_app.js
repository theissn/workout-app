import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <nav className="flex content-between fixed w-full bottom-0 text-center">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </nav>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
