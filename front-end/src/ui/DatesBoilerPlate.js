import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";

export const DatesBoilerPlate = ({ children }) => {
    return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
};
