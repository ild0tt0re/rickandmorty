import Head from 'next/head'
import { useRouter } from 'next/router'
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'lazysizes'
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

  const onPageChange = (event: object, page: number) => {
    dispatch(pageChange(page))
  }

  const openDialog = (characterInfo, locationIds, episodeIds) => {
    dispatch(openDialogIfNeeded(characterInfo, locationIds, episodeIds))
  }

  function closeDialog() {
    dispatch(closeDialogIfNeeded())
  }

  const { info, locations, episodes } = dialogData || {}
  const characterLocations = buildCharacterLocations(locations)
  const characterEpisodes = buildCharacterEpisodesList(episodes)

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
        info={info}
        locations={characterLocations}
        episodes={characterEpisodes}
        open={isDialogOpen}
        handleClose={closeDialog}
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

// PRIVATE METHODS

function buildCharacterLocations(locations) {
  if (locations && !Array.isArray(locations)) {
    return {
      location: [
        { name: 'id', value: locations.id },
        { name: 'name', value: locations.name },
        { name: 'type', value: locations.type },
        { name: 'dimension', value: locations.dimension },
        { name: 'residents', value: locations.residents?.length },
      ],
    }
  }

  const characterLocation = locations[0]
  const characterOrigin = locations[1]
  return {
    location: [
      { name: 'id', value: characterLocation.id },
      { name: 'name', value: characterLocation.name },
      { name: 'type', value: characterLocation.type },
      { name: 'dimension', value: characterLocation.dimension },
      { name: 'residents', value: characterLocation.residents.length },
    ],
    origin: [
      { name: 'id', value: characterOrigin.id },
      { name: 'name', value: characterOrigin.name },
      { name: 'type', value: characterOrigin.type },
      { name: 'dimension', value: characterOrigin.dimension },
      { name: 'residents', value: characterOrigin.residents.length },
    ],
  }
}

function buildCharacterEpisodesList(episodes) {
  function buildEpisodeItem(item) {
    return {
      id: item.id,
      title: item.name,
      list: [
        { name: 'id', value: item.id },
        { name: 'name', value: item.name },
        { name: 'date', value: item.air_date },
        { name: 'episode code', value: item.episode },
        { name: '#characters', value: item.characters?.length },
      ],
    }
  }

  if (!Array.isArray(episodes)) {
    return [buildEpisodeItem(episodes)]
  }
  return episodes && episodes.map((item) => buildEpisodeItem(item))
}
