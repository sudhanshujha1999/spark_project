export const addDestination = async (req, res, next) => {
    try {
        const oldDestination = req.cookies["savedDest"];
        const oldEmail = req.cookies["savedEmail"];
        req.email = oldEmail;
        req.dest = oldDestination;
        // saving to new values
        const destination = req.query.dest;
        const email = req.query.email;
        res.cookie("savedEmail", email, { maxAge: 60 * 60 * 5, httpOnly: true });
        res.cookie("savedDest", destination, { maxAge: 60 * 60 * 5, httpOnly: true });
        next();
    } catch (e) {
        console.log(e.message);
        next();
    }
};
