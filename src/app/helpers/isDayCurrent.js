import { isFuture } from 'date-fns';
import { RootStore } from '../stores/RootStore';

export default function isDayCurrent(dayIdx) {
    const currentDate = new Date(RootStore.date);
    const dateToCheck = new Date(RootStore.date);
    dateToCheck.setDate(RootStore.myGamesCompleted);

    return dateToCheck > currentDate
        ? RootStore.myGamesCompleted - 2 === dayIdx
        : RootStore.myGamesCompleted - 1 === dayIdx;
}
