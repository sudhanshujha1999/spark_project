import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { post } from '../network'
import { useQueryParams } from '../routing'
import {
  Alert,
  Box,
  Button,
  CenteredContainer,
  CircularProgress,
  Grid,
  Link,
  TextField,
  Typography,
} from '../ui'
import { getValidationErrors, validateLength, validateEmail } from '../util'
import { RoleSelector } from './RoleSelector'

const validations = [
  validateEmail('email'),
  validateLength('password', 7),
  {
    test: ({ password, confirmPassword }) => password === confirmPassword,
    errorMessage: "Passwords don't match",
  },
  // {
  //     test: ({ selectedRole }) => selectedRole,
  //     errorMessage: 'You must select one of the listed roles',
  // }
]

const roleOptions = [
  {
    value: 'coach',
    displayText: "I'm a coach",
  },
  {
    value: 'player',
    displayText: "I'm a player",
  },
]

export const CreateAccountPage = () => {
  const { email: emailFromInvitation, role: roleTypeFromInvitation } =
    useQueryParams()
  const [email, setEmail] = useState(emailFromInvitation || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [networkError, setNetworkError] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  // const [selectedRole, setSelectedRole] = useState(roleOptions.find(role => role.value === roleTypeFromInvitation));
  const [isProcessing, setIsProcessing] = useState(false)
  const history = useHistory()

  const onCreateAccount = async () => {
    setIsProcessing(true)
    const errors = getValidationErrors(
      {
        email,
        password,
        confirmPassword,
        //  selectedRole
      },
      validations
    )
    setValidationErrors(errors)
    if (validationErrors.length > 0) return

    try {
      const data = {
        email,
        // membershipTypeId: selectedRole.value,
        password,
      }
      const response = await post('/api/users', data)
      setIsProcessing(false)
      const { id, isConfirmed } = response.data
      if (isConfirmed) {
        history.push(`/sign-in`)
      } else {
        history.push(`/please-verify-email/${id}`)
      }
    } catch (e) {
      setNetworkError(e.response.data.message)
      setIsProcessing(false)
    }
  }

  return (
    <CenteredContainer>
      <Typography align='center'>
        <h1>Create Account</h1>
      </Typography>
      {networkError && (
        <Box mb={2}>
          <Alert severity='error'>{networkError}</Alert>
        </Box>
      )}
      {validationErrors.map((error) => (
        <Box mb={2}>
          <Alert severity='error'>{error}</Alert>
        </Box>
      ))}
      <Box mb={2}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          label='Email address'
          variant='outlined'
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          label='Password'
          type='password'
          variant='outlined'
        />
      </Box>
      <Box mb={2}>
        <TextField
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          label='Confirm Password'
          type='password'
          variant='outlined'
        />
      </Box>
      {/* {!roleTypeFromInvitation &&
                <Box mb={2}>
                    <Grid container spacing={2}>
                        <RoleSelector
                            onChange={option => setSelectedRole(option)}
                            options={roleOptions}
                            selectedOption={selectedRole}
                        />
                    </Grid>
                </Box>
            } */}
      <Box mb={2}>
        <Button
          onClick={onCreateAccount}
          fullWidth
          variant='contained'
          size='large'
          disabled={isProcessing}
          color='primary'
        >
          {isProcessing ? <CircularProgress /> : 'Create Account'}
        </Button>
      </Box>
      <Typography align='center'>
        <Link to='/sign-in' style={{ textDecoration: 'underline' }}>
          Already have an account? Sign in here
        </Link>
      </Typography>
    </CenteredContainer>
  )
}
