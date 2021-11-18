import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
    const router = useRouter();

    return (
        <nav>
            <Link href="/">
                <img src="/vercel.svg" alt="icono" />
            </Link>

            <ul>
                <li onClick={() => router.push("/tasks/new")}>
                    crear una nueva tarea
                </li>
            </ul>
        </nav>
    );
}
