export interface Theme {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textPrimary: string;
}

export interface RichTextChild {
    type: string;
    text: string;
}

export interface RichTextBlock {
    type: string;
    children: RichTextChild[];
}

export interface HeroSection {
    id: number;
    __component: "sections.hero-section";
    title: string;
    subtitle: RichTextBlock[];
}

export interface FeatureItem {
    id: number;
    title: string;
    description: string | null;
}

export interface FeaturesSection {
    id: number;
    __component: "sections.features";
    title: string;
    items: FeatureItem[];
}

export interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

export interface FAQSection {
    id: number;
    __component: "sections.faq";
    title: string;
    items: FAQItem[];
}

export type PageSection =
    | HeroSection
    | FeaturesSection
    | FAQSection;

export interface Page {
    id: number;
    title: string;
    slug: string;
    sections: PageSection[];
}