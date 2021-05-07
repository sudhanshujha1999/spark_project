import { Box, Typography } from "../ui";

export const OrganizationPicklistPage = ({ organizations, setSelectedOrg }) => {
    const handleSelect = (organization) => {
        setSelectedOrg(organization);
    };

    return (
        <Box>
            {organizations.map((organization) => (
                <Box
                    onClick={() => handleSelect(organization)}
                    style={{
                        padding: 20,
                        borderRadius: 5,
                        margin: 20,
                        backgroundColor: "rgba(150,150,150,0.3)",
                        cursor: "pointer",
                    }}
                    key={organization[0].school.id}>
                    <Typography variant='h3'>{organization[0].school.name}</Typography>
                </Box>
            ))}
        </Box>
    );
};
