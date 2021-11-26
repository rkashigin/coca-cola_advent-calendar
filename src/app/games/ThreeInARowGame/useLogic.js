import { useMediaQuery } from 'react-responsive';

// TODO: за победу не обязательно дают помокод (ответ с бэка)

export default function useLogic({ canvasRef, setScores }) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    if (canvasRef) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas?.getContext('2d');
        const level = {
            x: 0,
            y: 0,
            columns: 5,
            rows: 5,
            tileWidth: 65,
            tileHeight: 65,
            tiles: [],
            selectedTile: { selected: false, column: 0, row: 0 }
        };
        const tileColors = [
            [255, 128, 128],
            [128, 255, 128],
            [128, 128, 255],
            [255, 255, 128],
            [255, 128, 255],
            [128, 255, 255],
            [93, 95, 97]
        ];
        let clusters = [];
        let moves = [];
        let lastframe = 0;
        let fpstime = 0;
        let framecount = 0;
        let fps = 0;
        const gamestates = { init: 0, ready: 1, resolve: 2 };
        let gamestate = gamestates.init;
        let animationstate = 0;
        let animationtime = 0;
        const animationtimetotal = 0.3;
        let currentmove = { column1: 0, row1: 0, column2: 0, row2: 0 };
        let drag = false;

        const newGame = () => {
            setScores(0);

            gamestate = gamestates.ready;

            createLevel();

            findMoves();
            findClusters();
        };

        const game = () => {
            canvas.width = 325;
            canvas.height = 325;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.addEventListener('mousemove', onMouseMove);
            canvas.addEventListener('mousedown', onMouseDown);
            canvas.addEventListener('mouseup', onMouseUp);
            canvas.addEventListener('mouseout', onMouseOut);

            for (let i = 0; i < level.columns; i += 1) {
                level.tiles[i] = [];

                for (let j = 0; j < level.rows; j += 1) {
                    level.tiles[i][j] = { type: 0, shift: 0 };
                }
            }

            newGame();

            main(0);
        };

        const updateFps = (dt) => {
            if (fpstime > 0.25) {
                fps = Math.round(framecount / fpstime);

                fpstime = 0;
                framecount = 0;
            }

            fpstime += dt;
            framecount += 1;
        };

        const update = (tframe) => {
            const dt = (tframe - lastframe) / 1000;
            lastframe = tframe;

            updateFps(dt);

            if (gamestate === gamestates.ready) {
                if (moves.length <= 0) {
                    createLevel();
                }
            } else if (gamestate === gamestates.resolve) {
                animationtime += dt;

                if (animationstate === 0) {
                    if (animationtime > animationtimetotal) {
                        findClusters();

                        if (clusters.length > 0) {
                            for (let i = 0; i < clusters.length; i += 1) {
                                setScores(
                                    // eslint-disable-next-line no-loop-func
                                    (prevScores) => prevScores + 100 * (clusters[i].length - 2)
                                );
                            }

                            removeClusters();

                            animationstate = 1;
                        } else {
                            gamestate = gamestates.ready;
                        }
                        animationtime = 0;
                    }
                } else if (animationstate === 1) {
                    if (animationtime > animationtimetotal) {
                        shiftTiles();

                        animationstate = 0;
                        animationtime = 0;

                        findClusters();
                        if (clusters.length <= 0) {
                            gamestate = gamestates.ready;
                        }
                    }
                } else if (animationstate === 2) {
                    if (animationtime > animationtimetotal) {
                        swap(
                            currentmove.column1,
                            currentmove.row1,
                            currentmove.column2,
                            currentmove.row2
                        );

                        findClusters();
                        if (clusters.length > 0) {
                            animationstate = 0;
                            animationtime = 0;
                            gamestate = gamestates.resolve;
                        } else {
                            animationstate = 3;
                            animationtime = 0;
                        }

                        findMoves();
                        findClusters();
                    }
                } else if (animationstate === 3) {
                    if (animationtime > animationtimetotal) {
                        swap(
                            currentmove.column1,
                            currentmove.row1,
                            currentmove.column2,
                            currentmove.row2
                        );

                        gamestate = gamestates.ready;
                    }
                }

                findMoves();
                findClusters();
            }
        };

        const main = (tframe) => {
            requestAnimationFrame(main);

            update(tframe);
            render();
        };

        const swap = (x1, y1, x2, y2) => {
            const typeSwap = level.tiles[x1][y1].type;
            level.tiles[x1][y1].type = level.tiles[x2][y2].type;
            level.tiles[x2][y2].type = typeSwap;
        };

        const findClusters = () => {
            clusters = [];

            for (let j = 0; j < level.rows; j += 1) {
                let matchLength = 1;

                for (let i = 0; i < level.columns; i += 1) {
                    let checkCluster = false;

                    if (i === level.columns - 1) {
                        checkCluster = true;
                    } else if (
                        level.tiles[i][j].type === level.tiles[i + 1][j].type &&
                        level.tiles[i][j].type !== -1
                    ) {
                        matchLength += 1;
                    } else {
                        checkCluster = true;
                    }

                    if (checkCluster) {
                        if (matchLength >= 3) {
                            clusters.push({
                                column: i + 1 - matchLength,
                                row: j,
                                length: matchLength,
                                horizontal: true
                            });
                        }

                        matchLength = 1;
                    }
                }
            }

            for (let i = 0; i < level.columns; i += 1) {
                let matchLength = 1;

                for (let j = 0; j < level.rows; j += 1) {
                    let checkCluster = false;

                    if (j === level.rows - 1) {
                        checkCluster = true;
                    } else if (
                        level.tiles[i][j].type === level.tiles[i][j + 1].type &&
                        level.tiles[i][j].type !== -1
                    ) {
                        matchLength += 1;
                    } else {
                        checkCluster = true;
                    }

                    if (checkCluster) {
                        if (matchLength >= 3) {
                            clusters.push({
                                column: i,
                                row: j + 1 - matchLength,
                                length: matchLength,
                                horizontal: false
                            });
                        }

                        matchLength = 1;
                    }
                }
            }
        };

        const renderTiles = () => {
            for (let i = 0; i < level.columns; i += 1) {
                for (let j = 0; j < level.rows; j += 1) {
                    const { shift } = level.tiles[i][j];

                    const coord = getTileCoordinate(
                        i,
                        j,
                        0,
                        (animationtime / animationtimetotal) * shift
                    );

                    if (level.tiles[i][j].type >= 0) {
                        const col = tileColors[level.tiles[i][j].type];

                        drawTile(coord.tilex, coord.tiley, col[0], col[1], col[2]);
                    }

                    if (level.selectedTile.selected) {
                        if (level.selectedTile.column === i && level.selectedTile.row === j) {
                            drawTile(coord.tilex, coord.tiley, 255, 0, 0);
                        }
                    }
                }
            }

            if (
                gamestate === gamestates.resolve &&
                (animationstate === 2 || animationstate === 3)
            ) {
                const shiftx = currentmove.column2 - currentmove.column1;
                const shifty = currentmove.row2 - currentmove.row1;

                const coord1 = getTileCoordinate(currentmove.column1, currentmove.row1, 0, 0);
                const coord1shift = getTileCoordinate(
                    currentmove.column1,
                    currentmove.row1,
                    (animationtime / animationtimetotal) * shiftx,
                    (animationtime / animationtimetotal) * shifty
                );
                const col1 = tileColors[level.tiles[currentmove.column1][currentmove.row1].type];

                const coord2 = getTileCoordinate(currentmove.column2, currentmove.row2, 0, 0);
                const coord2shift = getTileCoordinate(
                    currentmove.column2,
                    currentmove.row2,
                    (animationtime / animationtimetotal) * -shiftx,
                    (animationtime / animationtimetotal) * -shifty
                );
                const col2 = tileColors[level.tiles[currentmove.column2][currentmove.row2].type];

                drawTile(coord1.tilex, coord1.tiley, 0, 0, 0);
                drawTile(coord2.tilex, coord2.tiley, 0, 0, 0);

                if (animationstate === 2) {
                    drawTile(coord1shift.tilex, coord1shift.tiley, col1[0], col1[1], col1[2]);
                    drawTile(coord2shift.tilex, coord2shift.tiley, col2[0], col2[1], col2[2]);
                } else {
                    drawTile(coord2shift.tilex, coord2shift.tiley, col2[0], col2[1], col2[2]);
                    drawTile(coord1shift.tilex, coord1shift.tiley, col1[0], col1[1], col1[2]);
                }
            }
        };

        const getTileCoordinate = (column, row, columnoffset, rowoffset) => {
            const tilex = level.x + (column + columnoffset) * level.tileWidth;
            const tiley = level.y + (row + rowoffset) * level.tileHeight;
            return { tilex, tiley };
        };

        const drawTile = (x, y, r, g, b) => {
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x + 2, y + 2, level.tileWidth - 4, level.tileHeight - 4);
        };

        const render = () => {
            ctx.fillStyle = '#ffffff';
            ctx.font = '24px Verdana';

            const levelwidth = level.columns * level.tileWidth;
            const levelheight = level.rows * level.tileHeight;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(level.x - 4, level.y - 4, levelwidth + 8, levelheight + 8);

            renderTiles();
        };

        const findMoves = () => {
            moves = [];

            for (let j = 0; j < level.rows; j += 1) {
                for (let i = 0; i < level.columns - 1; i += 1) {
                    swap(i, j, i + 1, j);
                    findClusters();
                    swap(i, j, i + 1, j);

                    if (clusters.length > 0) {
                        moves.push({ column1: i, row1: j, column2: i + 1, row2: j });
                    }
                }
            }

            for (let i = 0; i < level.columns; i += 1) {
                for (let j = 0; j < level.rows - 1; j += 1) {
                    swap(i, j, i, j + 1);
                    findClusters();
                    swap(i, j, i, j + 1);

                    if (clusters.length > 0) {
                        moves.push({ column1: i, row1: j, column2: i, row2: j + 1 });
                    }
                }
            }

            clusters = [];
        };

        const loopClusters = (func) => {
            for (let i = 0; i < clusters.length; i += 1) {
                const cluster = clusters[i];
                let coffset = 0;
                let roffset = 0;
                for (let j = 0; j < cluster.length; j += 1) {
                    func(i, cluster.column + coffset, cluster.row + roffset, cluster);

                    if (cluster.horizontal) {
                        coffset += 1;
                    } else {
                        roffset += 1;
                    }
                }
            }
        };

        const removeClusters = () => {
            loopClusters((index, column, row) => {
                level.tiles[column][row].type = -1;
            });

            for (let i = 0; i < level.columns; i += 1) {
                let shift = 0;
                for (let j = level.rows - 1; j >= 0; j -= 1) {
                    if (level.tiles[i][j].type === -1) {
                        shift += 1;
                        level.tiles[i][j].shift = 0;
                    } else {
                        level.tiles[i][j].shift = shift;
                    }
                }
            }
        };

        const shiftTiles = () => {
            for (let i = 0; i < level.columns; i += 1) {
                for (let j = level.rows - 1; j >= 0; j -= 1) {
                    if (level.tiles[i][j].type === -1) {
                        level.tiles[i][j].type = getRandomTile();
                    } else {
                        const { shift } = level.tiles[i][j];
                        if (shift > 0) {
                            swap(i, j, i, j + shift);
                        }
                    }

                    // Reset shift
                    level.tiles[i][j].shift = 0;
                }
            }
        };

        const resolveClusters = () => {
            findClusters();

            while (clusters.length > 0) {
                removeClusters();

                shiftTiles();

                findClusters();
            }
        };

        const getRandomTile = () => {
            return Math.floor(Math.random() * tileColors.length);
        };

        const createLevel = () => {
            let done = false;

            while (!done) {
                for (let i = 0; i < level.columns; i += 1) {
                    for (let j = 0; j < level.rows; j += 1) {
                        level.tiles[i][j].type = getRandomTile();
                    }
                }

                resolveClusters();

                findMoves();

                if (moves.length > 0) {
                    done = true;
                }
            }
        };

        const getMouseTile = (pos) => {
            const tx = Math.floor((pos.x - level.x) / level.tileWidth);
            const ty = Math.floor((pos.y - level.y) / level.tileHeight);

            if (tx >= 0 && tx < level.columns && ty >= 0 && ty < level.rows) {
                // Tile is valid
                return {
                    valid: true,
                    x: tx,
                    y: ty
                };
            }

            return {
                valid: false,
                x: 0,
                y: 0
            };
        };

        const canSwap = (x1, y1, x2, y2) => {
            return (Math.abs(x1 - x2) === 1 && y1 === y2) || (Math.abs(y1 - y2) === 1 && x1 === x2);
        };

        const mouseSwap = (c1, r1, c2, r2) => {
            currentmove = { column1: c1, row1: r1, column2: c2, row2: r2 };

            level.selectedTile.selected = false;

            animationstate = 2;
            animationtime = 0;
            gamestate = gamestates.resolve;
        };

        const onMouseMove = (e) => {
            const pos = getMousePos(canvas, e);

            if (drag && level.selectedTile.selected) {
                const mt = getMouseTile(pos);

                if (mt.valid) {
                    if (canSwap(mt.x, mt.y, level.selectedTile.column, level.selectedTile.row)) {
                        mouseSwap(mt.x, mt.y, level.selectedTile.column, level.selectedTile.row);
                    }
                }
            }
        };

        const onMouseDown = (e) => {
            const pos = getMousePos(canvas, e);

            if (!drag) {
                const mt = getMouseTile(pos);

                if (mt.valid) {
                    let swapped = false;
                    if (level.selectedTile.selected) {
                        if (mt.x === level.selectedTile.column && mt.y === level.selectedTile.row) {
                            level.selectedTile.selected = false;
                            drag = true;
                            return;
                        }
                        if (
                            canSwap(mt.x, mt.y, level.selectedTile.column, level.selectedTile.row)
                        ) {
                            mouseSwap(
                                mt.x,
                                mt.y,
                                level.selectedTile.column,
                                level.selectedTile.row
                            );
                            swapped = true;
                        }
                    }

                    if (!swapped) {
                        level.selectedTile.column = mt.x;
                        level.selectedTile.row = mt.y;
                        level.selectedTile.selected = true;
                    }
                } else {
                    level.selectedTile.selected = false;
                }

                drag = true;
            }
        };

        const onMouseUp = () => {
            drag = false;
        };

        const onMouseOut = () => {
            drag = false;
        };

        const getMousePos = (canvas, e) => {
            const rect = canvas.getBoundingClientRect();

            return {
                x: Math.round(((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width),
                y: Math.round(((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height)
            };
        };

        return {
            canvas,
            game,
            onMouseMove,
            onMouseDown,
            onMouseUp,
            onMouseOut
        };
    }

    return {};
}
