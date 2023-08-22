import { prisma } from "../../../lib/prisma";
import { NextResponse } from 'next/server'
 

export async function main() {
    try {
      await prisma.$connect();
    } catch (err) {
      return Error("Database Connection Unsuccessull");
    }
  }

export async function POST( req: Request, res: NextResponse ) {
    
    
    try{
        const {title, content} = await req.json();
        await main();
        await prisma.note.create({
            data: {
                title,
                content
            }
        })
        return NextResponse.json('Note created!', {status: 200,})
    } catch(error){
        console.log("failure");
    }finally {
              await prisma.$disconnect();
            }
  const data = await res.json()
  return NextResponse.json(data)
}   

  
  export const GET = async (req: Request, res: NextResponse) => {
    try {
      await main();
      const posts = await prisma.note.findMany();
      return NextResponse.json({ message: "Success", posts }, { status: 200 });
    } catch (err) {
      return NextResponse.json({ message: "Error", err }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
