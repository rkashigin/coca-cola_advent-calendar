import WhereIsGameFirstLevel from '../assets/images/whereIsGame/easy.jpg';

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
                image: WhereIsGameFirstLevel,
                coords: {
                    xStart: 2100,
                    xEnd: 2140,
                    yStart: 960,
                    yEnd: 1080
                }
            }
        }
    }
};
