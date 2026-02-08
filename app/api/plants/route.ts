import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const plant = await prisma.plant.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        stock: Number(body.stock), // Pastikan jadi angka
        price: Number(body.price), // Pastikan jadi angka
        imageUrl: body.imageUrl,
      },
    });

    return new Response(JSON.stringify(plant), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create plant", { status: 500 });
  }
}
