import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ScrollableTabs from './ScrollableTabs'
import BadgeAvatar from './BadgeAvatar'

export default function AlertDialog({ data, open, handleClose }) {
  const { info, locations, episodes } = data || {}

  console.log('dialogData: ', data)

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{info.name}</DialogTitle> */}
        <DialogContent>
          <BadgeAvatar image={info.image} altImage={info.name} />
          <h3>{info.name}</h3>
          <ScrollableTabs
            info={info}
            locations={locations}
            episodes={episodes}
          />
          {/* <DialogContentText id="alert-dialog-description">
            Questo è un messaggio di testo
          </DialogContentText> */}
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
