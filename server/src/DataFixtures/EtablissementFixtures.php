<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Etablissement;
use App\Entity\ImageEtablissement;
use App\Entity\Presation;
use App\Entity\Category;
use App\Entity\Employe;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker\Factory;
use Symfony\Component\HttpFoundation\File\File;

class EtablisssementFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create("fr_FR");

        //Un tableau qui contient des adresses différentes en France format numéros de rue nom de rue, code postal ville
        $adresses = [
            "20 Rue Santerre, 75012 Paris",
            "1 Rue de la République, 75001 Paris",
            "118 Bd Diderot, 75012 Paris",
            "1 Rue de la Convention, 75015 Paris",
            "1 Rue Commines, 75003 Paris",
            "1 Rue de la Paix, 75002 Paris",
            "12 Rue Arthur Groussier, 75010 Paris",
            "14 Rue du Rocher, 75008 Paris",
            "24 Rue Collange, 92300 Levallois-Perret",
            "40 Av. de Saint-Ouen, 75018 Paris",
            "28 Rue Myrha, 75018 Paris"
        ];

        // create random etablissements
        for ($i = 1; $i <= 10; $i++) {
            $etablissement = new Etablissement;
            $etablissement->setNom("Etablissement-" . $i);
            $etablissement->setAdresse($adresses[$i - 1]);
            $etablissement->setKbis("Kbis-" . $i);
            $etablissement->setValidation(true);
            $etablissement->setPrestataire($this->getReference('prestataire' . $i));
            $etablissement->setHorrairesOuverture("-,10:00-19:00,10:00-19:00,10:00-20:00,10:00-19:00,10:00-19:00,-");
            $etablissement->setJoursOuverture("Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi,Dimanche");


            for ($j = 1; $j <= 10; $j++) {
                $imageEtablissement = new ImageEtablissement();
                $imageEtablissement->setImageName('image' . $j . '.jpg');
                $imageEtablissement->setImageFile(new File('public/fixtures/etablissement' . $j - 1 . '.jpg'));
                $imageEtablissement->setEtablissement($etablissement);
                $manager->persist($imageEtablissement);
            }

            $this->addReference('etablissement' . $i, $etablissement);
            $manager->persist($etablissement);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}
