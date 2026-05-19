import Hero from "./sections/Hero";
import Features from "./sections/Features";
import FAQ from "./sections/FAQ";

import {
    PageSection,
    Theme,
} from "../types/page.types";

type Props = {
    sections: PageSection[];
    theme: Theme;
};

const componentMap = {
    "sections.hero-section": Hero,
    "sections.features": Features,
    "sections.faq": FAQ,
};

export default function DynamicZone({
    sections,
    theme,
}: Props) {
    return (
        <>
            {sections.map((section, index) => {
                const Component =
                    componentMap[
                    section.__component
                    ];

                if (!Component) return null;

                return (
                    <Component
                        key={`${section.__component}-${section.id}-${index}`}
                        data={section as never}
                        theme={theme}
                    />
                );
            })}
        </>
    );
}