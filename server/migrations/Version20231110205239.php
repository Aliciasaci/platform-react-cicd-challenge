<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231110205239 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE employe_prestation (employe_id INT NOT NULL, prestation_id INT NOT NULL, PRIMARY KEY(employe_id, prestation_id))');
        $this->addSql('CREATE INDEX IDX_D301556A1B65292 ON employe_prestation (employe_id)');
        $this->addSql('CREATE INDEX IDX_D301556A9E45C554 ON employe_prestation (prestation_id)');
        $this->addSql('ALTER TABLE employe_prestation ADD CONSTRAINT FK_D301556A1B65292 FOREIGN KEY (employe_id) REFERENCES employe (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employe_prestation ADD CONSTRAINT FK_D301556A9E45C554 FOREIGN KEY (prestation_id) REFERENCES prestation (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE employe ADD etablissement_id INT NOT NULL');
        $this->addSql('ALTER TABLE employe ADD CONSTRAINT FK_F804D3B9FF631228 FOREIGN KEY (etablissement_id) REFERENCES etablissement (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_F804D3B9FF631228 ON employe (etablissement_id)');
        $this->addSql('ALTER TABLE "user" ALTER nom SET NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER prenom SET NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE employe_prestation DROP CONSTRAINT FK_D301556A1B65292');
        $this->addSql('ALTER TABLE employe_prestation DROP CONSTRAINT FK_D301556A9E45C554');
        $this->addSql('DROP TABLE employe_prestation');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74');
        $this->addSql('ALTER TABLE "user" ALTER nom DROP NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER prenom DROP NOT NULL');
        $this->addSql('ALTER TABLE employe DROP CONSTRAINT FK_F804D3B9FF631228');
        $this->addSql('DROP INDEX IDX_F804D3B9FF631228');
        $this->addSql('ALTER TABLE employe DROP etablissement_id');
    }
}
