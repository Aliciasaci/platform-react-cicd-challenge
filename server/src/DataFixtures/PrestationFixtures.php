<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Prestation;
use Faker\Factory;

class PrestationFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();

        $serviceTitles = [
            'Service de compagnie',
            'Service de soutien émotionnel',
            'Ami ou amie à louer',
            'Service de conversation',
            'Service de partage de loisirs',
            'Cours de discussion',
            'Service de copain ou copine',
            'Service d\'écoute empathique',
            'Service de conseil amical',
            'Service de rencontre',
            'Anniversaire',
            'Escorte soirée',
        ];

        for ($i = 1; $i <= 50; $i++) {
            $Prestation = new Prestation();
            $randomTitle = $serviceTitles[array_rand($serviceTitles)]; // Select a random title
            $Prestation->setTitre($randomTitle);
            $Prestation->setDescription("Le Lorem Ipsum esSt simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500");
            $Prestation->setPrix(rand(10, 100));
            $Prestation->setDuree(rand(1, 7));

            $manager->persist($Prestation);
        }

        $manager->flush();
    }
}
