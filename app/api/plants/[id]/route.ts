// app/api/plants/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  // Di Next.js terbaru, params adalah Promise
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const body = await req.json();
    
    // UNWRAP (Buka) params-nya dulu dengan await
    const { id } = await params; 

    const updatedPlant = await prisma.plant.update({
      where: { 
        id: id // Sekarang 'id' sudah benar-benar berupa string
      },
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        stock: Number(body.stock),
        price: Number(body.price),
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(updatedPlant, { status: 200 });
  } catch (error) {
    // Log ini akan muncul di terminal jika ada error Prisma (misal: ID tidak ditemukan)
    console.error("Update error detail:", error); 
    return new NextResponse("Failed to update plant", { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.plant.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Plant deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return new NextResponse("Failed to delete plant", { status: 500 });
  }
}