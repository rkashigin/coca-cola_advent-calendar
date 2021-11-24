import PropTypes from 'prop-types';

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
        },
        quizes: {
            day3: {
                title: 'В каком списке деда мороза ты находишься?',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae debitis, ducimus impedit in, itaque maxime molestiae mollitia natus nihil nisi obcaecati quasi rem? Assumenda dolores, et modi nostrum officia tempore.',
                quiz: [
                    {
                        question: 'Идеальный подарок, который Вы ожидаете увидеть?',
                        answers: [
                            {
                                text: 'Кубинская цепь',
                                isCorrect: false
                            },
                            {
                                text: 'Драгзы',
                                isCorrect: false
                            },
                            {
                                text: 'Кодеин',
                                isCorrect: true
                            },
                            {
                                text: "Lil' shawtey",
                                isCorrect: false
                            }
                        ],
                        correctExplanation: 'Ну а кто коденчика не хочет? А? А?',
                        failureExplanation:
                            'Ну ты как так?? А как ты собрался делать Purple Drunk???? Мда.....'
                    }
                ]
            }
        }
    }
};
