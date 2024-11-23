import { db } from "@/lib/db";
import { parseColor } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ categoryId: string }>;
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { categoryId } = await params;
  try {
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }
    await db.category.delete({ where: { id: categoryId } });
    return NextResponse.json({ message: "Category deleted" });
  } catch (error: any) {
    console.error("[CATEGORY_ERROR]", error.message);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { categoryId } = await params;
    const body = await req.json();

    const category = await db.category.update({
      where: { id: categoryId },
      data: {
        ...body,
        color: parseColor(body.color as string),
      },
    });
    return NextResponse.json(category);
  } catch (error: any) {
    console.error("[CATEGORY_ERROR]", error.message);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  const { categoryId } = await params;
  try {
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("[CATEGORY_ERROR]", error.message);
    return new NextResponse("Internal error", { status: 500 });
  }
}
