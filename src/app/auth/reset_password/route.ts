import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
	// The `/auth/callback` route is required for the server-side auth flow implemented
	// by the `@supabase/ssr` package. It exchanges an auth code for the user's session.
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabase = createClient();

		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (error) {
			return NextResponse.redirect(`${origin}/error`);
		}
	}

	// URL to redirect to after sign in process completes
	return NextResponse.redirect(`${origin}/nice`);
}
