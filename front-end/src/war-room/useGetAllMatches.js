import { get } from '../network'
import { useCurrentUser } from '../auth'
import { useRecoilState } from 'recoil'
import { useState, useEffect } from 'react'
import { matchState } from './recoilState'

export const useGetAllMatches = () => {
  const { user } = useCurrentUser()
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useRecoilState(matchState)

  useEffect(() => {
    const getMatches = async () => {
      setIsLoading(true)
      try {
        const { data } = await get('/api/war-room')
        setMatches(data.matches)
        console.log('useGetAllMatches')
      } catch (error) {
        console.log(error.message)
      }
      setIsLoading(false)
    }
    if (user) {
      getMatches()
    }
    // eslint-disable-next-line
  }, [user])

  return { isLoading, matches: matches ? matches : [] }
}
