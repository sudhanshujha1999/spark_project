import { TextField } from './'
import { makeStyles } from '@material-ui/styles'

export const EditableTextField = ({
  value,
  setValue,
  multi = false,
  align = 'center',
  //    value that define the field is editable or not
  editable = true,
  placeholder = '',
  onPressEnter = () => {},
}) => {
  const classes = useStyles()
  return (
    <TextField
      disabled={!editable}
      value={value}
      multiline={multi}
      rows={multi ? 4 : 1}
      fullWidth
      placeholder={placeholder}
      className={!editable ? classes.textfield : ''}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onPressEnter(e)
          console.log(e.code)
        }
      }}
      onChange={(e) => setValue(e.target.value)}
      inputProps={{
        className: classes.input,
        style: {
          textAlign: align,
        },
      }}
      InputProps={{ disableUnderline: !editable }}
    />
  )
}

const useStyles = makeStyles((theme) => ({
  textfield: {
    pointerEvents: 'none',
  },
  // INPUT WHEN DISABLED
  input: {
    fontSize: 'min(4vw,1.4em)',
    color: 'white',
    lineHeight: '27px',
  },
}))
