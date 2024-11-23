import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { employeeSchema } from "@/schema";

export async function GET(request: Request) {
  try {
    const employees = await db.employee.findMany();

    return NextResponse.json(employees);
  } catch (error: any) {
    console.error("[EMPLOYEE_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = employeeSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    console.log(validatedData.data);

    const existingEmployee = await db.employee.findUnique({
      where: {
        email: validatedData.data.email,
      },
    });

    if (existingEmployee) {
      return NextResponse.json(
        { message: "Employee already exists" },
        { status: 400 }
      );
    }

    const employee = await db.employee.create({
      data: validatedData.data,
    });

    return NextResponse.json(employee);
  } catch (error: any) {
    console.log("[EMPLOYEE_ERROR]", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
