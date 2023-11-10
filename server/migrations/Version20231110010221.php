<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231110010221 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE etablissement DROP CONSTRAINT fk_20fd592c9e45c554');
        $this->addSql('DROP INDEX idx_20fd592c9e45c554');
        $this->addSql('ALTER TABLE etablissement ADD prestataire_id INT NOT NULL');
        $this->addSql('ALTER TABLE etablissement DROP prestation_id');
        $this->addSql('ALTER TABLE etablissement ALTER validation SET NOT NULL');
        $this->addSql('ALTER TABLE etablissement ADD CONSTRAINT FK_20FD592CBE3DB2B7 FOREIGN KEY (prestataire_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_20FD592CBE3DB2B7 ON etablissement (prestataire_id)');
        $this->addSql('ALTER TABLE prestation ADD etablissement_id INT NOT NULL');
        $this->addSql('ALTER TABLE prestation ADD CONSTRAINT FK_51C88FADFF631228 FOREIGN KEY (etablissement_id) REFERENCES etablissement (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_51C88FADFF631228 ON prestation (etablissement_id)');
        $this->addSql('ALTER TABLE "user" RENAME COLUMN is_email_verified TO email_verified');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" RENAME COLUMN email_verified TO is_email_verified');
        $this->addSql('ALTER TABLE prestation DROP CONSTRAINT FK_51C88FADFF631228');
        $this->addSql('DROP INDEX IDX_51C88FADFF631228');
        $this->addSql('ALTER TABLE prestation DROP etablissement_id');
        $this->addSql('ALTER TABLE etablissement DROP CONSTRAINT FK_20FD592CBE3DB2B7');
        $this->addSql('DROP INDEX IDX_20FD592CBE3DB2B7');
        $this->addSql('ALTER TABLE etablissement ADD prestation_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE etablissement DROP prestataire_id');
        $this->addSql('ALTER TABLE etablissement ALTER validation DROP NOT NULL');
        $this->addSql('ALTER TABLE etablissement ADD CONSTRAINT fk_20fd592c9e45c554 FOREIGN KEY (prestation_id) REFERENCES prestation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_20fd592c9e45c554 ON etablissement (prestation_id)');
    }
}
