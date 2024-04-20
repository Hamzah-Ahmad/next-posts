import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "User Not Authenticated" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: "API called successfully" },
    { status: 200 }
  );
}
