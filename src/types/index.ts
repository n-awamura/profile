export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface TimelineItem {
  period: string;
  company: string;
  companyUrl: string;
  isCurrent?: boolean;
  showConnector?: boolean;
}

export interface TimelineOther {
  title: string;
  descriptions: string[];
}

export type BlogEntryType = "note" | "article";

export interface BlogEntry {
  id: string;
  title: string;
  type: BlogEntryType;
  link: string;
  description: string[];
  noteId?: string;
  noteHeight?: number;
  image?: {
    src: string;
    alt: string;
  };
}

export interface LifeSectionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface LifeSectionNote {
  noteId: string;
  height?: number;
}

export interface LifeSection {
  id: string;
  title: string;
  descriptions: string[];
  noteEmbeds?: LifeSectionNote[];
  image?: LifeSectionImage;
  secondaryImage?: LifeSectionImage;
}



