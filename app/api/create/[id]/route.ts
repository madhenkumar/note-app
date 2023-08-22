import { NextResponse } from "next/server";
import { main } from "../route";
import prisma from "@/prisma";

export const GET = async (req: Request, {params}: {params: {id: string}}, res: NextResponse) => {
  try {
    await main();
    const post = await prisma.note.findFirst({ where: { 
      id: Number(params.id),
    } });
    if (!post)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, {params}: {params: {id: string}}, res: NextResponse) => {
  try {
    const { title, content } = await req.json();
    await main();       
    const post = await prisma.note.update({
      data: { title, content },
      where: { id: Number(params.id), },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, {params}: {params: {id: string}}, res: NextResponse) => {
  try {
    await main();
    const post = await prisma.note.delete({ where: { id: Number(params.id), } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
