import Pagination from '@material-ui/lab/Pagination'
import Head from 'next/head'
import { Button, Container, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import FullWidthGrid from '../components/FullWidthGrid'
import AlertDialog from '../components/AlertDialog'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  closeDialogIfNeeded,
  fetchPageIfNeeded,
  openDialogIfNeeded,
  pageChange,
} from '../redux/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '30px 0'
    },
    ul: {
      justifyContent: 'center',
    }
  })
)

export default function Characters() {
  const classes = useStyles()
  const currentPage = useSelector((state) => state.currentPage || 1)
  const currentPageData = useSelector((state) => state.pages[currentPage - 1])
  const isDialogOpen = useSelector((state) => state.isDialogOpen || false)
  const dialogData = useSelector((state) => state.dialogData)
  const dispatch = useDispatch()

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
      <Container>
        <Grid justify="center">
          <h1>Rick and Morty</h1>
        </Grid>
        <FullWidthGrid
          items={currentPageData?.characters}
          handleDialogOpen={openDialog}
        />
        <Pagination
          count={currentPageData?.info?.pages}
          size="large"
          onChange={onPageChange}
          classes={{ul: classes.ul}}
          className={classes.root}
        />
        <Button
          onClick={() => openDialog({}, [1, 2], [1, 2])}
          variant="contained"
          color="primary"
        >
          Material Button
        </Button>
      </Container>
      <AlertDialog
        data={dialogData}
        handleClose={closeDialog}
        open={isDialogOpen}
      />

      <style jsx>{`
        h1 {
          text-align: center;
        }
        .pagination {
          justify-content: center;
        }

        @media screen and (min-width: 600px) {
          img {
            width: 200px;
          }
        }
      `}</style>
    </>
  )
}
