import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'lazysizes';
import FullWidthGrid from '../components/FullWidthGrid'
import CharacterDialog from '../components/CharacterDialog'
import {
  closeDialogIfNeeded,
  fetchPageIfNeeded,
  openDialogIfNeeded,
  pageChange,
} from '../redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0',
      position: 'sticky',
      padding: 12,
      bottom: 0,
      backgroundColor: theme.palette.background.default,
      boxShadow: '0 -1px 51px 0px rgba(0,0,0,0.55)',
    },
    nav: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      backgroundColor: theme.palette.background.default,
      boxShadow: '0 2px 20px 0px rgba(0,0,0,0.55)',
    },
    ul: {
      justifyContent: 'center',
    },
    container: {
      paddingLeft: 24,
      paddingRight: 24,
      marginTop: 20,
      minHeight: '100vh',
    },
  })
)

export default function Characters() {
  const classes = useStyles()
  const currentPage = useSelector((state) => state.currentPage || 1)
  const currentPageData = useSelector((state) => state.pages[currentPage - 1])
  const isDialogOpen = useSelector((state) => state.isDialogOpen || false)
  const dialogData = useSelector((state) => state.dialogData)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleClickToHome = (e) => {
    e.preventDefault()
    router.push('/')
  }

  useEffect(() => {
    dispatch(fetchPageIfNeeded(1))
  }, [])

  console.log('CurrentPageData: ', currentPageData)

  const onPageChange = (event: object, page: number) => {
    dispatch(pageChange(page))
    console.log('page: ', page)
  }

  const openDialog = (characterInfo, locationIds, episodeIds) => {
    console.log('currentPageData: ', currentPageData)
    dispatch(openDialogIfNeeded(characterInfo, locationIds, episodeIds))
  }

  function closeDialog() {
    dispatch(closeDialogIfNeeded())
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={classes.nav}>
        <img
          onClick={handleClickToHome}
          src="/logo-rickandmorty.png"
          alt="rickandmorty logo"
        />
      </nav>
      <Container className={classes.container}>
        <FullWidthGrid
          items={currentPageData?.characters}
          handleDialogOpen={openDialog}
        />
      </Container>
      <Pagination
        count={currentPageData?.info?.pages}
        size="large"
        onChange={onPageChange}
        classes={{ ul: classes.ul }}
        className={classes.root}
      />
      <CharacterDialog
        data={dialogData}
        handleClose={closeDialog}
        open={isDialogOpen}
      />

      <style jsx>{`
        img {
          display: block;
          margin: 0 auto;
          padding: 10px 10px 11px;
          cursor: pointer;
        }

        @media screen and (min-width: 600px) {
        }
      `}</style>
    </>
  )
}
