// ============================================================
// PROJETS — études de cas. Chaque projet raconte une histoire :
// PROBLEM → ARCHITECTURE → IMPLEMENTATION → TECHNOLOGIES →
// RESULT → WHAT I LEARNED.
// Les champs sont volontairement simples à modifier/compléter.
// ============================================================

export type ProjectKind = "web" | "desktop" | "network" | "infrastructure" | "security";
export type ProjectVisual = "app-flow" | "router-topology" | "secure-net";
export type ProjectStatus = "completed" | "in-progress";

export type Project = {
  id: string;
  codename: string;
  name: string;
  kind: ProjectKind;
  status: ProjectStatus;
  summary: string;
  problem: string;
  architecture: string[];
  implementation: string[];
  technologies: string[];
  result: string;
  learned: string[];
  github?: string;
  demo?: string;
  flow: string[]; // étapes animées de la présentation
  visual: ProjectVisual;
};

export const PROJECTS: Project[] = [
  {
    id: "restaurant",
    codename: "WEB-01",
    name: "Restaurant Management",
    kind: "web",
    status: "completed",
    summary:
      "Application web de gestion de restaurant et site web. Le projet relie un frontend React à des backends Node.js et PHP, le tout piloté par une base de données.",
    problem:
      "Gérer les opérations d'un restaurant (et lui donner une présence web) avec des outils papier ou des feuilles de calcul rendait le quotidien lent et source d'erreurs. L'objectif : une seule application qui couvre la gestion et le site public.",
    architecture: [
      "Site public et interfaces construits avec React",
      "APIs et logique serveur en Node.js",
      "Partie du traitement serveur en PHP",
      "Base de données relationnelle pour la persistance",
    ],
    implementation: [
      "Composants React pour les parcours principaux (menu, réservation, gestion)",
      "Endpoints REST en Node.js et PHP",
      "Modèle de données et opérations CRUD",
      "Interface responsive, utilisable sur desktop et mobile",
    ],
    technologies: ["PHP", "React", "Node.js", "JavaScript", "SQL", "Git"],
    result:
      "Une application fonctionnelle qui centralise la gestion du restaurant et lui offre une présence en ligne. Ce projet m'a fait comprendre, de bout en bout, comment une stack complète s'articule.",
    learned: [
      "Premier projet full-stack mené de A à Z",
      "Conception d'APIs REST et bases du protocole HTTP",
      "Flux de données client → serveur → base de données",
      "Modélisation de base de données et requêtes",
    ],
    flow: ["Requête", "Frontend", "API", "Backend", "B. de données", "Réponse"],
    visual: "app-flow",
  },
  {
    id: "hotel",
    codename: "DESK-02",
    name: "Hotel Reservation",
    kind: "desktop",
    status: "completed",
    summary:
      "Application desktop de gestion de réservation d'hôtel développée en Java avec une interface JavaFX et un build Maven.",
    problem:
      "Le personnel d'un hôtel avait besoin d'un outil fiable pour gérer les chambres, les clients et les réservations sans risque de perte de données.",
    architecture: [
      "Interface graphique JavaFX",
      "Couche métier Java (modèles et services)",
      "Build et dépendances gérés par Maven",
      "Persistance locale des réservations",
    ],
    implementation: [
      "Écrans de gestion des réservations et des clients",
      "Logique métier séparée de l'interface",
      "Structure Maven standardisée (src/main, tests)",
      "Validation des données saisies côté application",
    ],
    technologies: ["Java", "JavaFX", "Maven", "Git"],
    result:
      "Une application desktop opérationnelle où les réservations peuvent être créées et gérées, avec une séparation claire entre interface et logique métier.",
    learned: [
      "Conception orientée objet en Java",
      "Développement d'interfaces avec JavaFX",
      "Organisation d'un projet Maven",
      "Séparation interface / logique métier",
    ],
    flow: ["Lancement", "Interface", "Logique métier", "Services", "Persistance", "Résultat"],
    visual: "app-flow",
  },
  {
    id: "banking",
    codename: "DESK-03",
    name: "Banking Desktop",
    kind: "desktop",
    status: "completed",
    summary:
      "Application desktop de gestion bancaire en C# avec Avalonia : gestion des comptes, transactions et clients avec une interface multiplateforme.",
    problem:
      "Proposer une interface de gestion bancaire moderne et multiplateforme, permettant de manipuler comptes et transactions de façon structurée.",
    architecture: [
      "Couche d'interface en Avalonia (XAML)",
      "Modèles de domaine et services en C#",
      "Persistance des données",
      "Build desktop multiplateforme .NET",
    ],
    implementation: [
      "Écrans de gestion des comptes et transactions",
      "Logique métier en C# avec modèles typés",
      "Interaction entre l'interface et les services",
      "Thème et composants Avalonia",
    ],
    technologies: ["C#", "Avalonia", ".NET", "Git"],
    result:
      "Une application desktop démontrant les parcours métier principaux d'un système bancaire : comptes et transactions.",
    learned: [
      "C# et l'écosystème .NET",
      "Développement d'UI avec Avalonia (XAML)",
      "Développement desktop multiplateforme",
      "Modélisation de données financières",
    ],
    flow: ["Lancement", "Interface", "Comptes", "Transactions", "Persistance", "Résultat"],
    visual: "app-flow",
  },
  {
    id: "port-scanner",
    codename: "NET-04",
    name: "Port Scanner",
    kind: "network",
    status: "completed",
    summary:
      "Outil d'analyse réseau qui identifie les ports ouverts ou fermés d'une machine cible. Un premier pas dans la compréhension des services exposés.",
    problem:
      "Connaître les ports ouverts sur une machine est la première étape pour analyser un service réseau ou durcir un système.",
    architecture: [
      "Scan des ports d'une cible via des connexions TCP",
      "Détermination de l'état de chaque port",
      "Rapport des ports ouverts / fermés / filtrés",
    ],
    implementation: [
      "Parcours d'une plage de ports sur une adresse donnée",
      "Analyse du résultat de chaque tentative de connexion",
      "Synthèse lisible des ports ouverts",
    ],
    technologies: ["TCP/IP", "Linux", "Kali Linux", "Python"],
    result:
      "Un outil fonctionnel qui identifie les ports ouverts d'une cible, utile pour comprendre ce qu'une machine expose sur le réseau.",
    learned: [
      "Fonctionnement du protocole TCP et des connexions",
      "Notion de port ouvert / fermé / filtré",
      "Écriture d'outils d'analyse réseau",
      "Utilisation responsable sur un périmètre autorisé",
    ],
    flow: ["Cible", "Scan TCP", "État du port", "Rapport", "Analyse"],
    visual: "app-flow",
  },
  {
    id: "gns3-routing",
    codename: "NET-05",
    name: "GNS3 Routing Lab",
    kind: "network",
    status: "completed",
    summary:
      "Infrastructure de routage construite sous GNS3 : plusieurs réseaux reliés avec les protocoles dynamiques RIP et OSPF.",
    problem:
      "Faire communiquer plusieurs réseaux entre eux grâce au routage dynamique, au lieu de routes statiques fragiles.",
    architecture: [
      "Plusieurs routeurs et réseaux dans une topologie GNS3",
      "RIP sur un domaine de routage",
      "OSPF sur un autre domaine",
      "Redistribution entre les domaines de routage",
      "Connectivité de bout en bout entre hôtes",
    ],
    implementation: [
      "Configuration des interfaces et adressage",
      "Activation de RIP et OSPF sur les routeurs",
      "Redistribution entre les protocoles",
      "Vérification des tables de routage et convergence",
    ],
    technologies: ["GNS3", "Cisco IOS", "RIP", "OSPF", "Networking"],
    result:
      "Des hôtes situés sur des réseaux différents se joignent via le routage dynamique. Le laboratoire montre comment RIP et OSPF propagent les routes et convergent.",
    learned: [
      "Comment RIP et OSPF choisissent les routes",
      "Configuration et vérification des protocoles",
      "Redistribution entre domaines de routage",
      "Simulation et debug réseau dans GNS3",
    ],
    flow: ["RIP", "OSPF", "Convergence", "Redistribution", "Connectivité"],
    visual: "router-topology",
  },
  {
    id: "network-services",
    codename: "INFRA-06",
    name: "Network Services Infrastructure",
    kind: "infrastructure",
    status: "completed",
    summary:
      "Architecture de services réseau : web, messagerie et monitoring, déployés dans des environnements isolés (conteneurs et machines virtuelles).",
    problem:
      "Mettre en place une infrastructure de services cohérente : un serveur web, une messagerie complète et une supervision, chacun avec un rôle clair et un environnement isolé.",
    architecture: [
      "Serveur web Apache2",
      "Messagerie Postfix + Dovecot (MTA + IMAP)",
      "Supervision Prometheus + Grafana",
      "Conteneurs Docker pour l'isolation",
      "Machines virtuelles KVM pour l'isolation lourde",
    ],
    implementation: [
      "Configuration et dépannage des services Linux",
      "Messagerie : envoi (Postfix) et lecture (Dovecot)",
      "Collecte de métriques avec Prometheus",
      "Visualisation dans Grafana",
      "Isolation via Docker et KVM",
    ],
    technologies: ["Apache2", "Postfix", "Dovecot", "Prometheus", "Grafana", "Docker", "KVM", "Linux"],
    result:
      "Une infrastructure de services où chaque composant a un rôle précis, est supervisé et tourne dans un environnement isolé.",
    learned: [
      "Configuration et dépannage de services Linux",
      "Bases de la messagerie (MTA + IMAP)",
      "Supervision avec Prometheus / Grafana",
      "Isolation avec conteneurs et machines virtuelles",
    ],
    flow: ["Web", "Mail", "Monitoring", "Conteneurs", "Virtualisation", "Résultat"],
    visual: "app-flow",
  },
  {
    id: "secure-network",
    codename: "SEC-07",
    name: "Secure Network Architecture",
    kind: "security",
    status: "in-progress",
    summary:
      "Étude de conception d'une architecture réseau sécurisée : pare-feu OPNsense, DMZ, IDS Suricata et simulation d'attaques Red Team depuis Kali Linux.",
    problem:
      "Concevoir un réseau qui sépare les services internes de l'exposition publique, et observer des attaques être réellement détectées.",
    architecture: [
      "Pare-feu OPNsense avec zones et politiques",
      "Segment DMZ pour les services publics",
      "IDS Suricata qui analyse le trafic",
      "Kali Linux dans le rôle de l'attaquant",
      "Simulation d'attaques Red Team en laboratoire",
    ],
    implementation: [
      "Règles de pare-feu et segmentation des zones",
      "Placement des services dans la DMZ",
      "Règles de détection Suricata",
      "Simulation d'attaques depuis Kali",
      "Analyse des alertes et des journaux",
    ],
    technologies: ["OPNsense", "Suricata", "DMZ", "Kali Linux", "Networking", "IDS"],
    result:
      "Un laboratoire de sécurité démontrant un réseau segmenté réaliste : les attaques sont détectées et journalisées par l'IDS, et la DMZ isole le réseau interne.",
    learned: [
      "Conception de zones et politiques de pare-feu",
      "Segmentation DMZ",
      "Détection par signatures et alertes IDS",
      "Méthodologie de simulation d'attaques dans un laboratoire contrôlé",
    ],
    flow: ["Pare-feu", "DMZ", "IDS", "Trafic", "Détection", "Journal"],
    visual: "secure-net",
  },
];

export const PROJECT_STORY_HEADINGS = {
  problem: "Problème",
  architecture: "Architecture",
  implementation: "Implémentation",
  technologies: "Technologies",
  result: "Résultat",
  learned: "Ce que j'ai appris",
};
