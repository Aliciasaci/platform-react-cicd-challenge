import { render, screen } from '@testing-library/react';
import { OpeningDaysCard } from '../components/prestacomponents/OpeningDaysCard';

describe('OpeningDaysCard', () => {
  const openingDays = "Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi,Dimanche";
  
    it('renders opening days and hours correctly', () => {
        const openingHours = "10:00-19:00,10:00-19:00,10:00-19:00,10:00-20:00,10:00-19:00,10:00-19:00,10:00-19:00";
    
        render(<OpeningDaysCard openingDays={openingDays} openingHours={openingHours} />);

        const days = screen.getAllText('10:00-19:00');
        expect(days).toHaveLength(7);
    });

    it('displays "Fermé" for closed days', () => {
        const closedOpeningHours = '9:00 AM - 5:00 PM,-,9:00 AM - 5:00 PM,-,9:00 AM - 5:00 PM';

        render(<OpeningDaysCard openingDays={openingDays} openingHours={closedOpeningHours} />);

        const days = screen.getAllText('10:00-19:00');
        expect(days).toHaveLength(5);
        const hourTexts = days.map((day) => day.querySelector('span.text-black.font-medium.dark:text-white').textContent);
        expect(hourTexts).toEqual([
            '9:00 AM - 5:00 PM',
            'Fermé',
            '9:00 AM - 5:00 PM',
            'Fermé',
            '9:00 AM - 5:00 PM',
        ]);
    });
});