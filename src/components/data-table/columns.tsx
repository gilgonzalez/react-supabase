
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    status: "pending" | "processing" | "success" | "failed"
    email: string
    activo: boolean
    created_at: Date
}

export const columns: ColumnDef<Payment>[] = [
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
        accessorKey: "activo",
        header: "Activo",
        cell: ({ row }) => {
            const rowValue = row.original.activo;
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
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex justify-end items-end">
                    <Button variant={"outline"} size={"sm"}>
                        Edit
                    </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Course</DropdownMenuItem>
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            )
        },
    }
]
