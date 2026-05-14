export type Project = {
  slug: string;
  title: string;
  location: string;
  clientType: string;
  solution: string;
  outcome: string;
  pumpsUsed: string[];
  imagePath?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "hotel-pressure-boosting-bangalore",
    title: "VFD Booster System for Luxury Hotel in Bangalore",
    location: "MG Road, Bangalore",
    clientType: "Hospitality",
    solution: "Installed a quad-pump Berlington Hydro-Booster system with integrated VFD controls to replace an aging constant-speed system.",
    outcome: "Reduced energy consumption by 38% and eliminated guest complaints regarding water pressure fluctuations during peak morning hours.",
    pumpsUsed: ["hydro", "cdl-cdlf"]
  },
  {
    slug: "stp-installation-mysore",
    title: "STP Pump Upgrade for Manufacturing Plant in Mysore",
    location: "Hebbal Industrial Area, Mysore",
    clientType: "Industrial Manufacturing",
    solution: "Supplied and commissioned heavy-duty WQ series submersible sewage pumps for a new 100 KLD sewage treatment plant.",
    outcome: "Achieved zero-clog operation during the first 12 months of service and met KSPCB compliance standards for wastewater movement.",
    pumpsUsed: ["wq"]
  }
];

export type Service = {
  slug: string;
  title: string;
  description: string;
  features: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "pump-maintenance-bangalore",
    title: "Industrial Pump Maintenance & AMC in Bangalore",
    description: "Comprehensive preventive maintenance and Annual Maintenance Contracts (AMC) for Berlington and other industrial pump brands in Karnataka.",
    features: [
      "Scheduled preventive checks to avoid breakdown",
      "Vibration analysis and noise assessment",
      "Seal and bearing replacement on-site",
      "Efficiency auditing and optimization"
    ]
  },
  {
    slug: "engineering-consultation",
    title: "Pump Selection & Engineering Consultation",
    description: "Technical support for consultants and EPC teams for correct pump sizing, material selection, and system design.",
    features: [
      "Duty point analysis and pump curve matching",
      "NPSH calculations for critical suction cases",
      "Material compatibility review for chemical duty",
      "Energy efficiency projections"
    ]
  }
];
