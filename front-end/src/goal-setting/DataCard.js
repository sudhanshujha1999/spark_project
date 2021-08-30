import { useState } from 'react'
import moment from 'moment'
import CloseIcon from '@material-ui/icons/Close'
import { Grid, Box, Button } from '../ui'
import { useStyles } from './styles'
import { DeleteGoalData } from './DeleteGoalData'

export const DataCard = ({
  data,
  index,
  goalId,
  setShowDeleteAlert,
  canDelete,
  test,
}) => {
  console.log(test)
  const classes = useStyles()
  const [toDelete, setToDelete] = useState(false)
  const dateTime = moment(data.date).format('DD-MM-YYYY HH:mm:ss')

  return (
    <Grid className={classes.dataContainer}>
      <Box style={{ flex: '1', textAlign: 'center' }}>{index}</Box>
      <Box style={{ flex: '3', textAlign: 'center' }}>
        {dateTime.split(' ')[0]}
      </Box>
      <Box style={{ flex: '3', textAlign: 'center' }}>
        {dateTime.split(' ')[1]}
      </Box>
      <Box style={{ flex: '3', textAlign: 'center' }}>{data.value}</Box>
      {canDelete && (
        <Button
          className={classes.dataDeleteButton}
          style={{ flex: '1', textAlign: 'center' }}
          onClick={() => setToDelete(true)}
        >
          <CloseIcon style={{ color: '#e84118' }} />
        </Button>
      )}
      {toDelete && (
        <DeleteGoalData
          open={toDelete}
          setToDelete={setToDelete}
          dataId={data._id}
          goalId={goalId}
          setShowDeleteAlert={setShowDeleteAlert}
        />
      )}
    </Grid>
  )
}
