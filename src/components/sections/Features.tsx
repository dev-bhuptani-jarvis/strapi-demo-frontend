import {
    FeaturesSection,
    Theme,
} from "../../types/page.types";

type Props = {
    data: FeaturesSection;
    theme: Theme;
};

export default function Features({
    data,
    theme,
}: Props) {
    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2
                        className="text-4xl md:text-5xl font-bold"
                        style={{
                            color:
                                theme.textPrimary,
                        }}
                    >
                        {data.title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.items.map((item) => (
                        <div
                            key={item.id}
                            className="p-8 rounded-3xl border transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            style={{
                                backgroundColor:
                                    theme.secondaryColor,
                                borderColor:
                                    `${theme.primaryColor}20`,
                            }}
                        >
                            <div
                                className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-white text-2xl font-bold"
                                style={{
                                    backgroundColor:
                                        theme.primaryColor,
                                }}
                            >
                                ✦
                            </div>

                            <h3 className="text-2xl font-semibold mb-4">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 leading-7">
                                {item.description ||
                                    "Powerful modern architecture built for scalable applications."}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}