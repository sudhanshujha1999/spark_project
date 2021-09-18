import {
  Avatar,
  Box,
  Badge,
  IconButton,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  CustomSnackbar,
  CircularProgress,
} from '../ui'
import { post } from '../network'
import firebase from 'firebase'
import 'firebase/storage'
import { useEffect, useState } from 'react'
import { SchoolIcon, PhotoCameraIcon, DeleteIcon } from '../icons'
import { useStyles } from './Styles'

const TYPES = ['image/jgp', 'image/jpeg', 'image/png']

export const OrganizationLogo = ({ organization, isCoach }) => {
  const [open, setOpen] = useState(false)
  const [logoUpload, setLogoUpload] = useState(false)
  const [orgLogo, setOrgLogo] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (organization.image_url) {
      setOrgLogo(organization.image_url)
    }
  }, [organization])

  const deleteLogo = async (url) => {
    const path = firebase.storage().refFromURL(url).fullPath
    const imageRef = firebase.storage().ref(path)
    try {
      await imageRef.delete()
      console.log('LOGO DELETED')
    } catch (err) {
      console.log(err, 'Failed')
    }
  }

  const handleUpload = async (e) => {
    console.log('handleUpload')
    const selectedFile = e.target.files[0]
    if (selectedFile.size / 1024 > 1500) {
      setMessage('Please select a image of lower size')
      return
    }
    setLogoUpload(true)
    if (selectedFile && TYPES.includes(selectedFile.type)) {
      try {
        if (orgLogo) {
          await deleteLogo(orgLogo)
        }
        setLogoUpload(true)
        const storageRef = firebase
          .storage()
          .ref(`/organization-logo/${organization._id}+${selectedFile.name}`)
        storageRef.put(selectedFile).on(
          'state_changed',
          (snapshot) => {
            console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          },
          (err) => {
            console.log(err)
          },
          () =>
            storageRef
              .getDownloadURL()
              .then(async (url) => {
                console.log(url)
                const updates = { image_url: url }
                await post(`/api/org/${organization._id}`, { updates }) //need to change this for org
                setOrgLogo(url)
                setLogoUpload(false)
              })
              .catch((error) => {
                setLogoUpload(false)
                console.log(error)
              })
        )
      } catch (error) {
        console.log(error)
      }
    } else {
      setMessage('Image format not supported')
    }
    handleClose()
  }

  const handleRemove = async (e) => {
    if (orgLogo) {
      console.log('handleRemove')
      setLogoUpload(true)
      try {
        await deleteLogo(orgLogo)
        const updates = { image_url: '' }
        await post(`/api/org/${organization._id}`, { updates })
      } catch (error) {
        console.log(error)
      }
      console.log('Deleted')
      setOrgLogo(null)
    }
    setLogoUpload(false)
    console.log('REMOVE')
    handleClose()
  }

  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const actions = [
    {
      icon: (
        <IconButton component='label'>
          <PhotoCameraIcon />
          <input
            type='file'
            hidden
            onChange={(e) => {
              handleUpload(e)
            }}
          />
        </IconButton>
      ),
      name: 'Upload Logo',
      handler: () => {},
    },
    { icon: <DeleteIcon />, name: 'Remove Logo', handler: handleRemove },
  ]

  return (
    <Box style={{ position: 'relative' }}>
      <Badge
        overlap='circular'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
          isCoach && (
            <SpeedDial
              ariaLabel='SpeedDial openIcon example'
              className={classes.speedDial}
              FabProps={{
                color: 'secondary',
                size: 'small',
                className: classes.fab,
                width: '10px',
                height: '10px',
              }}
              direction='up'
              icon={<SpeedDialIcon />}
              hidden={logoUpload}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.handler}
                />
              ))}
            </SpeedDial>
          )
        }
      >
        {logoUpload ? (
          <Box className={classes.savingImage}>
            <CircularProgress color='secondary' />
          </Box>
        ) : orgLogo ? (
          <Avatar className={classes.avatar} src={orgLogo} alt='Profile Pic' />
        ) : (
          <Avatar className={classes.avatar}>
            <SchoolIcon className={classes.icon} />
          </Avatar>
        )}
      </Badge>
      <CustomSnackbar message={message} setMessage={setMessage} type='error' />
    </Box>
  )
}
