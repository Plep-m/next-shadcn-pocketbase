import PocketBase from 'pocketbase'
import 'dotenv/config'

const pocket = new PocketBase(process.env.POCKETBASE_HOST)

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
    const data = await request.json();
   
    try {
        const authData = await pocket.collection('users').authWithPassword(
            data.email,
            data.password,
        );

        // If authentication is successful, return the token
        return new Response(JSON.stringify(pocket.authStore.token))
    } catch (error) {
        // If authentication fails, return the error message
        return new Response(JSON.stringify({ code: 400, message: 'Failed to authenticate.', data: {} }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}