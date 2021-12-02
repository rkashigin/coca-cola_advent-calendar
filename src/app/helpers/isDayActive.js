import { RootStore } from '../stores/RootStore';

export default function isDayActive(date) {
    const currentDate = new Date(RootStore.date);
    const dateToCheck = new Date(RootStore.date);
    dateToCheck.setDate(date);

    if (dateToCheck > currentDate) return false;

    return date <= RootStore.myGamesCompleted;
}
