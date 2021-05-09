import { Box, CircularProgress, Grid, Typography } from "../ui";
import { useGetPlayerStats } from "./useGetPlayerStats";
import { useEffect, useState } from "react";
import { KdaCharts } from "./KdaCharts";
import { AddCustomCharts } from "./AddCustomCharts";
import { CustomCharts } from "./CustomCharts";
// RANDOMIZE COLOR LATER

export const GoalSettingPage = () => {
    const { matches, loadingMatches } = useGetPlayerStats("123");
    const [statsForaPlayer, setStatsForaPlayer] = useState(null);
    // NEED TO CHANGE FOR EVERY GAME HAVE TO SEND IT WITH THE DATA FOR THE OTHER THIINGS
    const [statsToWork, setStatsToWork] = useState([
        "physicalDamageDealt",
        "physicalDamageDealtToChampions",
        "physicalDamageTaken",
        "goldEarned",
        "kills",
        "deaths",
        "assists",
        "damageDealtToTurrets",
        "magicDamageDealt",
        "magicDamageDealtToChampions",
        "magicalDamageTaken",
        "trueDamageDealt",
        "trueDamageDealtToChampions",
        "truealDamageTaken",
        "wardsKilled",
        "turretKills",
    ]);
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [customCharts, setCustomCharts] = useState([]);

    useEffect(() => {
        if (matches && !loadingMatches) {
            // GET THE LABEL FOR THE EACH POINT, CURRENTLY THE DATE OF THE MATCH
            let label = [];
            // GET THE PLAYER STATS FIELD FROM THE DETAILS FOR THE CURRENT PLAYER
            let playerStatsToMap = [];
            matches.forEach((match) => {
                // GET THE LABELS
                // label.push(`${new Date(match.timestamp).toUTCString()}`);
                const champion = match.champion;
                label.push(`${champion}`);
                // USE CHAMPION TO DISTINGUISH BETWEEN ALL THE PLAYERS
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
                // FIRST INITIALIZE A BASIC OBJECT FOR A STAT
                let statObject = {
                    label: getLabelForaStat(statName),
                    borderColor: `hsla(${color}, 1)`,
                    backgroundColor: `hsla(${color}, 0.4)`,
                    normalizeValue: {
                        max: 0,
                        min: 10000000000000,
                    },
                    sum: 0,
                    data: [],
                    // HAVE TO MAKE A CONDITON THAT TAKE CARE OF THE FILL IN CHARTS
                    // fill: index === 10,
                    fill: false,
                };
                // CALCULATE THE REQUIRED VALUE FOR THAT STAT
                statsForaPlayer.forEach((singleMatchStats) => {
                    const value = singleMatchStats[statName];
                    statObject.sum = statObject.sum + value;
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
            <Grid container spacing={2}>
                {data.length > 0 ? (
                    <>
                        <Grid xs={12}>
                            <KdaCharts
                                dataToWork={[
                                    data[statsToWork.indexOf("kills")],
                                    data[statsToWork.indexOf("assists")],
                                    data[statsToWork.indexOf("deaths")],
                                ]}
                                labels={labels}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <AddCustomCharts data={data} setCharts={setCustomCharts} />
                        </Grid>
                        <Grid xs={12}>
                            <CustomCharts
                                customCharts={customCharts}
                                labels={labels}
                                setCustomCharts={setCustomCharts}
                            />
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={12}>
                        <CircularProgress color='secondary' style={{ height: "70vh" }} />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};
