import { getGroupsFor } from './getGroupsFor';

/*
    This function will return an array containing
    all the "ancestor" groups of a given group - 
    that is, all the groups that a group belongs to,
    and all the groups that THOSE groups belong to,
    and so on.
*/
export const getAllAncestorGroups = async groupId => {
    const parentGroups = await getGroupsFor(groupId);
    if (parentGroups.length === 0) return [];
    return [
        ...parentGroups,
        await Promise.all(
            parentGroups.map(parentGroup =>
                getAllAncestorGroups(parentGroup)
            )
        ),
    ];
}
