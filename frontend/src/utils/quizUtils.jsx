import { Laugh, Smile, Frown } from 'lucide-react';

export const handleEmoji = (correctAnswersPercentage, setEmoji) => {
    if (correctAnswersPercentage === 100) {
        setEmoji(<Laugh />);
    } else if (correctAnswersPercentage >= 60) {
        setEmoji(<Smile />);
    } else {
        setEmoji(<Frown />);
    }
};
