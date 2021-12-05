import { RootStore } from '../stores/RootStore';

export default function isDayPast(date) {
    const currentDate = new Date(RootStore.date);
    const dateToCheck = new Date(RootStore.date);
    dateToCheck.setDate(date);

    return dateToCheck < currentDate;
}
