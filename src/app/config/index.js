import WhereIsGameFirstLevel from '../assets/images/whereIsGame/easy.svg';

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
                    },
                    {
                        question: 'Быть дауном или не быть дауном?',
                        answers: [
                            {
                                text: 'Лучше не быть дауном',
                                isCorrect: true
                            },
                            {
                                text: 'ДАДАЯ',
                                isCorrect: false
                            },
                            {
                                text: 'А ШО?',
                                isCorrect: false
                            }
                        ],
                        correctExplanation: 'Ну не хочу я(((',
                        failureExplanation: 'Ты дурак?....'
                    },
                    {
                        question:
                            'Кто быстрее, негр драг диллер или школьник, который хочет в туалет?',
                        answers: [
                            {
                                text: 'Первый',
                                isCorrect: false
                            },
                            {
                                text: 'Второй',
                                isCorrect: false
                            },
                            {
                                text: 'Скорость распространения короны',
                                isCorrect: true
                            },
                            {
                                text: 'Я быстрее всех',
                                isCorrect: false
                            }
                        ],
                        correctExplanation: 'Ну тут даже думать не надо',
                        failureExplanation: 'Кек'
                    }
                ]
            }
        },
        truthOrMyths: {
            day5: {
                title: 'Coca-Cola пробовали все!',
                description:
                    'Это напиток ассоциируется с новогодними праздниками у людей по всему миру. Но много ли вы знаете об истории этого напитка? Сейчас узнаем!',
                quiz: [
                    {
                        question:
                            'В Америке в 1971 году Coca-Cola запустила легендарный новогодний ролик с песней, позднее ставшей хитом, и масштабнейшими для тех лет съемками. Эта рекламная кампания была запущена под лозунгом “Великий безалкогольный напиток нации”',
                        answers: [
                            {
                                text: 'Правда',
                                isCorrect: false
                            },
                            {
                                text: 'Миф',
                                isCorrect: true
                            }
                        ],
                        explanation:
                            'Этот слоган мог бы появиться во времена “сухого закона”, но уже в 1906 году американское правительство и крупные компании пытались отучить людей от алкоголя. А вот в 1971 году был прекрасный лозунг “Купи миру колу”'
                    },
                    {
                        question:
                            'В 2015 году в Австралии в продаже появилась бутылка Coca-Cola, меняющая цвет',
                        answers: [
                            {
                                text: 'Правда',
                                isCorrect: true
                            },
                            {
                                text: 'Миф',
                                isCorrect: false
                            }
                        ],
                        explanation:
                            'Это правда. Чем сильнее бутылка с напитком охлаждалась, тем сильнее менялся цвет этикетки и всей бутылки. Секрет прост — термохромные чернила'
                    },
                    {
                        question:
                            'Однажды Coca-Cola выпустила бутылки со встроенным динамиком и микрофоном в крышечке в честь новогодних праздников',
                        answers: [
                            {
                                text: 'Правда',
                                isCorrect: true
                            },
                            {
                                text: 'Миф',
                                isCorrect: false
                            }
                        ],
                        explanation:
                            'Это правдивый факт. В 2016 году была выпущена лимитированная серия. При открывании бутылки запись воспроизводилась и поздравляла людей с праздниками'
                    }
                ]
            }
        },
        surveys: {
            day8: {
                title: 'Дед Мороз уже заканчивает составлять списки подарков!',
                description: 'Поэтому самое время выяснить, в какой же список вы попадете.',
                survey: [
                    {
                        question: 'Новый Год. Полночь. Что нужно успеть сделать под бой курантов?',
                        answers: [
                            'Написать на бумажке заветное желание и съесть его',
                            'Обнять близких',
                            'Разлить напитки по бокалам',
                            'Загадать двенадцать желаний на каждый бой часов'
                        ]
                    },
                    {
                        question: 'В каком виде нужно дарить подарки?',
                        answers: [
                            'Для каждого подарка - особенное оформление',
                            'В подарочных пакетах',
                            'Как есть, упаковка - это лишнее',
                            'В красивой оберточной бумаге и с цветастыми бантами'
                        ]
                    },
                    {
                        question: 'Какое оформление ёлки у вас будет в этом году?',
                        answers: [
                            'Достану все-все игрушки и мишуру, какие найду дома',
                            'Выдержанная цветовая гамма, симметрия и изысканные украшения',
                            'И без ёлки хорошо',
                            'Игрушки своими руками, фотографии близких, сверкающие животные и птицы'
                        ]
                    }
                ]
            }
        }
    }
};
