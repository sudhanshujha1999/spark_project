import { StatsInformation } from "../models";

export const getStatFormById = async (formId) => {
    const statsForm = await StatsInformation.findById(formId);
    return statsForm;
};
