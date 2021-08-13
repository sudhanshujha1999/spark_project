import { useState, useEffect } from "react";
import { UsaStates } from 'usa-states';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "../ui";
import { post } from "../network";
import { useStyles } from "./Styles";
import { useHistory } from "react-router-dom";
import { addOrganizationToUser } from "../users/userState";
import { useCurrentUserInfo } from "../users";
import { useSetRecoilState } from "recoil";

const usaStates = new UsaStates();

const validations = [
    {
        test: ({ orgName }) => orgName.length > 1,
        errorMessage: "School name must be 2 characters or longer",
    },
    {
        test: ({ orgType }) => orgType !== "",
        errorMessage: "Please select a organization type",
    },
    {
        test: ({ location }) => location !== null,
        errorMessage: "Please select a loaction",
    },
];

export const CreateOrganizationPage = () => {
    const { isLoading, userInfo } = useCurrentUserInfo();
    const history = useHistory();
    const addOrganization = useSetRecoilState(addOrganizationToUser);
    const [canCreateOrganization, setCanCreateOrganization] = useState(false);
    const [orgName, setOrgName] = useState("");
    const [orgType, setOrgType] = useState("");
	const [city, setCity] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [selectedState, setSelectedState] = useState(""); // As in "USA State", NOT "React state"
    const [isUpdating, setIsUpdating] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [networkError, setNetworkError] = useState("");

    const classes = useStyles();

    const getValidationErrors = () => {
        const fields = { orgName, orgType, city, selectedState, zipCode };
        const errors = validations
            .filter((validation) => !validation.test(fields))
            .map((validation) => validation.errorMessage);
        return errors;
    };

    const onFinish = async () => {
        const validationErrors = getValidationErrors();
        setValidationErrors(validationErrors);
        if (validationErrors.length > 0) return;

        setIsUpdating(true);
        try {
            const schoolInfo = { orgName, orgType, city, state: selectedState, zipCode };
            const { data } = await post(`/api/organization`, schoolInfo);
            // Need to update the user after the org is created
            addOrganization(data.groupId);
            history.push(`/new-team/${data.groupId}?n1x=xj67bdsne12sxmlse`);
        } catch (e) {
            console.log(e);
            setIsUpdating(false);
            setNetworkError(e.message);
        }
        setIsUpdating(false);
    };

    useEffect(() => {
        setCanCreateOrganization(!userInfo.organizations.length > 0);
        // eslint-disable-next-line
    }, []);

    return (
        <Container maxWidth='lg'>
            {isLoading ? (
                <Box className={classes.loadScreenFull}>
                    <CircularProgress size='4em' />
                </Box>
            ) : canCreateOrganization ? (
                <>
                    <h1>Add Organization Info</h1>
                    <Typography
                        variant='h6'
                        style={{
                            marginBottom: 20,
                        }}>
							Your "organization" is the institution you belong to. This should be the official name of your school if you are a school
                    </Typography>
                    <Box mb={2}>
                        {networkError && <Alert severity='error'>{networkError}</Alert>}
                    </Box>
                    {validationErrors.map((error) => (
                        <Box mb={2}>
                            <Alert severity='error'>{error}</Alert>
                        </Box>
                    ))}
                    <Box mb={2}>
                        <TextField
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            fullWidth
                            label='Organization Name (i.e. "Springfield High School")'
                            variant='outlined'
                        />
                        <Box my={2} />
                        <FormControl variant='outlined' fullWidth>
                            <InputLabel
                                id='-select-filled-label'
                                style={{
                                    padding: "2px 5px",
                                    backgroundColor: "#222831",
                                }}>
                                Organization Type
                            </InputLabel>
                            <Select
                                disableUnderline
                                MenuProps={{ disableScrollLock: true }}
                                labelId='select-filled-label'
                                value={orgType}
                                onChange={(e) => setOrgType(e.target.value)}>
                                <MenuItem value=''>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"  SCHOOL"}>High School</MenuItem>
                                <MenuItem value={"UNIVERSITY"}>University</MenuItem>
                                <MenuItem value={"PRO"}>Pro Organization</MenuItem>
                                <MenuItem value={"SEMI_PRO"}>
                                    Semi-Pro / Amateur Organization
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
					<Box mb={2}>
                        <TextField
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            fullWidth
                            label='City'
                            variant='outlined'
                        />
					</Box>
					<Box mb={2}>
						<FormControl variant='outlined' fullWidth>
                            <InputLabel
                                id='-select-filled-label'
                                style={{
                                    padding: "2px 5px",
                                    backgroundColor: "#222831",
                                }}>
                                State
                            </InputLabel>
                            <Select
                                disableUnderline
                                MenuProps={{ disableScrollLock: true }}
                                labelId='select-filled-label'
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}>
								{usaStates.states.map(usaState => (
									<MenuItem key={usaState.name} value={usaState.name}>
										{usaState.name}
									</MenuItem>
								))}
                            </Select>
                        </FormControl>
					</Box>
					<Box mb={2}>
                        <TextField
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            fullWidth
                            label='Organization Zip/Postal Code'
                            variant='outlined'
                        />
					</Box>
                    <Divider />
                    <Box py={2}>
                        <Grid container justifyContent='space-between'>
                            <Grid item>
                                <Button
                                    color='primary'
                                    variant='contained'
                                    disabled={isUpdating}
                                    onClick={onFinish}>
                                    {isUpdating ? <CircularProgress size={24} /> : "Finish"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            ) : (
                <Box className={classes.loadScreenFull}>
                    <Typography variant='h3' align='center'>
                        You cannot create more organizations
                    </Typography>
                </Box>
            )}
        </Container>
    );
};
