import app from "./src/app";
import { connectDB } from "./src/config/database";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("✅ server is running on port:", PORT);
    });
}).catch((error) => {
    console.error("failed to start server:", error);
    process.exit(1);

});
