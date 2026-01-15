/**
 * API client for communicating with the FastAPI backend
 */

// In production, use relative paths (same domain, handled by Vercel)
// In development, use the configured API URL or default to localhost
const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
    ? '' // Use relative paths in production (Vercel routes /api/* to backend)
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');

export interface ChatResponse {
  reply: string;
}

/**
 * Sends a chat message to the backend API
 * @param message - The user's message to send
 * @returns The assistant's reply
 * @throws Error if the API call fails
 */
export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `API request failed with status ${response.status}`
      );
    }

    const data: ChatResponse = await response.json();
    return data.reply;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to send message');
  }
}
