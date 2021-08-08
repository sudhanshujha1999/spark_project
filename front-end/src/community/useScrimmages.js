import { useState, useEffect, useMemo } from "react";
import { allScrimmagesState } from "./recoil";
import { useRecoilState } from "recoil";
import { useOrganizations } from "../teams";
import { get } from "../network";

export const useScrimmages = () => {
    const [allScrimmages, setAllScrimmages] = useRecoilState(allScrimmagesState);
    const { organizations } = useOrganizations();
    // setThisTotrue to update the state
    const [update, setUpdate] = useState(false);
    // loading scrimmages
    const [isLoading, setIsLoading] = useState(true);

    // memoized object that gets the intrested field
    const scrimmageWithIntrestAttribute = useMemo(() => {
        if (organizations._id && allScrimmages) {
            return allScrimmages.map((scrimmage) => {
                if (
                    scrimmage.requests.some(
                        (request) => request.organizationId === organizations._id
                    )
                ) {
                    return {
                        ...scrimmage,
                        intrested: true,
                    };
                } else {
                    return {
                        ...scrimmage,
                        intrested: false,
                    };
                }
            });
        } else if (allScrimmages) {
            return allScrimmages;
        } else {
            return [];
        }
    }, [organizations, allScrimmages]);

    // diffrent types of scrimmages
    const memoizedMyScrimmages = useMemo(() => {
        if (scrimmageWithIntrestAttribute && organizations._id) {
            return scrimmageWithIntrestAttribute.filter(
                (scrimmage) => scrimmage.organizationId === organizations._id
            );
        } else {
            return [];
        }
    }, [scrimmageWithIntrestAttribute, organizations]);

    const memoizedOtherScrimmages = useMemo(() => {
        if (scrimmageWithIntrestAttribute && organizations._id) {
            return scrimmageWithIntrestAttribute.filter(
                (scrimmage) => scrimmage.organizationId !== organizations._id
            );
        } else {
            return [];
        }
    }, [scrimmageWithIntrestAttribute, organizations]);

    // gets all scrimmage first time when the hook is initialized
    useEffect(() => {
        const getAllScrimmages = async () => {
            setIsLoading(true);
            try {
                const {
                    data: { scrimmages },
                } = await get("/api/scrimmage/");
                setAllScrimmages(scrimmages);
            } catch (error) {
                setAllScrimmages([]);
                console.error(error);
            }
            setIsLoading(false);
        };
        if (!allScrimmages) {
            getAllScrimmages();
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line
    }, [allScrimmages, setAllScrimmages]);

    useEffect(() => {
        if (update) {
            const updateScrimmages = async () => {
                try {
                    const {
                        data: { scrimmages },
                    } = await get("/api/scrimmage/");
                    setAllScrimmages(scrimmages);
                } catch (error) {
                    setAllScrimmages([]);
                    console.error(error);
                }
                setUpdate(false);
            };
            updateScrimmages();
        }
        // eslint-disable-next-line
    }, [update]);

    return {
        allScrimmages: scrimmageWithIntrestAttribute,
        isLoading,
        myScrimmages: memoizedMyScrimmages,
        otherScrimmages: memoizedOtherScrimmages,
        setUpdate,
    };
};
