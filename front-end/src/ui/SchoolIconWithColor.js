import { SchoolIcon } from "../icons";

export const SchoolIconWithColor = ({ ...props }) => {
    return (
        <>
            <svg width={0} height={0}>
                <linearGradient id='linearColors' x1={1} y1={0} x2={1} y2={1}>
                    <stop offset={0} stopColor='rgba(241,184,74,1)' />
                    <stop offset={1} stopColor='rgba(207,113,8,1)' />
                </linearGradient>
            </svg>
            <SchoolIcon sx={{ fill: "url(#linearColors)" }} {...props} />
        </>
    );
};
