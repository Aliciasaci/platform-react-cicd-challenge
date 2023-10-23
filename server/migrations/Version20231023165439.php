<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231023165439 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE etablissement_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE etablissement (id INT NOT NULL, nom VARCHAR(255) NOT NULL, adresse VARCHAR(255) DEFAULT NULL, kbis VARCHAR(255) DEFAULT NULL, validation BOOLEAN DEFAULT NULL, jours_ouverture VARCHAR(255) DEFAULT NULL, horraires_ouverture VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D649FF631228 FOREIGN KEY (etablissement_id) REFERENCES etablissement (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8D93D649FF631228 ON "user" (etablissement_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D649FF631228');
        $this->addSql('DROP SEQUENCE etablissement_id_seq CASCADE');
        $this->addSql('DROP TABLE etablissement');
        $this->addSql('DROP INDEX IDX_8D93D649FF631228');
    }
}
