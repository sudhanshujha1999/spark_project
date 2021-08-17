import { Users } from "../models";

export const updateDiscordInfo = async ({ discordId, username, discriminator, userId }) => {
    if (!userId) {
        throw new Error("no-user-id");
    }
    const user = await Users.findByIdAndUpdate(
        userId,
        {
            $set: {
                "discord.linked": discordId ? true : false,
                "discord.username": username,
                "discord.discriminator": discriminator,
                "discord.id": discordId,
            },
        },
        { new: true }
    );
    console.log("Updated discord info");
    return user;
};
