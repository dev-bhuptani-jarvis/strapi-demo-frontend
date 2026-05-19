import {
    FAQSection,
    Theme,
} from "../../types/page.types";

type Props = {
    data: FAQSection;
    theme: Theme;
};

export default function FAQ({
    data,
    theme,
}: Props) {
    return (
        <section
            className="py-24"
            style={{
                backgroundColor:
                    theme.secondaryColor,
            }}
        >
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-bold">
                        {data.title}
                    </h2>
                </div>

                <div className="space-y-6">
                    {data.items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl p-8 shadow-sm border"
                            style={{
                                borderColor:
                                    `${theme.primaryColor}15`,
                            }}
                        >
                            <h3
                                className="text-xl font-semibold mb-4"
                                style={{
                                    color:
                                        theme.primaryColor,
                                }}
                            >
                                {item.question}
                            </h3>

                            <p className="text-gray-600 leading-7">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}