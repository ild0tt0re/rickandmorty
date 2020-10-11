import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import CharacterTabs from './CharacterTabs'
import BadgeAvatar from './BadgeAvatar'
import { createStyles, makeStyles, Theme } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperWidthSm: {
      width: 600,
      height: 800,
    }
    /* '@media screen and (min-width: 600px)': {

    }, */
  })
)

export default function CharacterDialog({ info, locations, episodes, open, handleClose }) {
  const classes = useStyles()

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paperWidthSm: classes.paperWidthSm}}
      >
        <DialogContent>
          <BadgeAvatar image={info.image} altImage={info.name} status={info.status} />
          <h3>{info.name}</h3>
          <CharacterTabs
            info={info}
            locations={locations}
            episodes={episodes}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <style jsx>{`
        img {
          border-radius: 50%;
          margin: auto;
          display: block;
          margin-bottom: 10px;
          width: 100%;
        }
        h3 {
          text-align: center;
          font-size: 36px;
          margin-top: 10px;
          margin-bottom: 20px;
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
