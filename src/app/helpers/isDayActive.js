import { isFuture } from 'date-fns';
import { RootStore } from '../stores/RootStore';

export default function isDayActive(date) {
    // const dateToCheck = new Date(RootStore.date);
    // dateToCheck.setDate(date);
    //
    // if (isFuture(dateToCheck)) return false;
    //
    // return date <= RootStore.myGamesCompleted;

    return date === 1;
}
