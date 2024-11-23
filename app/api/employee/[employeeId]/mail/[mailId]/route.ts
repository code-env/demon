import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ employeeId: string; mailId: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const { employeeId, mailId } = await params;
  try {
    const mail = await db.mail.findUnique({
      where: { id: mailId, employeeId },
    });

    if (!mail) {
      return NextResponse.json({ message: "Mail not found" }, { status: 404 });
    }

    return NextResponse.json(mail);
  } catch (error: any) {
    console.error("[MAIL_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { employeeId, mailId } = await params;

  try {
    await db.mail.delete({
      where: { id: mailId, employeeId },
    });

    return NextResponse.json({ message: "Mail deleted" });
  } catch (error: any) {
    console.error("[MAIL_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
