import { Box, Button } from "../ui";
import { useState, useRef, useEffect } from "react";
import { red, blue, purple, yellow, orange, green, grey, brown } from "@material-ui/core/colors";
import { useStyles } from "./styles";
import bg from "../img/lol-map.png";

const colors = [
    {
        name: "White",
        color: grey[100],
    },
    {
        name: "Red",
        color: red[500],
    },
    {
        name: "Blue",
        color: blue[500],
    },
    {
        name: "Yellow",
        color: yellow[500],
    },
    {
        name: "Green",
        color: green[500],
    },
    {
        name: "Orange",
        color: orange[500],
    },
    {
        name: "Purple",
        color: purple[500],
    },
    {
        name: "Brown",
        color: brown[500],
    },
];

export const WarRoom = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [paths, setPaths] = useState([]);
    const [color, setColor] = useState(grey[100]);
    const canvasRef = useRef(null);
    const backgroundRef = useRef(null);
    const contextRef = useRef(null);
    const containerRef = useRef(null);
    const pointsRef = useRef([]);
    const classes = useStyles();

    const startDrawing = (e) => {
        const { nativeEvent } = e;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        pointsRef.current.push({ x: offsetX, y: offsetY, color: color });
        console.log("start");
        setIsDrawing(true);
    };
    const stopDrawing = (e) => {
        if (isDrawing) {
            contextRef.current.closePath();
            setPaths([...paths, pointsRef.current]);
            pointsRef.current = [];
            setIsDrawing(false);
            contextRef.current.save();
        }
    };
    const draw = (e) => {
        if (isDrawing) {
            const { nativeEvent } = e;
            const { offsetX, offsetY } = nativeEvent;
            pointsRef.current.push({ x: offsetX, y: offsetY, color: color });
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    };

    const handleUndo = () => {
        const lastPathRemoved = paths.splice(0, paths.length - 1);
        drawPaths(lastPathRemoved);
        setPaths(lastPathRemoved);
    };

    const handleClear = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setPaths([]);
    };

    const drawPaths = (pathArray) => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        pathArray.forEach((path) => {
            contextRef.current.beginPath();
            contextRef.current.strokeStyle = path[0].color;
            contextRef.current.moveTo(path[0].x, path[0].y);
            path.forEach(({ x, y, color }) => {
                contextRef.current.strokeStyle = color;
                contextRef.current.lineTo(x, y);
            });
            contextRef.current.stroke();
        });
    };

    const setActiveColor = (color) => {
        setColor(color);
        contextRef.current.strokeStyle = color;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = containerRef.current.offsetWidth * 2;
        canvas.height = containerRef.current.offsetHeight * 2;
        canvas.style.height = "100%";
        canvas.style.width = "100%";

        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = 5;
        contextRef.current = context;

        const backgroundCanvas = backgroundRef.current;
        backgroundCanvas.width = containerRef.current.offsetWidth;
        backgroundCanvas.height = containerRef.current.offsetHeight;
        const backgroundContext = backgroundCanvas.getContext("2d");
        const background = new Image();
        background.src = bg;
        background.onload = () => {
            backgroundContext.drawImage(background, 0, 0);
        };

        // eslint-disable-next-line
    }, []);

    return (
        <Box className={classes.drawingComponent}>
            <Box my={2} className={classes.rowContainer}>
                {colors.map((item) => (
                    <Box
                        onClick={() => setActiveColor(item.color)}
                        className={
                            item.color === color
                                ? `${classes.color} ${classes.active}`
                                : classes.color
                        }
                        key={item.name}
                        style={{
                            backgroundColor: item.color,
                        }}
                    />
                ))}
            </Box>
            <Box ref={containerRef} className={classes.canvasContainer}>
                <canvas
                    ref={canvasRef}
                    onMouseLeave={stopDrawing}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseMove={draw}
                />
                <canvas className={classes.backgroundCanvas} ref={backgroundRef} />
            </Box>
            <Box className={classes.rowContainer}>
                <Button onClick={handleUndo}>Undo</Button>
                <Button onClick={handleClear}>Clear All</Button>
            </Box>
        </Box>
    );
};
