import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <span>NotFoundPage</span>
            <Link to={"/"}>Back to Home</Link>
        </div>
    );
}
