import WhereIsGameFirstLevel from '../assets/images/whereIsGame/easy.jpg';
import WhereIsGameSecondLevel from '../assets/images/whereIsGame/hard.jpg';

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
            },
            hard: {
                image: WhereIsGameSecondLevel,
                coords: {
                    xStart: 1575,
                    xEnd: 1590,
                    yStart: 355,
                    yEnd: 370
                }
            }
        },
        quizes: {
            day3: {
                title: 'Дед Мороз — фигура значительная, ведь он олицетворяет собой главный праздник года',
                description: 'Но хорошо ли вы его знаете? Давайте проверим!',
                quiz: [
                    {
                        question: 'Какого прозвища не бывает у Деда Мороза?',
                        answers: [
                            {
                                text: 'Студенец',
                                isCorrect: false
                            },
                            {
                                text: 'Леденец',
                                isCorrect: false
                            },
                            {
                                text: 'Трескунец',
                                isCorrect: false
                            },
                            {
                                text: 'Морозко',
                                isCorrect: true
                            }
                        ],
                        correctExplanation: 'У Деда Мороза прозвище - Морозко'
                    },
                    {
                        question: 'Где в России находится зимняя родина Деда Мороза?',
                        answers: [
                            {
                                text: 'Тверь',
                                isCorrect: false
                            },
                            {
                                text: 'Петрозаводск',
                                isCorrect: false
                            },
                            {
                                text: 'Великий Устюг',
                                isCorrect: true
                            },
                            {
                                text: 'Ростов Великий',
                                isCorrect: false
                            }
                        ],
                        correctExplanation:
                            'В Великом Устюге не так давно расположена зимняя резиденция Деда Мороза и считается его родиной'
                    },
                    {
                        question:
                            'Как зовут любимца Деда Мороза, белого оленя, что живет с ним в Великом Устюге?',
                        answers: [
                            {
                                text: 'Петька',
                                isCorrect: false
                            },
                            {
                                text: 'Лешка',
                                isCorrect: true
                            },
                            {
                                text: 'Ванька',
                                isCorrect: false
                            },
                            {
                                text: 'Сенька',
                                isCorrect: false
                            }
                        ],
                        correctExplanation:
                            'В Великом Устюге живет белый олень Лешка, любимец Деда Мороза'
                    },
                    {
                        question: 'Какого цвета не может быть шуба у Деда Мороза?',
                        answers: [
                            {
                                text: 'Желтая',
                                isCorrect: true
                            },
                            {
                                text: 'Красная',
                                isCorrect: false
                            },
                            {
                                text: 'Серая',
                                isCorrect: false
                            },
                            {
                                text: 'Синяя',
                                isCorrect: false
                            }
                        ],
                        correctExplanation:
                            'Шуба у Деда Мороза может быть красной, серой или синей. Но, может, в будущем он попробует какой-то другой цвет?'
                    },
                    {
                        question: 'Какого святого принято считать прообразом Деда Мороза?',
                        answers: [
                            {
                                text: 'Святой Петр',
                                isCorrect: false
                            },
                            {
                                text: 'Святой Николай',
                                isCorrect: true
                            },
                            {
                                text: 'Святой Павел',
                                isCorrect: false
                            },
                            {
                                text: 'Святой Георгий',
                                isCorrect: false
                            }
                        ],
                        correctExplanation:
                            'Святой Николай стал прообразом современного Деда Мороза'
                    },
                    {
                        question: 'Когда Дед Мороз появляется на праздничной детской ёлке?',
                        answers: [
                            {
                                text: 'Находится там всегда',
                                isCorrect: false
                            },
                            {
                                text: 'В самом начале',
                                isCorrect: false
                            },
                            {
                                text: 'В середине',
                                isCorrect: false
                            },
                            {
                                text: 'В конце',
                                isCorrect: true
                            }
                        ],
                        correctExplanation: 'Правильный ответ'
                    },
                    {
                        question: 'Какой из этих фактов про Деда Мороза — вымысел?',
                        answers: [
                            {
                                text: 'У Деда Мороза есть волшебный посох',
                                isCorrect: false
                            },
                            {
                                text: 'Дед Мороз огромного роста',
                                isCorrect: true
                            },
                            {
                                text: 'Деду Морозу свыше 2000 лет',
                                isCorrect: false
                            },
                            {
                                text: 'У Деда Мороза длинная седая борода',
                                isCorrect: false
                            }
                        ],
                        correctExplanation:
                            'Дед Мороз небольшого роста с длинной бородой и волшебным посохом. И ему свыше 2000 лет'
                    },
                    {
                        question:
                            'Как зовут помощников Деда Мороза, что несут за собой снег и холода?',
                        answers: [
                            {
                                text: 'Ледяники',
                                isCorrect: false
                            },
                            {
                                text: 'Снежинки',
                                isCorrect: false
                            },
                            {
                                text: 'Морозцы',
                                isCorrect: false
                            },
                            {
                                text: 'Трескуны',
                                isCorrect: true
                            }
                        ],
                        correctExplanation: 'Правильный ответ'
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
                    },
                    {
                        question:
                            'В 2001 году Coca-Cola запустила в США уникальную акцию: в лимитированной серии счастливчикам могла выпасть возможность прокатиться на санях с Санта-Клаусом и оленями',
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
                        explanation: 'Но было бы здорово иметь такую возможность, правда?'
                    },
                    {
                        question: 'Coca-Cola выпускала бутылки для слабовидящих со шрифтом Брайля',
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
                            'Это правдивый факт. В 2015 году для участников аргентинской сборной по футболу для незрячих'
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
                    },
                    {
                        question: 'Самое время писать письмо Деду Морозу. С каких слов начнете?',
                        answers: [
                            'Дедушка Мороз, этот год был совершенно удивительным…',
                            'Писать письмо Деду Морозу как-то по-детски, но, знаешь, Дед Мороз, этот год был таким непростым…',
                            'Дед Мороз, не будем тратить твое и мое время. Я хочу это, это и вот это…',
                            'Дедушка Мороз, в этом году я, может, вел себя не идеально, но очень старался…'
                        ]
                    },
                    {
                        question: 'Какой же подарок ты мечтаешь получить от Деда Мороза?',
                        answers: [
                            'Главное, чтобы это был сюрприз',
                            'Здоровья себе и близким',
                            'Новый Год — новый смартфон, но фитнес-браслет тоже пойдет',
                            'Книга — лучший подарок'
                        ]
                    }
                ]
            }
        },
        riddles: {
            day10: {
                title: 'Помните детские утренники, ёлку и загадки от Деда Мороза?',
                description:
                    'Вот мы и решили проверить, справитесь ли вы с ними сейчас. Каждая загадка имеет четыре вариант ответов, но только один правильный. И не все так просто, как может показаться на первый взгляд',
                riddle: [
                    {
                        question:
                            'Вкусные, красивые, миром всем любимые, новогодний атрибут. На столе их очень ждут',
                        answers: [
                            {
                                text: 'Салаты',
                                isCorrect: false
                            },
                            {
                                text: 'Конфеты',
                                isCorrect: false
                            },
                            {
                                text: 'Мандарины',
                                isCorrect: true
                            },
                            {
                                text: 'Бутерброды',
                                isCorrect: false
                            }
                        ],
                        correctExplanation: 'Мандарины'
                    },
                    {
                        question:
                            'Это удивительное волшебство, которое вмиг превращает детей и взрослых в медведей, зайчиков и лисичек',
                        answers: [
                            {
                                text: 'Утренник',
                                isCorrect: false
                            },
                            {
                                text: 'Бал',
                                isCorrect: false
                            },
                            {
                                text: 'Волшебная палочка',
                                isCorrect: false
                            },
                            {
                                text: 'Маскарад',
                                isCorrect: true
                            }
                        ],
                        correctExplanation: 'Маскарад'
                    },
                    {
                        question:
                            'Лежит дед – белее нет. Лежит всю зиму, никто не подымет. Весна придет – сам пропадет',
                        answers: [
                            {
                                text: 'Сугроб',
                                isCorrect: true
                            },
                            {
                                text: 'Газон',
                                isCorrect: false
                            },
                            {
                                text: 'Куст',
                                isCorrect: false
                            },
                            {
                                text: 'Холм',
                                isCorrect: false
                            }
                        ],
                        correctExplanation: 'Сугроб'
                    },
                    {
                        question:
                            'Самый страшный зимний зверь. Его все боятся, ведь он может кусаться',
                        answers: [
                            {
                                text: 'Медведь',
                                isCorrect: false
                            },
                            {
                                text: 'Заяц',
                                isCorrect: false
                            },
                            {
                                text: 'Новый Год',
                                isCorrect: false
                            },
                            {
                                text: 'Мороз',
                                isCorrect: true
                            }
                        ],
                        correctExplanation: 'Мороз'
                    },
                    {
                        question:
                            'Гостья в Новый год пришла: Как лягушка — зелена, Лапы все — в иголках... Кто пришел к нам?',
                        answers: [
                            {
                                text: 'Клумба',
                                isCorrect: false
                            },
                            {
                                text: 'Жаба',
                                isCorrect: false
                            },
                            {
                                text: 'Ёлка',
                                isCorrect: true
                            },
                            {
                                text: 'Игуана',
                                isCorrect: false
                            }
                        ],
                        correctExplanation: 'Ёлка'
                    },
                    {
                        question:
                            'Эта дружная цепочка вокруг елочки бежит. Звонко хлопает в ладошки и от радости визжит',
                        answers: [
                            {
                                text: 'Хоровод',
                                isCorrect: true
                            },
                            {
                                text: 'Гирлянда',
                                isCorrect: false
                            },
                            {
                                text: 'Мишура',
                                isCorrect: false
                            },
                            {
                                text: 'Конфетти',
                                isCorrect: false
                            }
                        ],
                        correctExplanation: 'Хоровод'
                    },
                    {
                        question: 'Кто никогда не спешит, и никогда не опаздывает?',
                        answers: [
                            {
                                text: 'Автобус',
                                isCorrect: false
                            },
                            {
                                text: 'Праздничный ужин',
                                isCorrect: false
                            },
                            {
                                text: 'Новый Год',
                                isCorrect: true
                            },
                            {
                                text: 'Дед Мороз',
                                isCorrect: false
                            }
                        ],
                        correctExplanation: 'Новый Год'
                    },
                    {
                        question: 'Было колесиком, стало ленточкой. Что это за новогодняя игрушка?',
                        answers: [
                            {
                                text: 'Серпантин',
                                isCorrect: true
                            },
                            {
                                text: 'Гирлянда',
                                isCorrect: false
                            },
                            {
                                text: 'Дождик',
                                isCorrect: false
                            },
                            {
                                text: 'Мишура',
                                isCorrect: false
                            }
                        ],
                        correctExplanation: 'Серпантин'
                    }
                ]
            }
        }
    }
};
