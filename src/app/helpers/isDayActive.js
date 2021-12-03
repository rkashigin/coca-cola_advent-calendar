import { isFuture } from 'date-fns';
import { RootStore } from '../stores/RootStore';

export default function isDayActive(date) {
    // if (isFuture(new Date(2021, 11, date))) return false;

    // return date <= RootStore.myGamesCompleted;

    return date === 1;
}
