import { useRef, useEffect, useState, useMemo } from "react";

export const useBracketArmsLength = () => {
    const containerRef = useRef(null);
    const [height, setHeight] = useState("100%");

    useEffect(() => {
        const observer = new ResizeObserver(([entity]) => {
            if (entity?.target?.clientHeight) {
                setHeight(entity.target.clientHeight);
            }
        });
        if (containerRef.current) {
            observer.observe(containerRef.current);
            setHeight(containerRef.current.clientHeight);
        }
        return () => {
            if (containerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(containerRef.current);
            }
        };
    }, [containerRef]);

    const armHeight = useMemo(() => {
        let newArmHeight = height;
        if (height !== "100%") {
            return `${
                height === "100%" ? "100%" : `calc(${height - height / 2}px - 50%)`
            } !important`;
        }
        return newArmHeight;
    }, [height]);

    return { containerRef, armHeight, containerHeight: height };
};
