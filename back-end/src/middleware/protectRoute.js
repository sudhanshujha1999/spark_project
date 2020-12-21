import * as admin from 'firebase-admin';

export const protectRoute = (routeProtectors = []) => async (req, res, next) => {
    const failingProtectors = (await Promise.all(
        routeProtectors.map(protector => {
            if (!protector.test(req)) {
                return protector;
            }

            return null;
        })
    )).filter(x => x);

    if (failingProtectors.length === 0) {
        return next();
    }

    const { errorCode, errorMessage } = failingProtectors[0];

    return res.status(errorCode).json({ message: errorMessage });
};