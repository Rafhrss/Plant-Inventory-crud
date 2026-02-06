import InventoryTable from "@/components/InventoryTable";

export default async function PlantPage() {

  return (
    <>
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <InventoryTable  />
          </div>
        </div>
    </>
  );
}