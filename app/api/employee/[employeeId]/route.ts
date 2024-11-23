import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  params: Promise<{ employeeId: string }>;
}

export async function GET(request: Request, { params }: Params) {
  const { employeeId } = await params;

  try {
    const employee = await db.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error: any) {
    console.error("[EMPLOYEE_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const { employeeId } = await params;

  try {
    const employee = await db.employee.delete({
      where: { id: employeeId },
    });

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("[EMPLOYEE_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
