import { get } from '../network'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useState, useEffect } from 'react'
import { matchState, pathsState } from './recoilState'
import { useCurrentUserInfo } from '../users'

export const useGetMatch = (matchId) => {
  const { userInfo: user } = useCurrentUserInfo()
  const [isLoading, setIsLoading] = useState(true)
  const [matches, setMatches] = useRecoilState(matchState)
  const [match, setMatch] = useState(null)
  const setPaths = useSetRecoilState(pathsState)

  useEffect(() => {
    // fetch session from db
    const fetchMatchFromDb = async () => {
      const { data } = await get(`/api/${matchId}/war-room`)
      if (matches) {
        setMatches([...matches, data.match])
      } else {
        setMatches([data.match])
      }
      setMatch(data.match)
    }

    // gets the required session;
    const getMatch = async () => {
      setIsLoading(true)
      try {
        // if sessions are present there
        if (matches) {
          const selectedMatch = matches.filter(
            (event) => event.match._id === matchId
          )[0]
          if (selectedMatch) {
            setMatch(selectedMatch)
            // doing this here cause if no match found for the corresponding id then null will be returned
          } else {
            await fetchMatchFromDb()
          }
        } else {
          await fetchMatchFromDb()
        }
      } catch (error) {
        console.log(error.message)
      }
      setIsLoading(false)
    }
    if (!match) {
      if (user) {
        getMatch()
      }
    }
    // eslint-disable-next-line
  }, [matchId])

  useEffect(() => {
    if (match) {
      setPaths(match.match.stages)
    }
  }, [match, setPaths])

  return { match, isLoading, setPaths }
}
