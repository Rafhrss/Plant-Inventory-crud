"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";
import { Button } from "./ui/button";
import EditDialog from "./EditDialog";
import CreateDialog from "./CreateDialog";
import DeleteDialog from "./DeleteDialog";

interface Plant {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export default function InventoryTable({initialData} : {initialData: Plant[] }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input placeholder="Filter plants..."
          className="pl-10" />

          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2"/>
        </div>
        <Combobox value={selectedCategory} onChange={(val) => setSelectedCategory(val)}/>
          <Button variant="default" className="cursor-pointer ml-auto font-bold flex items-center gap-2">
            <CreateDialog/>
          </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                No Plants Found. Try adding some !
              </TableCell>
            </TableRow>
          ) : (
          initialData.map((plant) => (
            <TableRow key={plant.id}>
              <TableCell className="font-mono text-xs">{plant.id.slice(0,5)}</TableCell>
              <TableCell>{plant.name}</TableCell>
              <TableCell>{plant.category}</TableCell>
              <TableCell>{plant.price.toLocaleString()}</TableCell>
              <TableCell className="font-bold">{plant.stock}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-4">
                  <EditDialog plant={plant}/>
                  <DeleteDialog plant={plant}/>
                </div>
              </TableCell>
            </TableRow>
          ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}