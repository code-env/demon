import { db } from "@/lib/db";
import { parseColor } from "@/lib/utils";
import { categorySchema } from "@/schema";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categories = await db.category.findMany();

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("[CATEGORY_ERROR]", error.message);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedBody = categorySchema.safeParse(body);

    if (!validatedBody.success) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { name, color } = validatedBody.data;

    const category = await db.category.create({
      data: { name, color: parseColor(color as string) },
    });
    return NextResponse.json(category);
  } catch (error: any) {
    console.error("[CATEGORY_ERROR]", error.message);
    return new NextResponse("Internal error", { status: 500 });
  }
}
