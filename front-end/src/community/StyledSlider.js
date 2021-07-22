import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const CustomSlider = withStyles({
    root: {
        color: "#895cf2",
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        marginTop: -8,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 8,
    },
    rail: {
        height: 8,
    },
})(Slider);
const marks = [
    {
        value: 1,
        label: 1,
    },
    {
        value: 10,
        label: 10,
    },
];
export const StyledSlider = ({ value, setValue = () => {} }) => {
    const handleValueChanged = (e, newValue) => {
        setValue(newValue);
    };
    return (
        <CustomSlider
            onChangeCommitted={handleValueChanged}
            defaultValue={5}
            aria-labelledby='discrete-slider-custom'
            step={1}
            valueLabelDisplay='auto'
            marks={marks}
            min={1}
            max={10}
        />
    );
};
