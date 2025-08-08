import { GameDig } from "gamedig";

const GAME_TYPE_MAP = {
    cs2: "counterstrike2",
    csgo: "csgo",
    minecraft: "minecraft",
    tf2: "tf2",
    unturned: "unturned",
    rust: "rust",
    ark: "ark",
    // Add more mappings as needed
};

export default async function Query(game, serverip, serverport, queryport) {
    const type = GAME_TYPE_MAP[game] || game;
    try {
        const response = GameDig.query({
            type,
            host: serverip,
            port: queryport || serverport,
        });
        return response;
    } catch (error) {
        console.error(`Error querying ${game}:`, error);
        return { error: 'Query failed', details: error.message };
    }
}

