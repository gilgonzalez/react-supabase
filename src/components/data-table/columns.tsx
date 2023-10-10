
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tables } from "@/supabase/utility.types";
import { Button } from "../ui/button";

type Player = Tables<"jugadores">

export const columns: ColumnDef<Player>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={table.getIsAllPageRowsSelected()}
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //             className="ml-4"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             onClick={(ev) => ev.stopPropagation()}
    //             aria-label="Select row"
    //             className="ml-4"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "name",
        cell: ({ row }) => <span className="pl-4">{row.getValue("name")}</span>,
        header: ({ column }) => {
            return (
                <button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="flex flex-row w-full space-x-2 items-center pl-4">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Name</span>
                </button>
            )
        },
    },
    {
        accessorKey: "active",
        header: "Activo",
        cell: ({ row }) => {
            const rowValue = row.original.active;
            return (
                <Badge variant={rowValue ? "active": "inactive"}
                // className={row.getValue("status") === "published" ? "bg-emerald-500 text-white" : ""}
                >
                    {rowValue ? "Activo" : "Inactivo"}
                </Badge>
            )
        }
    },
    {
        accessorKey: "created_at",
        header: "Fecha de creación",
        cell: ({row}) => {
            const rowValue = new Date(row.original.created_at);
            return (
                <p> {rowValue.toLocaleDateString()} </p>
            )
        }
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: () => {
          
          return (
            <div className="flex flex-row space-x-2">
              <Button size={"sm"} variant={"secondary"}>Editar</Button>
              <Button size={"sm"} variant={"destructive"}>Eliminar</Button>
            </div>
          )
      }
  },
]
