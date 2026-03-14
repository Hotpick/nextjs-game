import { NextResponse } from "next/server";

import { resolvers } from "@/lib/graphql/resolvers";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { query: string };

    if (!body.query.includes("questions")) {
      return NextResponse.json(
        { errors: [{ message: "Unknown query" }] },
        { status: 400 },
      );
    }

    return NextResponse.json({
      data: { questions: resolvers.Query.questions() },
    });
  } catch (error) {
    return NextResponse.json(
      {
        errors: [
          { message: error instanceof Error ? error.message : "Unknown error" },
        ],
      },
      { status: 400 },
    );
  }
}
