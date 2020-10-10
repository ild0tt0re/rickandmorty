import React from 'react'
import Badge from '@material-ui/core/Badge'
import Avatar from '@material-ui/core/Avatar'
import {
  Theme,
  makeStyles,
  withStyles,
  createStyles,
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: 'auto',
    },
    '@media screen and (min-width: 600px)': {
      large: {
        width: theme.spacing(22),
      },
    },
  })
)

const mapStatusColor = {
  'Alive': '#44b700',
  'Dead': 'red',
  'unknown': 'grey',
}

export default function BadgeAvatars({ image, altImage, status }) {
  const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
      badge: {
        backgroundColor: status ? mapStatusColor[status] : 'grey',
        color: status ? mapStatusColor[status] : 'grey',
        height: '18px',
        padding: '0',
        minWidth: '18px',
        borderRadius: '50%',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          animation: '$ripple 1.2s infinite ease-in-out',
          border: '1px solid currentColor',
          content: '""',
        },
      },
      '@keyframes ripple': {
        '0%': {
          transform: 'scale(.8)',
          opacity: 1,
        },
        '100%': {
          transform: 'scale(2.4)',
          opacity: 0,
        },
      },
    })
  )(Badge)


  const classes = useStyles()

  return (
    <div className={classes.root}>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        <Avatar alt={altImage} src={image} className={classes.large} />
      </StyledBadge>
    </div>
  )
}
