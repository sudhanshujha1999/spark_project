import { MemberDetailPage } from "./MemberDetailPage";
import { useCurrentUserInfo } from "../users";
import { useEffect } from "react";

export const ProfilePage = () => {
    const { isLoading, userInfo } = useCurrentUserInfo();

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    return isLoading ? <p>Loading...</p> : <MemberDetailPage currentUserId={userInfo._id} />;
};
