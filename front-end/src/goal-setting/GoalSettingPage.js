import { Box, Grid } from "../ui";
import { useGetPlayerStats } from "./useGetPlayerStats";
import { useEffect, useState } from "react";
import { NormaliseData } from "./NormaliseData";

// RANDOMIZE COLOR LATER

export const GoalSettingPage = () => {
    const { matches, loadingMatches } = useGetPlayerStats("123");
    const [statsForaPlayer, setStatsForaPlayer] = useState(null);
    const [statsToWork, setStatsToWork] = useState([
        "totalDamageDealt",
        "goldEarned",
        "kills",
        "deaths",
        "assists",
    ]);
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        if (matches && !loadingMatches) {
            // GET THE LABEL FOR THE EACH POINT, CURRENTLY THE DATE OF THE MATCH
            let label = [];
            // GET THE PLAYER STATS FIELD FROM THE DETAILS FOR THE CURRENT PLAYER
            let playerStatsToMap = [];
            matches.forEach((match) => {
                // GET THE LABELS
                label.push(`${new Date(match.timestamp).toUTCString()}`);
                // USE CHAMPION TO DISTINGUISH BETWEEN ALL THE PLAYERS
                const champion = match.champion;
                // CAN TAKE CHAMPION AS THE LABEL RATHER THAN DATES
                // label.push(champion);
                const playerMatchStats = match.details.participants.filter(
                    (participant) => participant.championId === champion
                )[0].stats;
                // GET ALL THE PLAYER STATS AND PUSH THEM TO ALL STATS
                playerStatsToMap = [...playerStatsToMap, playerMatchStats];
            });
            // SET THE STATS TO STATE
            setStatsForaPlayer(playerStatsToMap);
            setLabels(label);
        }
    }, [matches, loadingMatches]);

    const getLabelForaStat = (statName) => {
        let label = "";
        // SEPRATE ALL THE LETTERS
        const allLetterArray = statName.split("");
        // LOOP THORUGH ONE LESS THAND LENGTH
        for (let i = 0; i < allLetterArray.length - 1; i++) {
            // IF FIRST LETTER OTHERWISE ADD TO THE LABEL
            if (i === 0) {
                label = label + allLetterArray[i].toUpperCase();
            } else {
                label = label + allLetterArray[i];
            }
            // IF NEXT LETTER IS A CAPITAL AS FOR CAMEL CASE
            if (allLetterArray[i + 1].toUpperCase() === allLetterArray[i + 1]) {
                label = label + " ";
            }
        }
        label = label + allLetterArray[allLetterArray.length - 1];
        return label;
    };

    const getRandomColor = () => {
        return `${360 * Math.random()}, 90%, 65%`;
    };

    useEffect(() => {
        if (statsForaPlayer) {
            // WILL MAKE IT A STATE AND WEHNEVER THIS CHANGES WE CALL THE SET NEW DATA
            const newDataSet = statsToWork.map((statName, index) => {
                const color = getRandomColor();
                let statObject = {
                    label: getLabelForaStat(statName),
                    borderColor: `hsla(${color}, 1)`,
                    backgroundColor: `hsla(${color}, 0.2)`,
                    normalizeValue: {
                        max: 0,
                        min: 10000000000000,
                    },
                    data: [],
                    fill: index === 1,
                };
                statsForaPlayer.forEach((singleMatchStats) => {
                    const value = singleMatchStats[statName];
                    statObject.normalizeValue.max =
                        statObject.normalizeValue.max < value
                            ? value
                            : statObject.normalizeValue.max;
                    statObject.normalizeValue.min =
                        statObject.normalizeValue.min > value
                            ? value
                            : statObject.normalizeValue.min;
                    statObject.data = [...statObject.data, value];
                });
                return statObject;
            });
            setData(newDataSet);
        }
    }, [statsForaPlayer, statsToWork]);

    return (
        <Box>
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <NormaliseData data={data} normalizeData={true} labels={labels} />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <NormaliseData
                        data={data.length > 0 ? [data[0], data[1]] : null}
                        labels={labels}
                    />
                </Grid>
            </Grid>
            {/* <Box
                style={{
                    width: "75vw",
                    height: "75vh",
                    backgroundImage: "url(./goal-setting-mockup.png)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    overflow: "hidden",
                }}
            /> */}
        </Box>
    );
};
