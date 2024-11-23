import { db } from "@/lib/db";
import { getEmailsSchema, mailSchema } from "@/schema";
import { MailResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ employeeId: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const { employeeId } = await params;

  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "30", 10);

    const mails = await db.mail.findMany({
      where: { employeeId },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        from: true,
        to: true,
        body: true,
        subject: true,
        createdAt: true,
        category: {
          select: {
            name: true,
            color: true,
          },
        },
        thread: {
          select: {
            content: true,
            createdAt: true,
            updatedAt: true,
            id: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // console.log(mails);

    const formattedMails: MailResponse[] = mails.map((mail) => ({
      from: mail.from,
      to: mail.to,
      body: mail.body,
      subject: mail.subject,
      thread: mail.thread,
      status: mail.category.name,
      color: mail.category.color.toString(16),
      createdAt: mail.createdAt,
    }));

    return NextResponse.json(formattedMails);
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
