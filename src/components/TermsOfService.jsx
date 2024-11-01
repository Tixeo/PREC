import React from 'react';
import "../styles/style.css";

const TermsOfService = () => {
  return (
    <div className="conditions-container" style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Conditions d’utilisation</h1>

      <section>
        <h2>Acceptation des Conditions</h2>
        <p>
          En utilisant notre site internet, vous acceptez de respecter les présentes Conditions d'utilisation.
          Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
        </p>
      </section>

      <section>
        <h2>Inscription et Compte</h2>
        <p>
          Lors de l'inscription, les utilisateurs sont invités à fournir leur nom, prénom, adresse e-mail, et un mot de passe.
          Ces informations permettent d'accéder aux fonctionnalités personnalisées du site, telles que la liste d’envies.
          Vous êtes responsable de la sécurité de votre compte et de votre mot de passe.
        </p>
      </section>

      <section>
        <h2>Partage des Données avec Firebase</h2>
        <p>
          Nous utilisons Firebase, une plateforme sécurisée de Google, pour la gestion de l’authentification et du stockage des données.
          En créant un compte et en utilisant ce site, vous acceptez que certaines informations personnelles soient stockées et traitées
          via Firebase, conformément aux normes de sécurité de Google.
        </p>
      </section>

      <section>
        <h2>Propriété Intellectuelle</h2>
        <p>
          Les contenus, images, textes et logos présents sur ce site sont notre propriété exclusive.
          Toute reproduction, distribution, modification ou utilisation non autorisée est strictement interdite sans notre accord préalable.
        </p>
      </section>

      <section>
        <h2>Utilisation des Données</h2>
        <p>
          Les données personnelles collectées, telles que les noms, prénoms, adresses e-mail et listes d’envies,
          sont destinées uniquement à l’usage interne et sont stockées sur Firebase.
          Ces données ne seront pas partagées avec d'autres tiers sans le consentement explicite de l’utilisateur,
          sauf en cas d’obligation légale.
        </p>
      </section>

      <section>
        <h2>Limitations de Responsabilité</h2>
        <p>
          Nous nous efforçons de fournir des informations précises sur les articles, cependant, des erreurs ou omissions peuvent survenir.
          Nous ne garantissons pas que les informations affichées sont toujours à jour, complètes ou exemptes d'erreurs.
          Nous déclinons toute responsabilité en cas de dommage lié à l’utilisation des informations fournies sur ce site.
        </p>
      </section>

      <section>
        <h2>Modifications des Conditions</h2>
        <p>
          Nous nous réservons le droit de modifier les présentes Conditions d'utilisation à tout moment.
          Les utilisateurs seront informés de tout changement et devront accepter les nouvelles conditions pour continuer à utiliser notre site.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
