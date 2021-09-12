import { Box, Tabs, Tab, Typography, BackButton } from '../ui'
import { usePosts } from './usePosts'
import { useState } from 'react'
import { Scrimmages } from './Scrimmages'
import { AllPosts } from './AllPosts'
import { useIsCoach } from '../users/useIsCoach'
import { useOrganizations } from '../teams'
import { useHistory } from 'react-router-dom'

const tabLabel = ['Home', 'Scrimmages']

export const CommunityPage = () => {
  const history = useHistory()
  const { posts, isLoading, updateScrimmages } = usePosts()
  const { organizations } = useOrganizations()
  const { isCoach } = useIsCoach(organizations._id)

  const onUpdateScrimmage = () => {
    updateScrimmages(true)
  }

  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const TABS = [
    <AllPosts
      isCoach={isCoach}
      posts={posts}
      isLoading={isLoading}
      updateScrimmages={onUpdateScrimmage}
    />,
    <Scrimmages isCoach={isCoach} disabled={true} />,
  ]
  return (
    <Box>
      <BackButton goBack={history.goBack} />
      <Box>
        <Tabs
          textColor='secondary'
          indicatorColor='secondary'
          value={value}
          onChange={handleChange}
        >
          {tabLabel.map((item) => (
            <Tab label={item} />
          ))}
        </Tabs>
      </Box>
      {TABS[value]}
    </Box>
  )
}
