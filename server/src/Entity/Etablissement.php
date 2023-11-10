<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EtablissementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EtablissementRepository::class)]
#[ApiResource]
class Etablissement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $adresse = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $kbis = null;

    #[ORM\Column]
    private ?bool $validation = false;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $jours_ouverture = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $horraires_ouverture = null;

    #[ORM\ManyToOne(inversedBy: 'etablissement')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $prestataire = null;

    #[ORM\OneToMany(mappedBy: 'etablissement', targetEntity: Prestation::class)]
    private Collection $prestation;

    public function __construct()
    {
        $this->prestation = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getKbis(): ?string
    {
        return $this->kbis;
    }

    public function setKbis(?string $kbis): static
    {
        $this->kbis = $kbis;

        return $this;
    }

    public function isValidation(): ?bool
    {
        return $this->validation;
    }

    public function setValidation(?bool $validation): static
    {
        $this->validation = $validation;

        return $this;
    }

    public function getJoursOuverture(): ?string
    {
        return $this->jours_ouverture;
    }

    public function setJoursOuverture(?string $jours_ouverture): static
    {
        $this->jours_ouverture = $jours_ouverture;

        return $this;
    }

    public function getHorrairesOuverture(): ?string
    {
        return $this->horraires_ouverture;
    }

    public function setHorrairesOuverture(?string $horraires_ouverture): static
    {
        $this->horraires_ouverture = $horraires_ouverture;

        return $this;
    }

    public function getPrestataire(): ?User
    {
        return $this->prestataire;
    }

    public function setPrestataire(?User $prestataire): static
    {
        $this->prestataire = $prestataire;

        return $this;
    }

    /**
     * @return Collection<int, Prestation>
     */
    public function getPrestation(): Collection
    {
        return $this->prestation;
    }

    public function addPrestation(Prestation $prestation): static
    {
        if (!$this->prestation->contains($prestation)) {
            $this->prestation->add($prestation);
            $prestation->setEtablissement($this);
        }

        return $this;
    }

    public function removePrestation(Prestation $prestation): static
    {
        if ($this->prestation->removeElement($prestation)) {
            // set the owning side to null (unless already changed)
            if ($prestation->getEtablissement() === $this) {
                $prestation->setEtablissement(null);
            }
        }

        return $this;
    }
}
