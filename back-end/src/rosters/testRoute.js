export const testRoute = {
    method: 'get',
    path: '/test',
    handler: (req, res) => {
        res.send('Hello!');
    },
};