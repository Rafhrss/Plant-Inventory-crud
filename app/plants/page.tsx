import InventoryTable from "@/components/InventoryTable";
import prisma from "@/lib/prisma";

export default async function PlantPage() {
  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <InventoryTable initialData={plants} />
      </div>
    </div>
  );
}