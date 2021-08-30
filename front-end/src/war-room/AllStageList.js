import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  CustomSnackbar,
  Box,
  IconButton,
} from '../ui'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import {
  pathsState,
  nameState,
  pathState,
  mapState,
  addNewPathToState,
  newStageState,
  editStageState,
  deleteStageState,
  stageDescriptionState,
  setDownload,
  clearInputState,
} from './recoilState'
import { useStyles } from './styles'
import { useEffect, useMemo, useState } from 'react'
import { EditIcon } from '../icons'

export const AllStageList = ({ isCoach, setHasChanged, setMapsUsed }) => {
  const allStages = useRecoilValue(pathsState)
  const map = useRecoilValue(mapState)
  const setDownloadTrue = useSetRecoilState(setDownload)
  const classes = useStyles()
  const [path, setPath] = useRecoilState(pathState)
  const [stageName, setStageName] = useRecoilState(nameState)
  const [newStage, setNewStage] = useRecoilState(newStageState)
  const [description, setDescription] = useRecoilState(stageDescriptionState)
  const addPath = useSetRecoilState(addNewPathToState)
  const editPath = useSetRecoilState(editStageState)
  const clearInput = useSetRecoilState(clearInputState)
  const deleteStage = useSetRecoilState(deleteStageState)
  const [active, setActive] = useState(null)
  const [message, setMessage] = useState('')
  const [toEdit, setToEdit] = useState(false)

  const handleClick = () => {
    if (stageName !== '') {
      addPath()
      setHasChanged(true)
      setNewStage(true)
    } else {
      setMessage('Please Enter a Name')
    }
  }

  const setStage = (stage, index) => {
    setMessage('')
    console.log(stage)
    if (active === null || !isCoach) {
      setPath(stage.path)
      setStageName(stage.name)
      setDescription(stage.description)
      setActive(index)
      setNewStage(true)
    } else {
      setMessage('Please save first')
    }
  }

  const handleSave = () => {
    editPath(active)
    setNewStage(true)
    setToEdit(false)
    setActive(null)
  }
  const handleBack = () => {
    clearInput()
    setNewStage(true)
    setActive(null)
  }

  const handleDelete = () => {
    deleteStage(active)
    setNewStage(true)
    setToEdit(false)
    setActive(null)
    setHasChanged(true)
  }

  const handleDownload = () => {
    setDownloadTrue()
  }

  const memoizedMapsUsed = useMemo(() => {
    let mapsUsedObject = {} // a local variable just for support
    allStages.map((stage) => {
      if (Object.keys(mapsUsedObject).includes(stage.mapName)) {
        mapsUsedObject[`${stage.mapName}`]++
      } else {
        mapsUsedObject[`${stage.mapName}`] = 1
      }
    })
    setMapsUsed(mapsUsedObject)
    return mapsUsedObject
  }, [allStages])

  return (
    <Grid container className={classes.stagesContainer}>
      <Grid item xs={12}>
        {allStages.map((item, index) => {
          if (index === active) {
            return (
              <Box key={index}>
                <TextField
                  label='Title'
                  className={classes.listItem}
                  value={stageName}
                  fullWidth
                  disabled={!isCoach || !toEdit}
                  onChange={(e) => setStageName(e.target.value)}
                  variant='outlined'
                />
                <TextField
                  label='Notes'
                  className={classes.listItem}
                  value={description}
                  fullWidth
                  multiline
                  onChange={(e) => setDescription(e.target.value)}
                  variant='outlined'
                  disabled={!isCoach || !toEdit}
                />
                {isCoach && toEdit ? (
                  <Grid item xs={12} mb={2}>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Box mr={2}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={handleSave}
                        >
                          Save Step
                        </Button>
                      </Box>
                      <Box mr={2}>
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={handleDownload}
                        >
                          Download
                        </Button>
                      </Box>
                      <Box mr={2}>
                        <Button
                          className={classes.deleteBtn}
                          variant='contained'
                          color='primary'
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={12} mb={2}>
                    <Box display='flex' flexDirection='row' alignItems='center'>
                      <Box mr={2}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={handleBack}
                        >
                          GO BACK
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Box>
            )
          } else {
            if (item.mapLink === map.link) {
              return (
                <Grid item xs={12}>
                  <Box key={index} className={classes.stageNameContainer}>
                    <Typography className={classes.indexNumber}>
                      {index + 1}
                    </Typography>
                    <Typography
                      className={`${classes.stageTitle} ${classes.listItem}`}
                      onClick={() => setStage(item.data, index)}
                    >
                      {item.data.name}
                      <IconButton
                        className={classes.editButton}
                        onClick={() => {
                          setStage(item.data, index)
                          setToEdit(true)
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Typography>
                    {/* <IconButton
                        className={classes.actionButton}
                        onClick={onclickDelete}
                      >
                        <DeleteIcon />
                      </IconButton> */}
                  </Box>
                  <Divider />
                  <Box my={2} />
                </Grid>
              )
            }
          }
        })}
      </Grid>
      {active === null && isCoach && (
        <>
          <Grid item xs={12}>
            <TextField
              label='Title'
              className={classes.listItem}
              value={stageName}
              fullWidth
              onChange={(e) => setStageName(e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Notes'
              className={classes.listItem}
              value={description}
              fullWidth
              multiline
              onChange={(e) => setDescription(e.target.value)}
              variant='outlined'
            />
          </Grid>
          <Grid item xs={12}>
            <Button color='primary' onClick={handleClick} variant='contained'>
              Add
            </Button>
          </Grid>
        </>
      )}
      <CustomSnackbar message={message} setMessage={setMessage} type='error' />
    </Grid>
  )
}
