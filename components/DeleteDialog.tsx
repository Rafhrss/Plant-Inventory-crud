"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteDialogProps {
  plant: {
    id: string;
    name: string;
  };
}

export default function DeleteDialog({ plant }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Memanggil API Route yang sudah kita buat sebelumnya
      const response = await fetch(`/api/plants/${plant.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success(`${plant.name} deleted successfully`);
        router.refresh(); // Memaksa tabel update data terbaru
        setOpen(false);   // Menutup modal otomatis
      } else {
        const errorData = await response.text();
        console.error("Server error:", errorData);
        toast.error("Failed to delete plant from server");
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Something went wrong. Check your connection.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {/* Tombol pemicu di tabel */}
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            This action cannot be undone. This will permanently delete 
            <strong className="mx-1">{plant.name}</strong> 
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          {/* Menggunakan Button biasa agar tidak bentrok dengan logic form di modal lain */}
          <Button 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}