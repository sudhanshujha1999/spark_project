import { Modal, TextField } from '@material-ui/core'
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
import { useStyles } from './styles'

export const AddTwitch = ({
  open,
  setAddTwitch,
  userId,
  twitchLink,
  setTwitchLink,
}) => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [link, setLink] = useState(twitchLink)

  const handleAdd = async () => {
    setIsLoading(true)
    const updates = { twitch: link }

    try {
      await post(`/api/users/${userId}`, { updates })
    } catch (error) {
      console.log(error.message)
    }
    setTwitchLink(link)
    setIsLoading(false)
    handleClose()
  }

  const handleClose = () => {
    setAddTwitch(false)
  }
  return (
    <Box className={classes.twitchModal}>
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
        disableScrollLock={true}
      >
        <Box className={classes.twitchPaper} style={{ height: '250px' }}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Twitch Link
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ margin: '5px 0 10px 0', opacity: '0.4' }}
          >
            Note: Other can people can see this link in your profile.
          </Typography>

          <Grid mb={3}>
            <Box>
              <TextField
                value={link}
                onChange={(e) => setLink(e.target.value)}
                fullWidth
                label='Link'
                variant='outlined'
              />
            </Box>
            <Box
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
                  color: '#5A3E85',
                  border: '2px solid #5A3E85',
                }}
                onClick={handleAdd}
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
            </Box>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}
