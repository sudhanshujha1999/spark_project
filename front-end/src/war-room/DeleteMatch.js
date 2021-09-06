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

export const DeleteMatch = ({ open, setDeleteMatch, eventId }) => {
  const classes = useStyles()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await del(`/api/events/${eventId}`)
    } catch (error) {
      console.log(error.message)
    }
    // setShowDeleteAlert('Successfully deleted selected match data!')

    handleClose()
    history.push('/war-room')
    setIsLoading(false)
  }

  const handleClose = () => {
    setDeleteMatch(false)
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
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Delete Data
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 0.5, opacity: '0.4' }}
          >
            Note: This match will be permanently deleted, please confirm if you
            still want to delete all of match data.
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
              Back
            </Button>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}
