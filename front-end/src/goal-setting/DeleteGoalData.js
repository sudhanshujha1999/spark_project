import { Modal } from '@material-ui/core'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { post } from '../network'
import {
  Box,
  Backdrop,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from '../ui'
import { goalState } from './recoilState'
import { useStyles } from './styles'

export const DeleteGoalData = ({
  open,
  setToDelete,
  dataId,
  goalId,
  setShowDeleteAlert,
}) => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const setGoal = useSetRecoilState(goalState)

  const handleDelete = async () => {
    setIsLoading(true)
    let updatedGoal = {}
    try {
      updatedGoal = await post(`/api/goal/delete/${goalId}`, { dataId })
    } catch (error) {
      console.log(error.message)
    }
    setGoal(updatedGoal.data)
    setShowDeleteAlert('Successfully deleted selected goal data!')
    handleClose()
    setIsLoading(false)
  }

  const handleClose = () => {
    setToDelete(false)
  }
  return (
    <Box className={classes.modal}>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={classes.paper} style={{ height: '250px' }}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Delete Data
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 0.5, opacity: '0.4' }}
          >
            Note: This data will be permanently deleted, please confirm if you
            still want to delete the data.
          </Typography>

          <Grid
            container
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              style={{
                margin: '20px 30px',
                color: '#c23616',
                border: '2px solid #c23616',
              }}
              onClick={handleDelete}
            >
              {isLoading ? <CircularProgress color='secondary' /> : 'Confirm'}
            </Button>
            <Button
              style={{
                margin: '20px 30px',
                color: '#F8EFBA',
                border: '2px solid #F8EFBA',
              }}
              onClick={handleClose}
            >
              No
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}
