import { db } from "@/lib/db";
import { mailSchema } from "@/schema";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ employeeId: string }>;
}

export async function GET(request: Request, { params }: Params) {
  const { employeeId } = await params;

  try {
    const mails = await db.mail.findMany({
      where: { employeeId },
    });

    return NextResponse.json(mails);
  } catch (error: any) {
    console.error("[EMPLOYEE_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: Params) {
  const { employeeId } = await params;

  try {
    const body = await request.json();
    const validatedData = mailSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const mail = await db.mail.create({
      data: { ...validatedData.data, employeeId },
    });

    return NextResponse.json(mail);
  } catch (error: any) {
    console.error("[EMPLOYEE_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
