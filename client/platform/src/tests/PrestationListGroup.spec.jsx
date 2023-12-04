import { render, screen } from '@testing-library/react';
import { PrestationListGroup } from '../components/prestacomponents/PrestationListGroup';

describe('PrestationListGroup', () => {
  const prestations = [
    {
      id: 1,
      titre: 'Prestation 1',
      duree: 30,
      prix: 10,
      description: 'Description 1',
    },
    {
      id: 2,
      titre: 'Prestation 2',
      duree: 60,
      prix: 20,
      description: 'Description 2',
    },
  ];

  const buttonContent = 'Book Now';
  const linkTo = '/prestations/';

  it('renders the list of prestations correctly', () => {
    render(
      <PrestationListGroup
        prestations={prestations}
        buttonContent={buttonContent}
        linkTo={linkTo}
      />
    );

    const prestationsElements = screen.getAllByRole('listitem');
    expect(prestationsElements).toHaveLength(prestations.length);

    prestations.forEach((prestation, index) => {
      const prestationsElement = prestationsElements[index];

      expect(prestationsElement).toHaveAttribute(
        'href',
        linkTo + prestation.id.toString()
      );

      expect(screen.getByText(prestation.titre)).toBeInTheDocument();
      expect(screen.getByText(`${prestation.duree}mins`)).toBeInTheDocument();
      expect(screen.getByText(`${prestation.prix} €`)).toBeInTheDocument();
      expect(screen.getByText(buttonContent)).toBeInTheDocument();

      if (prestation.description) {
        expect(screen.getByText(prestation.description)).toBeInTheDocument();
        }
    });
  });
});