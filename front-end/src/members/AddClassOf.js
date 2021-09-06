import { Modal, TextField } from '@material-ui/core'
import { yearsToQuarters } from 'date-fns'
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
  YearPicker,
  AdapterDateFns,
  LocalizationProvider,
} from '../ui'
import { useStyles } from './styles'

export const AddClassOf = ({
  open,
  setAddClassOf,
  userId,
  classOf,
  setClassOf,
  isCoach,
}) => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(classOf ? new Date(`${classOf}`) : '')

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()

  const minDate = new Date(isCoach ? `${currentYear - 10}` : `${currentYear}`)
  const maxDate = new Date(isCoach ? `${currentYear}` : `${currentYear + 6}`)

  console.log(date)

  const handleAdd = async () => {
    setIsLoading(true)
    const updates = { classOf: date.getFullYear() }

    try {
      await post(`/api/users/${userId}`, { updates })
    } catch (error) {
      console.log(error.message)
    }
    setClassOf(date.getFullYear())
    setIsLoading(false)
    handleClose()
  }

  const handleClose = () => {
    setAddClassOf(false)
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
        <Box className={classes.twitchPaper} style={{ height: 'auto' }}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add {isCoach ? 'Coach since' : 'Class of'}
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ margin: '5px 0 10px 0', opacity: '0.4' }}
          >
            Note: Other can people can see this detail in your profile.
          </Typography>

          <Grid mb={1}>
            <Box
              className={classes.multiLineTextField}
              style={{ maxHeight: '150px', overflowY: 'scroll' }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <YearPicker
                  date={date}
                  isDateDisabled={() => false}
                  minDate={minDate}
                  maxDate={maxDate}
                  onChange={(newDate) => setDate(newDate)}
                />
              </LocalizationProvider>
              {/* <TextField
                value={link}
                onChange={(e) => setLink(e.target.value)}
                fullWidth
                label='Link'
                variant='outlined'
              /> */}
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
