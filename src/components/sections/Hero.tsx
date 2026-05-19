import {
    HeroSection,
    Theme,
} from "../../types/page.types";

import { richTextToPlainText } from "../../utils/richText";

type Props = {
    data: HeroSection;
    theme: Theme;
};

export default function Hero({
    data,
    theme,
}: Props) {
    return (
        <section
            className="py-32"
            style={{
                background:
                    `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
                color: "#fff",
            }}
        >
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                    {data.title}
                </h1>

                <p className="text-lg md:text-2xl opacity-90 max-w-3xl mx-auto">
                    {richTextToPlainText(
                        data.subtitle
                    )}
                </p>

                <button
                    className="mt-10 px-8 py-4 rounded-full text-lg font-semibold transition hover:scale-105"
                    style={{
                        backgroundColor: "#fff",
                        color: theme.primaryColor,
                    }}
                >
                    Get Started
                </button>
            </div>
        </section>
    );
}