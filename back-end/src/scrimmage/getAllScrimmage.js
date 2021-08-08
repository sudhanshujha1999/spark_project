import { Scrimmage } from "../models";

export const getAllScrimmage = async () => {
    const activeScrimmages = await Scrimmage.find({ open: true })
        .sort({ createdAt: "desc" })
        .lean();
    return activeScrimmages;
};
