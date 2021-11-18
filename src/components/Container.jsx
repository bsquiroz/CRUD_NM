import styles from "styles/container.module.css";
import Navbar from "./Navbar";

export default function Container({ children }) {
    return (
        <div className={styles.containerStyle}>
            <Navbar />
            {children}
        </div>
    );
}
