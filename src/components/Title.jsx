import { useEffect, useState } from 'react'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CircularProgress from '@mui/material/CircularProgress'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import TextField from '@mui/material/TextField'

import { ACTIVITY, DICTIONARY, OUTLINED } from '../shared/constants'

const Title = () => {
  const [activity, setActivity] = useState(null)
  const [isEditionMode, setIsEditionMode] = useState(false)

  useEffect(() => {
    setActivity(window.localStorage.getItem(ACTIVITY) ?? DICTIONARY.ACTIVITY.toLowerCase())
  }, [])

  const editActivity = () => {
    if (activity) {
      window.localStorage.setItem(ACTIVITY, activity)
    } else {
      setActivity(window.localStorage.getItem(ACTIVITY))
    }
    setIsEditionMode(false)
  }

  return (
    <header>
      <h1>
        <span>{DICTIONARY.COUNTER} </span>
        {
          activity !== null
            ? (
              <span>
                {isEditionMode
                  ? (
                    <TextField
                      autoFocus
                      defaultValue={activity}
                      inputProps={{ maxLength: 20 }}
                      InputProps={{
                        endAdornment: (
                          <CheckCircleRoundedIcon color={activity ? 'success' : 'error'} />
                        )
                      }}
                      onBlur={editActivity}
                      onChange={(event) => setActivity(event.target.value)}
                      variant={OUTLINED}
                    />
                    )
                  : activity}
              </span>
              )
            : <CircularProgress />
        }
        {!isEditionMode &&
          <EditRoundedIcon onClick={() => setIsEditionMode(true)} />}
      </h1>
    </header>
  )
}

export default Title
