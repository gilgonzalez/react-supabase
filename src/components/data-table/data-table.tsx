import React, { useEffect } from 'react';

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowDown, ArrowUp, Columns, DownloadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { cn } from '@/lib/utils';
import { DataTablePagination } from './data-table-pagination';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    tableId: string,
    columnPinning?: {
        left: string[],
        right: string[],
    },
    defaultFilters?: {
        id: string,
        value?: string,
        options: {
            label: string,
            value: string
        }[],
        placeholder?: string,
        defaultValue?: string
    }[]
    canDownload?: boolean
    downloadAction?: () => void
    loading?: boolean
    selectable?: boolean
    onSearch?: (value: string) => void
    onFilterChange?: (value: string) => void
    rowClick?: (row: any) => void
    defaultColumnVisibility?: {
        [key: string]: boolean
    },
    extraButtons?: React.ReactNode
    columnVisibilityButton?: boolean,
  title?: React.ReactNode,
}

export function DataTable<TData, TValue>({
    columns,
    data,
    tableId,
    columnPinning,
    canDownload,
    defaultFilters = [],
    defaultColumnVisibility = {},
    columnVisibilityButton = false,
    downloadAction,
    loading,
    selectable = false,
    onSearch = () => null,
    onFilterChange = () => null,
    rowClick = (ev) => null,
    extraButtons = undefined,
  title = undefined,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>((defaultFilters || []).map(x => ({ id: x.id, value: x.defaultValue || "" })))
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(defaultColumnVisibility)
    const [filter, setFilter] = React.useState("")
    const [rowSelection, setRowSelection] = React.useState({})

    useEffect(() => {
        setColumnFilters(defaultFilters.map(x => ({ id: x.id, value: x.defaultValue || "" })))
        setColumnVisibility(defaultColumnVisibility)
        onFilterChange(defaultFilters[0]?.defaultValue || "")
    }, [tableId])

    const table = useReactTable({
        data,
        columns,
        columnResizeMode: "onChange",
        onGlobalFilterChange: setFilter,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter: filter,
            columnPinning: columnPinning || {
                left: [],
                right: [],
            }
        },
        autoResetPageIndex: false,
        filterFns: undefined
    })

    return (
        <div>
            <div className='flex items-center justify-between px-4'>

                <div className="flex flex-row w-full py-4 space-x-4">

                    {title}

                    <div className='flex flex-row flex-grow space-x-4 items-center'>

                        <Input
                            className=' flex-grow'
                            placeholder="Buscar..."
                            value={filter || ""}
                            onChange={(event) => {
                                table.resetPageIndex()
                                onSearch(event.target.value)
                                setFilter(event.target.value)
                            }}
              />
                        {defaultFilters.map((filter, index) => {
                            return (
                                <Select
                                    key={index}
                                    onValueChange={(ev) => {

                                        const currentFilters = [...(columnFilters || [])]
                                        const currentFilterIndex = currentFilters.findIndex(f => f.id === filter.id)

                                        if (currentFilterIndex !== -1) {
                                            currentFilters[currentFilterIndex].value = ev
                                        } else {
                                            currentFilters.push({
                                                id: filter.id,
                                                value: ev
                                            })
                                        }
                                        setColumnFilters(currentFilters)
                                        onFilterChange(ev)
                                    }}
                                    defaultValue={filter.defaultValue || ""}
                                    //@ts-ignore
                                    value={columnFilters.length > 0 ? columnFilters.find(f => f.id === filter.id)?.value || "" : ""}
                                >
                                    <SelectTrigger className='max-w-sm '>
                                        <SelectValue placeholder={filter.placeholder || "Selecciona..."} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filter.options.map((option, index) => {
                                            return (
                                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>
                                            )
                                        })}
                                    </SelectContent>
                                </Select>
                            )
                        })}
                        <div className='flex flex-row space-x-2'>
                            {canDownload &&
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <Button onClick={downloadAction} variant="default" size="icon" className="px-3">
                                            <DownloadCloud size={20} />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                        <p>Descargar Datos</p>
                                    </TooltipContent>
                                </Tooltip>
                            }

                            {columnVisibilityButton &&
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="default" size="icon" className="px-3">
                                            <Columns size={20} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {table
                                            .getAllColumns()
                                            .filter(
                                                (column) => column.getCanHide()
                                            )
                                            .map((column) => {
                                                return (
                                                    <DropdownMenuCheckboxItem
                                                        key={column.id}
                                                        className="capitalize"
                                                        checked={column.getIsVisible()}
                                                        onCheckedChange={(value) =>
                                                            column.toggleVisibility(!!value)
                                                        }
                                                    >
                                                        {column.columnDef.header.toString() || column.id}
                                                    </DropdownMenuCheckboxItem>
                                                )
                                            })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            }

                            {extraButtons}
                        </div>


                    </div>
                </div>


            </div>


            <div className="border overflow-x-auto">
                <Table
                    style={{
                        width: table.getCenterTotalSize(),
                        minWidth: "100%",
                    }}
                >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="flex flex-row w-full"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={cn(
                                                cn(
                                                    "flex flex-grow px-0 text-[16px] h-8 py-1 bg-white relative bg-green-600 text-color-black",
                                                    header.column.getIsPinned() === "left" ?
                                                        "sticky left-0 z-10" :
                                                        header.column.getIsPinned() === "right" ? "sticky right-0 z-10" :
                                                            ""
                                                ),
                                                //@ts-ignore
                                                header.column.columnDef.meta?.className || ""
                                            )
                                            }
                                            style={{
                                                width: header.column.getSize(),
                                                // maxWidth: header.column.getSize(),
                                            }}
                                        >

                                            {header.column.getCanSort() ? (
                                                <button
                                                    onClick={() => header.column.toggleSorting(header.column.getIsSorted() === "asc")}
                                                    className={"flex flex-row w-full space-x-2 items-center pl-4"}
                                                >
                                                    <span className='truncate'>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
                                                    {!header.column.getIsSorted() ? null : header.column.getIsSorted() === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                                                </button>
                                            ) :
                                                <div className="flex flex-row w-full space-x-2 items-center pl-4">
                                                    <span className='truncate'>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</span>
                                                </div>
                                            }

                                            {header.column.getCanResize() && <div
                                                {...{
                                                    onMouseDown: header.getResizeHandler(),
                                                    onTouchStart: header.getResizeHandler(),
                                                    className: `resizer w-1 h-full bg-green-800 ${header.column.getIsResizing() ? 'bg-green-950' : ''}`,
                                                    style: {
                                                        cursor: "col-resize",
                                                        userSelect: "none",
                                                        touchAction: "none",
                                                        position: "absolute",
                                                        top: 0,
                                                        right: 1,
                                                        zIndex: 10,
                                                    },
                                                }}
                                            />}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={cn("flex flex-row items-center w-full", row.index % 2 === 0 ? "bg-white" : "bg-zinc-50")}
                                    onClick={() => rowClick(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={cn(
                                                    cn(
                                                        `flex flex-grow text-[14px] px-5 py-1 truncate`,
                                                        cell.column.getIsPinned() === "left" ?
                                                            "sticky left-0 z-10" :
                                                            cell.column.getIsPinned() === "right" ?
                                                                "sticky right-0 z-10" :
                                                                ""
                                                    ),
                                                    //@ts-ignore
                                                    cell.column.columnDef.meta?.className || ""
                                                )}
                                                style={{
                                                    width: cell.column.getSize(),
                                                    // maxWidth: cell.column.getSize(),
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns?.length || 0} className="h-24 text-center">
                                    {loading ? "Cargando Datos..." : "Sin Datos"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} selectable={selectable} />

        </div>

    )
}
