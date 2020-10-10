import { CssBaseline, ThemeProvider } from '@material-ui/core'
import Head from 'next/head'
import { Fragment, useEffect } from 'react'
import '../styles/globals.css'
import theme from '../theme/theme'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </Fragment>
  )
}

export default MyApp
