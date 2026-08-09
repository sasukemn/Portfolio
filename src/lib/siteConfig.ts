// ============================================================
// SITE CONFIG — Toute la présentation personnelle est centralisée
// ici. Modifiez ce fichier pour mettre à jour l'identité, le
// contact, l'environnement, le statut et la direction.
// ============================================================

export type StatusState = "active" | "learning" | "future";
export type CertStatus = "completed" | "in-progress" | "planned";

export const IDENTITY = {
  firstName: "Manitra Niaina",
  lastName: "Ravalison",
  displayName: "Manitra Niaina Ravalison",
  monogram: "MR",
  role: "Software Developer",
  roleSecondary: "Systems & Networking Student",
  direction: "Building my path toward DevOps & Cloud Engineering.",
  slogan:
    "I build software, explore systems and networks, and learn how they work together.",
  tagline:
    "Je développe des logiciels, j'explore les systèmes et les réseaux, et je construis progressivement mon chemin vers le DevOps et le Cloud.",
  // Présentation courte — texte temporaire, à remplacer plus tard facilement.
  presentation:
    "Je développe des logiciels, j'explore les systèmes et les réseaux, et je construis progressivement mon parcours vers l'infrastructure et le DevOps.",
  location: "Fianarantsoa, Madagascar", // ex: "Antananarivo, Madagascar" — affiché seulement si non vide
};

export const EDUCATION = {
  school: "École Nationale d'Informatique",
  abbreviation: "ENI",
  city: "Fianarantsoa",
  program: "Informatique",
  level: "L2",
};

export const FOCUS: { n: string; label: string; note: string }[] = [
  { n: "01", label: "Software Development", note: "applications web & desktop" },
  { n: "02", label: "Networking & Infrastructure", note: "laboratoire GNS3 · protocoles" },
  { n: "03", label: "Linux & Virtualization", note: "Kali · KVM · services" },
  { n: "04", label: "DevOps Fundamentals", note: "CI/CD · automatisation" },
  { n: "05", label: "Cisco Networking", note: "routage · commutation" },
];

export const ABOUT = {
  intro:
    "Je suis étudiant en développement logiciel et systèmes/réseaux. J'aime comprendre comment les applications fonctionnent de bout en bout, depuis le code jusqu'à l'environnement dans lequel elles s'exécutent.",
  detail:
    "À travers mes projets en développement, réseaux, systèmes et infrastructure, je construis progressivement mon expertise avec l'objectif d'évoluer vers le DevOps et le Cloud.",
  mainTech: [
    "PHP",
    "React",
    "Node.js",
    "Java",
    "JavaFX",
    "C#",
    "Avalonia",
    "JavaScript",
    "Python",
    "C/C++",
    "Linux",
    "Docker",
    "KVM",
    "GNS3",
  ],
};

export const CONTACT = {
  phone: "0344809243",
  phoneDisplay: "034 48 092 43",
  phoneHref: "tel:+0344809243",
  email: "sasukemnuchiha@gmail.com",
  github: "sasukemn",
  githubUrl: "https://github.com/sasukemn",
  linkedin: "sasuke-manitra-niaina-306291395",
  linkedinUrl: "https://mg.linkedin.com/in/sasuke-manitra-niaina-306291395",
  calendly: "", // non fourni
  cv: {
    available: true,
    items: [
      { label: "CV Développeur", href: "/CV_DEV.pdf" },
      { label: "CV Réseau", href: "/CV_RES.pdf" },
    ],
  },
  note: "Disponible pour échanger sur les systèmes, les réseaux et le développement.",
};

export const ENVIRONMENT = [
  { label: "OS", value: "Kali Linux" },
  { label: "Editor", value: "VS Code" },
  { label: "Virtualization", value: "KVM" },
  { label: "Network Lab", value: "GNS3" },
  { label: "Version Control", value: "Git / GitHub" },
];

export const STATUS_ROW: { label: string; state: StatusState }[] = [
  { label: "Software", state: "active" },
  { label: "Systems", state: "active" },
  { label: "Networking", state: "active" },
  { label: "Infrastructure", state: "learning" },
  { label: "DevOps", state: "learning" },
  { label: "Cloud", state: "future" },
];

export const LEARNING_PATH: { key: string; label: string; state: StatusState; note: string }[] = [
  { key: "software", label: "Software", state: "active", note: "Ce que je développe au quotidien" },
  { key: "networking", label: "Networking", state: "active", note: "Routeurs, protocoles, laboratoire GNS3" },
  { key: "systems", label: "Systems", state: "active", note: "Linux, virtualisation, services" },
  { key: "infrastructure", label: "Infrastructure", state: "learning", note: "Serveurs, services réseau, conteneurs" },
  { key: "devops", label: "DevOps", state: "learning", note: "CI/CD, automatisation, monitoring" },
  { key: "cloud", label: "Cloud", state: "future", note: "Prochaine étape du parcours" },
];

export const CERTIFICATIONS: {
  id: string;
  name: string;
  issuer: string;
  status: CertStatus;
  note: string;
  earned?: string;
}[] = [
  {
    id: "cisco-networking",
    name: "Cisco Networking",
    issuer: "Cisco Networking Academy",
    status: "in-progress",
    note: "Apprentissage en cours : réseaux, routage et commutation.",
  },
];
