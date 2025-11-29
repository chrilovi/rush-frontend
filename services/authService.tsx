// Definiamo i tipi per i dati in ingresso e in uscita
export interface UserData {
    id: string;
    email: string;
    name?: string;
}

export interface AuthResponse {
    token: string;
    user: UserData;
}

// Recuperiamo l'URL dal file .env
// Nota: In Expo, process.env.EXPO_PUBLIC_... è disponibile globalmente
const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
    console.warn("ATTENZIONE: EXPO_PUBLIC_API_URL non è definito nel file .env");
}

/**
 * Funzione generica per gestire le chiamate fetch ed eventuali errori HTTP
 */
async function handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    if (!response.ok) {
        // Lancia un errore con il messaggio del server o uno generico
        throw new Error(data.message || `Errore HTTP: ${response.status}`);
    }
    
    return data as T;
}

export const authService = {
    /**
     * Effettua il login
     */
    login: async (email: string, password: string): Promise<AuthResponse> => {
        

        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse<AuthResponse>(response);

    },

    /**
     * Effettua la registrazione
     */
    register: async (email: string, password: string): Promise<AuthResponse> => {
        
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse<AuthResponse>(response);
       
    }
};