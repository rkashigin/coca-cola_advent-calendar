const host = process.env.REACT_APP_API || '123';
const port = process.env.PORT || 8080;

export default {
    server: {
        host,
        port,
        appId: 'cola-dc',
        serviceHost: `${host}`,
        api: {},
        errors: {}
    },
    routes: {
        HOME: '/'
    },
    references: {
        whereIsGame: {
            easy: {
                image: '',
                coords: {
                    xStart: 570,
                    xEnd: 600,
                    yStart: 1210,
                    yEnd: 1240
                }
            }
        }
    }
};
