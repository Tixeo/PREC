import React from 'react';
import "../styles/style.css";

const MentionsLegales = () => {
  return (
    <div className="mentions-container" style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Mentions légales</h1>

      <section>
        <h2>Propriétaire du site</h2>
        <p>
          Nom de la boutique : Poit Rayure et Caro<br />
          Adresse : 6 Rue de Verrue, 50550 Saint-Vaast-la-Hougue, France<br />
          Numéro de téléphone : 02 33 20 13 45<br />
          Adresse e-mail : poisrayuresetcaro@orange.fr<br />
          Forme juridique : (à compléter)<br />
          Numéro SIRET : (à compléter)<br />
          Numéro de TVA intracommunautaire : (à compléter, si applicable)
        </p>
      </section>

      <section>
        <h2>Directeur de la publication</h2>
        <p>
          Nom et prénom du directeur de publication : (à compléter)
        </p>
      </section>

      <section>
        <h2>Hébergement du site</h2>
        <p>
          Nom de l'hébergeur : Netlify<br />
          Adresse de l'hébergeur : Non applicable<br />
          Numéro de téléphone de l'hébergeur : Non applicable
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Le site ainsi que tout son contenu (textes, images, graphismes, logo, icônes, etc.) sont protégés par les lois en vigueur en matière de propriété intellectuelle.
          Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site est interdite sans l’autorisation écrite préalable de Poit Rayure et Caro.
        </p>
      </section>

      <section>
        <h2>Limitation de responsabilité</h2>
        <p>
          Poit Rayure et Caro s’efforce de fournir sur le site des informations aussi précises que possible.
          Toutefois, Poit Rayure et Caro ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour de celles-ci,
          qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
        </p>
      </section>

      <section>
        <h2>Politique de confidentialité</h2>
        <p>
          Vos données personnelles sont collectées uniquement dans le cadre de la gestion des demandes et des contacts via le formulaire en ligne ou l’inscription à notre newsletter.
          Pour plus de détails, veuillez consulter notre <a href="lien vers la page de politique de confidentialité">Politique de confidentialité</a>.
        </p>
      </section>

      <section>
        <h2>Droit applicable</h2>
        <p>
          Les présentes mentions légales sont régies par les lois françaises. En cas de litige, et après échec de toute tentative de recherche d’une solution amiable,
          les tribunaux français seront seuls compétents pour connaître de ce litige.
        </p>
      </section>
    </div>
  );
};

export default MentionsLegales;
