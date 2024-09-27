
# Harpie - Système de Comparaison d'Assurances

Harpie est une application web sophistiquée basée sur react, conçue pour aider les gens à trouver la meilleure assurance pour leurs biens. Notre système simplifie le processus de comparaison de diverses polices d'assurance, permettant aux utilisateurs de prendre des décisions éclairées sur leurs besoins de couverture. À l'avenir, nous prévoyons d'intégrer une fonctionnalité de paiement, permettant aux utilisateurs non seulement de trouver mais aussi d'acheter leur assurance idéale directement via notre plateforme.

![Capture d'écran de Harpie](chemin/vers/capture.png)

[Voir la Démo en Direct](https://demo.harpie-insurance.com)

## Fonctionnalités Clés

- Comparaison complète des polices d'assurance
- Interface conviviale pour une navigation facile
- Filtres de recherche personnalisables pour affiner les options
- Informations détaillées sur les polices et documentation
- Comptes utilisateurs sécurisés pour sauvegarder et gérer les comparaisons

## Table des Matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Développement](#développement)
- [Contribution](#contribution)
- [Code de Conduite](#code-de-conduite)
- [Tests](#tests)
- [Déploiement](#déploiement)
- [Documentation de l'API](#documentation-de-lapi)
- [Dépannage](#dépannage)
- [Licence](#licence)

## Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 14 ou ultérieure) et [Yarn](https://yarnpkg.com/) installés sur votre système.

Pour installer Yarn, suivez le [guide d'installation officiel](https://yarnpkg.com/getting-started/install).

Clonez le dépôt et installez les dépendances :

```bash
git clone https://github.com/FRITZON/harpie_front.git
cd harpie_front
yarn install
# ou
yarn
```

## Utilisation

Pour exécuter l'application localement :

```bash
yarn start
```

Naviguez vers `http://localhost:4200/` dans votre navigateur web. L'application se rechargera automatiquement si vous modifiez des fichiers sources.

## Développement

- Exécutez `yarn generate nom-du-composant` pour générer un nouveau composant.
- Exécutez `yarn lint` pour linter le projet.
- Exécutez `yarn format` pour formater le code en utilisant Prettier.

Pour plus de détails sur le développement react, consultez la [Documentation react](https://react.io/docs).

## Contribution

Nous accueillons favorablement les contributions à Harpie ! Voici comment vous pouvez aider :

1. Forkez le dépôt.
2. Créez une nouvelle branche : `git checkout -b fonctionnalite/votre-nom-de-fonctionnalite`.
3. Effectuez vos modifications et committez-les : `git commit -m 'Ajout d'une fonctionnalité'`.
4. Poussez vers la branche : `git push origin fonctionnalite/votre-nom-de-fonctionnalite`.
5. Soumettez une pull request.

Veuillez lire nos [Directives de Contribution](CONTRIBUTING.md) pour plus de détails.

### Configuration de l'Environnement de Développement

1. Clonez votre fork du dépôt.
2. Installez les dépendances : `yarn install`.
3. Configurez les hooks pre-commit : `yarn husky install`.
4. Démarrez le serveur de développement : `yarn start`.

## Tests

Exécutez la suite de tests avec :

```bash
yarn test
```

Pour les tests de bout en bout :

```bash
yarn run cypress open
```

## Déploiement

Pour construire le projet pour la production :

```bash
yarn build
```

Les artefacts de construction seront stockés dans le répertoire `dist/`.

## Technologies Principales

- [react](https://react.io/) - Framework d'application web
- [RxJS](https://rxjs.dev/) - Bibliothèque de programmation réactive
- [Axios](https://axios-http.com/) - Client HTTP basé sur les promesses
- CSS personnalisé pour le style

## Documentation de l'API

Pour des informations détaillées sur nos points de terminaison API et leur utilisation, veuillez vous référer à notre [Documentation API](https://harpie-app.site).

## Dépannage

Vous rencontrez des problèmes ? Consultez notre [Guide de Dépannage](TROUBLESHOOTING.md) pour des solutions aux problèmes courants.

## Licence

Ce projet est sous licence de notre logiciel interne personnalisé - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.



=============================================================================
================================== ENGLISH ==================================
=============================================================================

# Harpie - Insurance Comparison System

Harpie is a sophisticated react-based web application designed to help people find the best insurance for their assets. Our system simplifies the process of comparing various insurance policies, enabling users to make informed decisions about their coverage needs. In the future, we plan to integrate payment functionality, allowing users to not only find but also purchase their ideal insurance directly through our platform.

![Harpie Screenshot](path/to/screenshot.png)

[View Live Demo](https://demo.harpie-insurance.com)

## Key Features

- Comprehensive insurance policy comparison
- User-friendly interface for easy navigation
- Customizable search filters to refine options
- Detailed policy information and documentation
- Secure user accounts for saving and managing comparisons

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Installation

Ensure you have [Node.js](https://nodejs.org/) (version 14 or later) and [Yarn](https://yarnpkg.com/) installed on your system.

To install Yarn, follow the [official installation guide](https://yarnpkg.com/getting-started/install).

Clone the repository and install dependencies:

```bash
git clone https://github.com/FRITZON/harpie_front.git
cd harpie_front
yarn install
# or 
yarn
```

## Usage

To run the application locally:

```bash
yarn start
```

Navigate to `http://localhost:4200/` in your web browser. The application will automatically reload if you change any source files.

## Development

- Run `yarn generate component-name` to generate a new component.
- Run `yarn lint` to lint the project.
- Run `yarn format` to format the code using Prettier.

For more details on react development, consult the [react Documentation](https://react.io/docs).

## Contributing

We welcome contributions to Harpie! Here's how you can help:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

Please read our [Contribution Guidelines](CONTRIBUTING.md) for more details.

### Setting Up the Development Environment

1. Clone your fork of the repository.
2. Install dependencies: `yarn install`.
3. Set up pre-commit hooks: `yarn husky install`.
4. Start the development server: `yarn start`.


## Testing

Run the test suite with:

```bash
yarn test
```

For end-to-end testing:

```bash
yarn run cypress open
```

## Deployment

To build the project for production:

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Core Technologies

- [react](https://react.io/) - Web application framework
- [Axios](https://axios-http.com/) - Promise-based HTTP client
- Custom CSS for styling

## API Documentation

For detailed information about our API endpoints and usage, please refer to our [API Documentation](https://harpie-app.site).

## Troubleshooting

Encountering issues? Check our [Troubleshooting Guide](TROUBLESHOOTING.md) for solutions to common problems.


## License

This project is licensed under our custom in-house software license - see the [LICENSE.md](LICENSE.md) file for details.

## PS: Test your code - this is a test
