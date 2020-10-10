import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { create } from 'domain'

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
})

function createData(name: string, location: string, origin: string,) {
  if (origin) {
    return { name, location, origin }
  } 
  return { name, location }
}

export default function CharacterLocationsTable({ locations }) {
  const classes = useStyles()

  let rows = []

  const buildLocationsTable = (locations) => {
    let tempRows = []

    for (let i = 0; i < locations?.location?.length; i++) {
      const name = locations?.location[i]?.name
      const locationValue = locations?.location[i]?.value
      const originValue = locations?.origin && locations?.origin[i]?.value
      tempRows.push(createData(name, locationValue, originValue))
    }

    return tempRows
  }

  rows = [...buildLocationsTable(locations)]

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {locations?.origin && <TableCell align="right">Origin</TableCell>}
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <b>{row.name}:</b>
              </TableCell>
              {locations?.origin && <TableCell align="right">{row.origin}</TableCell>}
              <TableCell align="right">{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
