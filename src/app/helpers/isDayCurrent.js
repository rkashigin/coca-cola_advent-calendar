import { isFuture } from 'date-fns';
import { RootStore } from '../stores/RootStore';

export default function isDayCurrent(dayIdx) {
    return isFuture(new Date(2021, 11, RootStore.myGamesCompleted))
        ? RootStore.myGamesCompleted - 2 === dayIdx
        : RootStore.myGamesCompleted - 1 === dayIdx;
}
