import { useEffect, useState } from "react";

export default function SharePage() {
    const [data, setData] = useState<{
        title: string;
        text: string;
        url: string;
    } | null>(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const title = queryParams.get("title");
        const text = queryParams.get("text");
        // const url = queryParams.get("url");
        setData({
            title: title || "",
            text: "",
            url: text || "",
        });
    }, []);

    console.log(data)

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-3xl font-bold">SharePage</div>

            <div className="mt-4">
                {data?.title ? (
                    <>
                        <h1 className="text-xl">Shared Content</h1>
                        <div>
                            <h2>{data.title}</h2>
                            <p>{data.text}</p>
                            <a href={data.url}>{data.url}</a>
                        </div>
                    </>
                ) : (
                    <p>No shared content available.</p>
                )}
            </div>
        </div>
    );
}
