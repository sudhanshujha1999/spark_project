import { Box, Divider, Fade, Grid, IconButton, Typography } from '../ui'
import { DrawingBoard } from './DrawingBoard'
import { AllStageList } from './AllStageList'
import { useStyles } from './styles'
import { useEffect, useMemo, useState } from 'react'
import { mapState } from './recoilState'
import { useRecoilState } from 'recoil'
import { CheckIcon } from '../icons'

export const MatchRoom = ({
  startMatch,
  isCoach = false,
  match,
  hasChanged,
  setHasChanged = () => {},
  toggleSession = () => {},
  maps,
}) => {
  const classes = useStyles()
  const [selectedMap, setSelectedMap] = useState(maps[0] ? maps[0] : {})
  // selectedMapState is the global recoil state
  const [selectedMapState, setSelectedMapState] = useRecoilState(mapState)
  const [mapsUsed, setMapsUsed] = useState({})

  const selectMap = (map) => {
    setSelectedMap(map)
  }

  useEffect(() => {
    setSelectedMapState(selectedMap)
  }, [selectedMap])

  // const memoizedGroupedMaps = useMemo(() => {
  //   // made the maps like that cause in future if we want to add maps db
  //   // then we can enter a new map with the groupid and map details and we will
  //   // modify the data here as we need
  //   let groupedMaps = {}
  //   maps.forEach((map) => {
  //     if (!groupedMaps[`${map.groupId}`]) {
  //       const mapObject = {
  //         id: map.groupId,
  //         name: map.groupName,
  //         maps: [],
  //       }
  //       mapObject.maps.push({
  //         name: map.name,
  //         link: map.link,
  //       })
  //       groupedMaps[`${map.groupId}`] = mapObject
  //     } else {
  //       groupedMaps[`${map.groupId}`].maps.push({
  //         name: map.name,
  //         link: map.link,
  //       })
  //     }
  //   })
  //   return groupedMaps
  // }, [])

  return (
    <Fade in={startMatch}>
      <Grid container>
        <Grid item xs={12}>
          <Box my={3}>
            <Divider />
          </Box>
          <Typography
            className={classes.headingMedium}
            align='center'
            variant='h5'
            gutterBottom
          >
            Map Strategy
          </Typography>
        </Grid>
        {/* MAPS */}
        {/* <Grid item xs={12} sm={6}>
            {Object.values(memoizedGroupedMaps).map(({ name, id }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
        </Grid> */}
        <Grid item xs={12}>
          {match.match.game && (
            <Box display='flex' flexDirection='row' flexWrap='wrap'>
              {maps.map((mapItem) => (
                <Box className={classes.map} onClick={() => selectMap(mapItem)}>
                  <Box
                    className={
                      mapItem.name === selectedMap.name
                        ? `${classes.mapImage} ${classes.activeMap}`
                        : classes.mapImage
                    }
                    style={{
                      position: 'relative',
                      backgroundImage: `url(${mapItem.link})`,
                    }}
                  >
                    {Object.keys(mapsUsed).includes(mapItem.name) && (
                      <CheckIcon className={classes.mapUsedIcon} />
                    )}
                  </Box>
                  <Typography className={classes.subtitle}>
                    {mapItem.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Grid>
        {selectedMap ? (
          <Grid container>
            <Grid item xs={12} md={8}>
              <DrawingBoard
                isCoach={isCoach}
                setHasChanged={
                  isCoach ? setHasChanged : () => console.log('not-a-coach')
                }
                mapLink={selectedMap.link}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <AllStageList
                isCoach={isCoach}
                setHasChanged={
                  isCoach ? setHasChanged : () => console.log('not-a-coach')
                }
                setMapsUsed={setMapsUsed}
              />
            </Grid>
          </Grid>
        ) : (
          <Typography>there are no maps for this game</Typography>
        )}
      </Grid>
    </Fade>
  )
}
