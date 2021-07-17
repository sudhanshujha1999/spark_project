import { Scrimmage } from "../models";

export const declineRequest = async (requestId) => {
    const declined = await Scrimmage.updateOne(
        { "requests._id": requestId },
        {
            "requests.$.declined": true,
            "requests.$.accepted": false,
        }
    );
    return declined ? true : false;
};

export const acceptRequest = async (requestId) => {
    const accepted = await Scrimmage.updateOne(
        { "requests._id": requestId },
        {
            "requests.$.declined": false,
            "requests.$.accepted": true,
        }
    );
    return accepted ? true : false;
};

export const viewedRequest = async (requestId) => {
    const viewed = await Scrimmage.updateOne(
        { "requests._id": requestId },
        {
            "requests.$.viewed": true,
        }
    );
    return viewed ? true : false;
};
