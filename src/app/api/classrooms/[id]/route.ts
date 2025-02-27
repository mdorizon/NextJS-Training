import { IParams } from "@/types/api.type";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: IParams) {
  console.log("GET ONE classroom");
  console.log("GET req", req);
  const { id } = await params;

  try {
    const classroom = await prisma.classroom.findUnique({
      where: {
        id: id,
      },
    });

    if (!classroom) {
      return NextResponse.json(
        { error: "Classroom not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(classroom, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: IParams) {
  console.log("DELETE ONE classroom");
  console.log("DELETE req", req);
  const { id } = await params;

  try {
    const classroom = await prisma.classroom.delete({
      where: {
        id: id,
      },
    });
    if (!classroom) {
      return NextResponse.json(
        { error: "Classroom not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(classroom, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
