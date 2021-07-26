import { get } from "../network";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { sessionState, pathsState } from "./recoilState";
import { useCurrentUserInfo } from "../users";

export const useGetSession = (sessionId) => {
    const { userInfo: user } = useCurrentUserInfo();
    const [isLoading, setIsLoading] = useState(true);
    const [sessions, setSessions] = useRecoilState(sessionState);
    const [session, setSession] = useState(null);
    const setPaths = useSetRecoilState(pathsState);

    useEffect(() => {
        // fetch session from db
        const fetchSessionFromDb = async () => {
            const { data } = await get(`/api/${sessionId}/war-room`);
            if (sessions) {
                setSessions([...sessions, data.session]);
            } else {
                setSessions([data.session]);
            }
            setSession(data.session);
        };

        // gets the required session;
        const getSession = async () => {
            setIsLoading(true);
            try {
                // if sessions are present there
                if (sessions) {
                    const selectedSession = sessions.filter(
                        (event) => event.session._id === sessionId
                    )[0];
                    if (selectedSession) {
                        setSession(selectedSession);
                        // doing this here cause if no session found for the corresponding id then null will be returned
                    } else {
                        await fetchSessionFromDb();
                    }
                } else {
                    await fetchSessionFromDb();
                }
            } catch (error) {
                console.log(error.message);
            }
            setIsLoading(false);
        };
        if (!session) {
            if (user) {
                getSession();
            }
        }
        // eslint-disable-next-line
    }, [sessionId]);

    useEffect(() => {
        if (session) {
            setPaths(session.session.stages);
        }
    }, [session, setPaths]);

    return { session, isLoading, setPaths };
};
