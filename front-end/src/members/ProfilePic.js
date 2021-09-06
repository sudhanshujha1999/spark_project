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
import { useState } from 'react'
import { AccountCircleIcon, PhotoCameraIcon, DeleteIcon } from '../icons'
import { useStyles } from './styles'

const TYPES = ['image/jgp', 'image/jpeg', 'image/png']

export const ProfilePic = ({ user, isCuurentUser }) => {
  const [open, setOpen] = useState(false)
  const [imageUpload, setImageUpload] = useState(false)
  const [profileImage, setProfileImage] = useState(
    user.profile_img ? user.profile_img : null
  )
  const [message, setMessage] = useState('')

  const deletePhoto = async (url) => {
    const path = firebase.storage().refFromURL(url).fullPath
    const imageRef = firebase.storage().ref(path)
    try {
      await imageRef.delete()
      console.log('IMAGE DELETED')
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
    setImageUpload(true)
    if (selectedFile && TYPES.includes(selectedFile.type)) {
      try {
        if (user.url) {
          await deletePhoto(user.url)
        }
        setImageUpload(true)
        const storageRef = firebase
          .storage()
          .ref(`/profile-image/${user._id}+${selectedFile.name}`)
        console.log(storageRef)
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
                const updates = { profile_img: url }
                await post(`/api/users/${user._id}`, { updates })
                setProfileImage(url)
                setImageUpload(false)
              })
              .catch((error) => {
                setImageUpload(false)
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
    if (profileImage) {
      console.log('handleRemove')
      setImageUpload(true)
      try {
        await deletePhoto(profileImage)
        const updates = { profile_img: '' }
        await post(`/api/users/${user._id}`, { updates })
      } catch (error) {
        console.log(error)
      }
      console.log('Deleted')
      setProfileImage(null)
    }
    setImageUpload(false)
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
      name: 'Upload Photo',
      handler: () => {},
    },
    { icon: <DeleteIcon />, name: 'Remove Photo', handler: handleRemove },
  ]

  return (
    <Box>
      <Badge
        overlap='circular'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        badgeContent={
          isCuurentUser && (
            <SpeedDial
              ariaLabel='SpeedDial openIcon example'
              className={classes.speedDial}
              FabProps={{
                color: 'secondary',
                className: classes.fab,
              }}
              direction='right'
              icon={<SpeedDialIcon />}
              hidden={imageUpload}
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
        {imageUpload ? (
          <Box className={classes.savingImage}>
            <CircularProgress color='secondary' />
          </Box>
        ) : profileImage ? (
          <Avatar
            className={classes.avatar}
            src={profileImage}
            alt='Profile Pic'
          />
        ) : (
          <Avatar className={classes.avatar}>
            <AccountCircleIcon className={classes.icon} />
          </Avatar>
        )}
      </Badge>
      <CustomSnackbar message={message} setMessage={setMessage} type='error' />
    </Box>
  )
}
