import { get } from '../network'
import { useCurrentUser } from '../auth'
import { useRecoilState } from 'recoil'
import { useState, useEffect } from 'react'
import { sessionState } from './recoilState'

export const useGetAllSessions = () => {
  const { user } = useCurrentUser()
  const [isLoading, setIsLoading] = useState(true)
  const [sessions, setSessions] = useRecoilState(sessionState)
  useEffect(() => {
    const getSessions = async () => {
      setIsLoading(true)
      try {
        const { data } = await get('/api/war-room')
        setSessions(data.sessions)
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
      setIsLoading(false)
    }
    if (user) {
      getSessions()
    }
    // eslint-disable-next-line
  }, [user])

  return { isLoading, sessions: sessions ? sessions : [] }
}
