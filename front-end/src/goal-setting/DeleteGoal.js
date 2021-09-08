import { Modal } from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { del, post } from '../network'
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

export const DeleteGoal = ({ open, setDeleteGoal, goalId }) => {
  const classes = useStyles()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await del(`/api/goals/${goalId}`)
    } catch (error) {
      console.log(error.message)
    }
    // setShowDeleteAlert('Successfully deleted selected match data!')

    handleClose()
    history.push('/goals')
    setIsLoading(false)
  }

  const handleClose = () => {
    setDeleteGoal(false)
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
        disableScrollLock='true'
      >
        <Box className={classes.paper} style={{ height: '250px' }}>
          <Box mb={2}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Delete Goal
            </Typography>
            <Typography
              id='modal-modal-description'
              sx={{ mt: 0.5, opacity: '0.4' }}
            >
              Note: This goal will be permanently deleted, please confirm if you
              still want to delete all of goal data.
            </Typography>
          </Box>

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
              Back
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}
