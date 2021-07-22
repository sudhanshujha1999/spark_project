import { Box, Tooltip } from "../ui";
import highSkill from "../img/high-skill.svg";
import midSkill from "../img/mid-skill.svg";
import lowSkill from "../img/low-skill.svg";
import { makeStyles } from "@material-ui/core/styles";

const skillIconArray = [
    ...new Array(3).fill(lowSkill),
    ...new Array(4).fill(midSkill),
    ...new Array(3).fill(highSkill),
];
export const SkillsDisplayRow = ({ skillLevel = 0 }) => {
    const classes = useStyles();

    return (
        <Box display='flex' alignItems='cenetr'>
            {/* <Typography>Skill </Typography> */}
            {/* make it later */}
            <Tooltip title={`Team's Skill Level`}>
                <Box mt={1} display='flex'>
                    {skillIconArray.map((src, index) => (
                        <Box mr={1}>
                            <img
                                className={classes.skillIconImage}
                                src={src}
                                alt='skill'
                                style={{
                                    filter:
                                        skillLevel >= index + 1
                                            ? `hue-rotate(${
                                                  230 - index * 25
                                              }deg) drop-shadow(2px 4px 6px black)`
                                            : "grayscale(1) drop-shadow(2px 4px 6px black)",
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Tooltip>
        </Box>
    );
};

const useStyles = makeStyles((theme) => ({
    skillIconImage: {
        height: "25px",
        width: "auto",
    },
}));
