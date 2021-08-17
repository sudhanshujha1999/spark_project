import {
  Box,
  Button,
  TextField,
  Backdrop,
  Fade,
  Grid,
  Typography,
  LocalizationProvider,
  AdapterDateFns,
  CircularProgress,
} from '../ui'
import DatePicker from '@material-ui/lab/DatePicker'
import Modal from '@material-ui/core/Modal'
import { useState } from 'react'
import { useStyles } from './styles'
import { useSetRecoilState } from 'recoil'
import { goalState } from './recoilState'
import { post } from '../network'

export const AddGoalData = ({
  open,
  handleClose,
  metric,
  goalId,
  goalData,
}) => {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [date, setDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const setGoal = useSetRecoilState(goalState)

  const addData = async () => {
    setIsLoading(true)
    const data = [...goalData, { date, value }]
    let updatedGoal = {}
    try {
      updatedGoal = await post(`/api/goal/add/${goalId}`, data)
    } catch (error) {
      console.log(error.message)
    }
    setGoal(updatedGoal.data)
    handleClose()
    setIsLoading(false)
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
        <Box className={classes.paper}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Data
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 0.5, opacity: '0.4' }}
          >
            Note: This data will be reflected on goal stats, please make sure it
            is correct.
          </Typography>
          <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
            style={{ minHeight: '20vh', marginTop: 20 }}
          >
            <Grid item xs={6}>
              <Box style={{ minWidth: '200px' }}>
                <Box mb={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label='Date'
                      value={date}
                      required
                      onChange={(newValue) => {
                        setDate(newValue)
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
                <Box
                  mb={2}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    fullWidth
                    label={metric}
                    type='number'
                    min='0'
                    variant='outlined'
                    required
                  />
                </Box>
                <Box mb={2}>
                  <Button variant='contained' color='primary' onClick={addData}>
                    {isLoading ? <CircularProgress color='secondary' /> : 'Add'}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  )
}
