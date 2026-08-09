// ============================================================
// TECHNOLOGY GRAPH — la stack, classée par domaine avec un
// statut honnête (active / learning / future).
// ============================================================

export type SkillCategory =
  | "software"
  | "systems"
  | "networking"
  | "infrastructure"
  | "security"
  | "devops";

export type SkillStatus = "active" | "learning" | "future";

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  status: SkillStatus;
  level: number; // 0..1 — niveau actuel, honnête
  desc: string;
  usage: string;
  connects: string[];
  projects?: string[];
};

export const SKILL_CATEGORIES: Record<SkillCategory, string> = {
  software: "Software",
  systems: "Systems",
  networking: "Networking",
  infrastructure: "Infrastructure",
  security: "Security",
  devops: "DevOps / Cloud",
};

export const SKILLS: Skill[] = [
  // ---------- SOFTWARE ----------
  {
    id: "php",
    name: "PHP",
    category: "software",
    status: "active",
    level: 0.72,
    desc: "Développement web serveur et sites dynamiques.",
    usage: "Backend web, sites, gestion de restaurant",
    connects: ["javascript", "apache2", "git"],
    projects: ["Restaurant Management"],
  },
  {
    id: "react",
    name: "React",
    category: "software",
    status: "active",
    level: 0.78,
    desc: "Interfaces utilisateur composables et interactives.",
    usage: "Frontend d'applications web",
    connects: ["javascript", "node", "git"],
    projects: ["Restaurant Management"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "software",
    status: "active",
    level: 0.8,
    desc: "Langage principal du web, côté client et serveur.",
    usage: "Logique frontend, Node.js, scripts",
    connects: ["react", "node", "php"],
    projects: ["Restaurant Management"],
  },
  {
    id: "node",
    name: "Node.js",
    category: "software",
    status: "active",
    level: 0.74,
    desc: "Exécution JavaScript côté serveur.",
    usage: "APIs et backends JavaScript",
    connects: ["javascript", "react", "docker"],
    projects: ["Restaurant Management"],
  },
  {
    id: "java",
    name: "Java",
    category: "software",
    status: "active",
    level: 0.78,
    desc: "Programmation orientée objet et applications desktop.",
    usage: "Applications desktop, logique métier",
    connects: ["javafx", "maven"],
    projects: ["Hotel Reservation"],
  },
  {
    id: "javafx",
    name: "JavaFX",
    category: "software",
    status: "active",
    level: 0.62,
    desc: "Interfaces graphiques desktop en Java.",
    usage: "UI desktop",
    connects: ["java", "maven"],
    projects: ["Hotel Reservation"],
  },
  {
    id: "maven",
    name: "Maven",
    category: "software",
    status: "active",
    level: 0.66,
    desc: "Gestion de projet et dépendances Java.",
    usage: "Build et dépendances",
    connects: ["java", "javafx"],
    projects: ["Hotel Reservation"],
  },
  {
    id: "csharp",
    name: "C#",
    category: "software",
    status: "active",
    level: 0.66,
    desc: "Langage .NET pour applications desktop et backend.",
    usage: "Applications desktop .NET",
    connects: ["avalonia", "git"],
    projects: ["Banking Desktop"],
  },
  {
    id: "avalonia",
    name: "Avalonia",
    category: "software",
    status: "active",
    level: 0.55,
    desc: "Framework UI XAML multiplateforme pour .NET.",
    usage: "UI desktop multiplateforme",
    connects: ["csharp"],
    projects: ["Banking Desktop"],
  },
  {
    id: "python",
    name: "Python",
    category: "software",
    status: "active",
    level: 0.72,
    desc: "Scripting, automatisation et outils réseau.",
    usage: "Scripts, outils d'analyse, automatisation",
    connects: ["linux", "suricata", "git"],
    projects: ["Port Scanner"],
  },
  {
    id: "cpp",
    name: "C/C++",
    category: "software",
    status: "learning",
    level: 0.5,
    desc: "Langages système, proches du matériel.",
    usage: "Apprentissage des fondamentaux systèmes",
    connects: ["linux"],
  },
  {
    id: "git",
    name: "Git",
    category: "software",
    status: "active",
    level: 0.78,
    desc: "Contrôle de version et collaboration.",
    usage: "Tous mes projets",
    connects: ["github", "react", "node", "java", "csharp", "python"],
  },

  // ---------- SYSTEMS ----------
  {
    id: "linux",
    name: "Linux",
    category: "systems",
    status: "active",
    level: 0.75,
    desc: "Système d'exploitation principal, administration et services.",
    usage: "Administration, services, virtualisation",
    connects: ["kali", "kvm", "docker", "apache2", "python", "cpp"],
    projects: ["Network Services", "Secure Network"],
  },
  {
    id: "kali",
    name: "Kali Linux",
    category: "systems",
    status: "active",
    level: 0.72,
    desc: "Distribution dédiée à la sécurité et aux tests.",
    usage: "Environnement de travail, analyse et simulation",
    connects: ["linux", "suricata", "opnsense", "gns3"],
    projects: ["Secure Network"],
  },
  {
    id: "kvm",
    name: "KVM",
    category: "systems",
    status: "active",
    level: 0.6,
    desc: "Virtualisation native sur Linux.",
    usage: "Machines virtuelles et isolation",
    connects: ["linux", "gns3"],
    projects: ["Network Services"],
  },

  // ---------- NETWORKING ----------
  {
    id: "gns3",
    name: "GNS3",
    category: "networking",
    status: "active",
    level: 0.7,
    desc: "Simulation et émulation de réseaux.",
    usage: "Laboratoire réseau : routeurs, switches, topologies",
    connects: ["cisco", "rip", "ospf", "kali", "kvm"],
    projects: ["GNS3 RIP/OSPF", "Secure Network"],
  },
  {
    id: "cisco",
    name: "Cisco",
    category: "networking",
    status: "learning",
    level: 0.5,
    desc: "Routage et commutation — en formation Cisco.",
    usage: "Configuration de routeurs et switches",
    connects: ["gns3", "rip", "ospf"],
    projects: ["GNS3 RIP/OSPF"],
  },
  {
    id: "rip",
    name: "RIP",
    category: "networking",
    status: "learning",
    level: 0.55,
    desc: "Protocole de routage à vecteur de distance.",
    usage: "Routage dynamique dans le laboratoire",
    connects: ["cisco", "ospf", "gns3"],
    projects: ["GNS3 RIP/OSPF"],
  },
  {
    id: "ospf",
    name: "OSPF",
    category: "networking",
    status: "learning",
    level: 0.5,
    desc: "Protocole de routage à état de liens.",
    usage: "Routage dynamique entre domaines",
    connects: ["cisco", "rip", "gns3"],
    projects: ["GNS3 RIP/OSPF"],
  },
  {
    id: "tcpip",
    name: "TCP/IP",
    category: "networking",
    status: "active",
    level: 0.62,
    desc: "Fondamentaux de la pile réseau et du transport.",
    usage: "Analyse réseau, scans, dépannage",
    connects: ["gns3", "python"],
    projects: ["Port Scanner"],
  },

  // ---------- INFRASTRUCTURE ----------
  {
    id: "docker",
    name: "Docker",
    category: "infrastructure",
    status: "learning",
    level: 0.5,
    desc: "Conteneurisation d'applications.",
    usage: "Isolation et déploiement de services",
    connects: ["linux", "kvm", "apache2", "prometheus"],
    projects: ["Network Services"],
  },
  {
    id: "apache2",
    name: "Apache2",
    category: "infrastructure",
    status: "learning",
    level: 0.6,
    desc: "Serveur web HTTP.",
    usage: "Hébergement web dans l'infrastructure de services",
    connects: ["php", "linux", "docker", "postfix"],
    projects: ["Network Services"],
  },
  {
    id: "postfix",
    name: "Postfix",
    category: "infrastructure",
    status: "learning",
    level: 0.5,
    desc: "Serveur de messagerie (MTA).",
    usage: "Envoi de courriers dans l'infrastructure",
    connects: ["apache2", "dovecot", "linux"],
    projects: ["Network Services"],
  },
  {
    id: "dovecot",
    name: "Dovecot",
    category: "infrastructure",
    status: "learning",
    level: 0.45,
    desc: "Serveur IMAP/POP3 (MDA).",
    usage: "Reception et lecture de courriers",
    connects: ["postfix", "linux"],
    projects: ["Network Services"],
  },

  // ---------- SECURITY ----------
  {
    id: "opnsense",
    name: "OPNsense",
    category: "security",
    status: "learning",
    level: 0.4,
    desc: "Pare-feu open source et routage sécurisé.",
    usage: "Zones, politiques et segmentation (DMZ)",
    connects: ["suricata", "gns3", "kali"],
    projects: ["Secure Network"],
  },
  {
    id: "suricata",
    name: "Suricata",
    category: "security",
    status: "learning",
    level: 0.4,
    desc: "IDS/IPS par signatures et analyse de trafic.",
    usage: "Détection d'attaques simulées",
    connects: ["opnsense", "kali", "python"],
    projects: ["Secure Network"],
  },

  // ---------- DEVOPS / CLOUD ----------
  {
    id: "prometheus",
    name: "Prometheus",
    category: "devops",
    status: "learning",
    level: 0.35,
    desc: "Collecte de métriques et alerting.",
    usage: "Monitoring des services",
    connects: ["grafana", "docker", "linux"],
    projects: ["Network Services"],
  },
  {
    id: "grafana",
    name: "Grafana",
    category: "devops",
    status: "learning",
    level: 0.35,
    desc: "Visualisation de métriques et dashboards.",
    usage: "Tableaux de bord de supervision",
    connects: ["prometheus", "linux"],
    projects: ["Network Services"],
  },
  {
    id: "cicd",
    name: "CI/CD",
    category: "devops",
    status: "future",
    level: 0.22,
    desc: "Intégration et déploiement continus.",
    usage: "Prochaine étape : automatiser les builds et déploiements",
    connects: ["docker", "git"],
  },
];

export const CAT_ORDER: SkillCategory[] = [
  "software",
  "systems",
  "networking",
  "infrastructure",
  "security",
  "devops",
];
