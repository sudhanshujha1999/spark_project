import { useStyles } from "./styles";
import banner from "../img/default-image.jpg";

export const LandingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <img
                className={classes.img}
                style={{
                    clipPath: "url(#waveey)",
                }}
                src={banner}
                alt="banner-head"
            />
            <svg>
                <defs>
                    <clipPath id="waveey" clipPathUnits="objectBoundingBox">
                        <path d="M0 0.809227L0.0833333 0.75511C0.166667 0.703016 0.333333 0.591747 0.5 0.674187C0.666667 0.753593 0.833333 1.02671 1 0.997878C1.16667 0.971073 1.33333 0.647382 1.5 0.566459C1.66667 0.485536 1.83333 0.647382 1.91667 0.728304L2 0.809227V0H1.91667C1.83333 0 1.66667 0 1.5 0C1.33333 0 1.16667 0 1 0C0.833333 0 0.666667 0 0.5 0C0.333333 0 0.166667 0 0.0833333 0H0V0.809227Z" />
                        {/* <path
                            fill-opacity="1"
                            d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,176C672,171,768,213,864,202.7C960,192,1056,128,1152,122.7C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path> */}
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            from="0 0"
                            to="-1300 0"
                            begin="0s"
                            dur="35s"
                            repeatCount="indefinite"
                        />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};
