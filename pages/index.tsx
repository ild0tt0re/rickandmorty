import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/characters')
  }

  return (
    <>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <button className="btn btn-effect" onClick={handleClick}>See all characters</button>
        </main>
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
          background: url(https://dslv9ilpbe7p1.cloudfront.net/aEdppypW81E_v6Nfl-rIbA_store_banner_image.jpeg);
          background-size: cover;
          background-position: center;
        }

        main {
          height: 100%;
          align-items: flex-end;
          display: flex;
        }

        .btn {
          box-sizing: border-box;
          appearance: none;
          background-color: transparent;
          border: 2px solid #255229;
          border-radius: 0.6em;
          color: #255229;
          cursor: pointer;
          display: flex;
          align-self: center;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1;
          margin: 20px auto;
          padding: 1.2em 2.8em;
          text-decoration: none;
          text-align: center;
          text-transform: uppercase;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }

        .btn:hover,
        .btn:focus {
          color: #fff;
          outline: 0;
        }
        .btn-effect {
          border-color: #a7ff3e;
          color: #255229;
          box-shadow: 0 0 40px 40px #a7ff3e inset, 0 0 0 0 #a7ff3e;
          transition: all 150ms ease-in-out;
        }
        .btn-effect:hover {
          box-shadow: 0 0 10px 0 #a7ff3e inset, 0 0 10px 4px #a7ff3e;
        }

        @media screen and (min-width: 600px) {
          .container {
          }
        }
      `}</style>
    </>
  )
}
