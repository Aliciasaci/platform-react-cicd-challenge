<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Etablissement;
use App\Entity\Presation;
use App\Entity\Category;
use App\Entity\Employe;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Faker\Factory;

class EtablisssementFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create("fr_FR");

        // create random etablissements
        for ($i = 1; $i <= 10; $i++) {
            $etablissement = new Etablissement;
            $etablissement->setNom("Etablissement-" . $i);
            $etablissement->setAdresse("Adresse-" . $i);
            $etablissement->setKbis("Kbis-" . $i);
            $etablissement->setValidation(true);
            $etablissement->setPrestataire($this->getReference('prestataire' . $i));

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
