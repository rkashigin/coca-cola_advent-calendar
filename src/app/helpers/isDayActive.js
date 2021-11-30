import { isFuture, isPast } from 'date-fns';
import { RootStore } from '../stores/RootStore';

export default function isDayActive(date) {
    if (isPast(new Date(2021, 11, date))) return true;

    return !(date > RootStore.myGamesCompleted || isFuture(new Date(2021, 11, date)));
}
