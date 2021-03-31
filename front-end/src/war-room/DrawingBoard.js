import { Box, Button } from "../ui";
import { grey } from "@material-ui/core/colors";
import { useRecoilState, useRecoilValue } from "recoil";
import { pathState, newStageState, downloadState, nameState } from "./recoilState";
import { useState, useRef, useEffect } from "react";
import { useStyles, colors } from "./styles";
import bg from "../img/lol-map.png";

export const DrawingBoard = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [paths, setPaths] = useRecoilState(pathState);
    const stageName = useRecoilValue(nameState);
    const [downloadImageTrigger, setDownloadImageTrigger] = useRecoilState(downloadState);
    const [newStage, setNewStage] = useRecoilState(newStageState);
    const [redoPaths, setRedoPaths] = useState([]);
    const [color, setColor] = useState(grey[100]);

    const drawnAfterUndo = useRef(0);
    const canvasRef = useRef(null);
    const backgroundRef = useRef(null);
    const downloadCanvasRef = useRef(null);
    const contextRef = useRef(null);
    const containerRef = useRef(null);
    const pointsRef = useRef([]);
    const classes = useStyles();

    // START DRAWING
    const startDrawing = (e) => {
        if (drawnAfterUndo.current === 1) {
            setRedoPaths([]);
            drawnAfterUndo.current = 0;
        }
        const { nativeEvent } = e;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX * 2, offsetY * 2);
        pointsRef.current.push({ x: offsetX * 2, y: offsetY * 2, color: color });
        setIsDrawing(true);
    };

    // STOP DRAWING
    const stopDrawing = (e) => {
        if (isDrawing) {
            contextRef.current.closePath();
            setPaths([...paths, pointsRef.current]);
            pointsRef.current = [];
            setIsDrawing(false);
            contextRef.current.save();
        }
    };

    // HANDLE DRAW
    const draw = (e) => {
        if (isDrawing) {
            const { nativeEvent } = e;
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.lineTo(offsetX * 2, offsetY * 2);
            pointsRef.current.push({ x: offsetX * 2, y: offsetY * 2, color: color });
            contextRef.current.stroke();
        }
    };

    // HANDLE UNDO FUNCTION
    const handleUndo = () => {
        if (paths.length > 0) {
            drawnAfterUndo.current = 1;
            const lastPath = paths[paths.length - 1];
            setRedoPaths([lastPath, ...redoPaths]);
            const pathsRemoveArray = [...paths];
            const lastPathRemoved = pathsRemoveArray.splice(0, paths.length - 1);
            drawPaths(lastPathRemoved);
            setPaths(lastPathRemoved);
        }
    };

    // HANDLE REDO FUNCTION
    const handleRedo = () => {
        if (redoPaths.length >= 1) {
            const pathAddedArray = [...paths, redoPaths[0]];
            // console.log(redoPaths.splice(1, redoPaths.length));
            setRedoPaths(redoPaths.splice(1, redoPaths.length));
            drawPaths(pathAddedArray);
            setPaths(pathAddedArray);
        }
    };

    // CLEAR ALL
    const handleClear = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        setPaths([]);
        setRedoPaths([]);
    };

    // DRAW PATH FOR HE GIVEN ARRAY
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
        // AT THE END RESET THE COLOR
        contextRef.current.strokeStyle = color;
    };

    // SELECT COLOR
    const setActiveColor = (color) => {
        setColor(color);
        contextRef.current.strokeStyle = color;
    };

    // SET EVERYTHING ONCE THE COMPONENT LOAD
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = containerRef.current.offsetWidth * 4;
        canvas.height = containerRef.current.offsetHeight * 4;
        canvas.style.height = "100%";
        canvas.style.width = "100%";

        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = color;
        context.lineWidth = 5;
        contextRef.current = context;

        const downloadCanvas = downloadCanvasRef.current;
        downloadCanvas.width = containerRef.current.offsetWidth;
        downloadCanvas.height = containerRef.current.offsetHeight;

        const backgroundCanvas = backgroundRef.current;
        backgroundCanvas.width = containerRef.current.offsetWidth;
        backgroundCanvas.height = containerRef.current.offsetHeight;
        const backgroundContext = backgroundCanvas.getContext("2d");
        const background = new Image();
        background.src = bg;
        background.onload = () => {
            // const ratioX = canvas.width / background.naturalWidth;
            // const ratioY = canvas.height / background.naturalHeight;
            // const ratio = Math.min(ratioX, ratioY);
            backgroundContext.drawImage(background, 0, 0);
        };

        // eslint-disable-next-line
    }, []);

    const downloadImage = () => {
        const downloadCanvas = downloadCanvasRef.current;
        const downloadContext = downloadCanvas.getContext("2d");
        downloadCanvas.width = containerRef.current.offsetWidth * 4;
        downloadCanvas.height = containerRef.current.offsetHeight * 4;
        downloadCanvas.style.height = "100%";
        downloadCanvas.style.width = "100%";
        downloadContext.drawImage(
            backgroundRef.current,
            0,
            0,
            backgroundRef.current.width * 4,
            backgroundRef.current.height * 4
        );
        downloadContext.drawImage(canvasRef.current, 0, 0);
        const image = downloadCanvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let a = document.createElement("a");
        a.href = image;
        a.download = `${stageName}.png`;
        a.click();
    };

    useEffect(() => {
        if (newStage) {
            drawPaths(paths);
            setNewStage(false);
        }
        // eslint-disable-next-line
    }, [newStage]);

    useEffect(() => {
        // I HAVE MADE THIS TRIGGER CAUSE IF WE WANTED TO DOWNLOAD THIS WE NEED TO MAKE A GLOBAL CAN AND
        // IT'S ELEMENT NEEDS TO BE GLOBAL TO BE ACCESSIBLE
        // THATS WHY JUST MADE A SMALL FLAG THAT TURN THE DOWNLOAD THIS ON
        if (downloadImageTrigger) {
            downloadImage();
            setDownloadImageTrigger(false);
        }
        // eslint-disable-next-line
    }, [downloadImageTrigger, setDownloadImageTrigger]);

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
                <canvas className={classes.downloadCanvas} ref={downloadCanvasRef} />
            </Box>
            <Box my={3} className={classes.rowContainer}>
                <Button onClick={handleUndo}>Undo</Button>
                <Button onClick={handleClear}>Clear All</Button>
                <Button onClick={handleRedo}>Redo</Button>
            </Box>
        </Box>
    );
};
