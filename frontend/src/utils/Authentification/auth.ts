import { get, UserType } from "../axios";

export async function getUser() {
    try {
        const response = await get("/api-token-auth");
        return response.data; // username, password, token
    } catch (error) {
        console.error("Failed to get user:", error);
    }
}