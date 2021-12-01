import { RootStore } from '../stores/RootStore';

export default function isDayActive(date) {
    return date <= RootStore.myGamesCompleted;
}
