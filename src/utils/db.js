import { connect, connection } from "mongoose";

const conn = {
    isConnected: false,
};

export async function dbConnect() {
    if (conn.isConected) return;

    const db = await connect(process.env.MONGODB_URL);

    conn.isConnected = db.connections[0].readyState;
}

connection.on("connected", () => {
    console.log("Mongodb connected to db");
});

connection.on("error", (err) => {
    console.error("Mongodb connected to", err.message);
});
