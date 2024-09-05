'use client'

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  type TableOptions,
} from '@tanstack/react-table'
import { Fragment, createContext, useContext } from 'react'

interface Props<T> extends Omit<TableOptions<T>, 'getCoreRowModel'> {
  emptyMessageComponent: () => JSX.Element | null
}

interface IContextProps {
  columnsLength: number
}

const ctx = createContext({} as IContextProps)

export const useCtx = () => useContext(ctx)

export function Content<T>({
  data,
  columns,
  emptyMessageComponent,
  ...props
}: Props<T>) {
  const table = useReactTable({
    ...props,
    data,
    columns,
    enableHiding: true,
    enableSortingRemoval: false,
    enableMultiSort: true,
    isMultiSortEvent: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      minSize: 0,
      size: Number.MAX_SAFE_INTEGER,
      maxSize: Number.MAX_SAFE_INTEGER,
    },
  })

  const rowsLength = data.length

  const hasRows = rowsLength > 0

  const columnsLength = columns.length

  const allColumnsWithoutHeader = columns.every((column) => !column.header)

  return (
    <div className="rounded-md border">
      <table className="w-full table-fixed border-spacing-0">
        <thead data-hidden={allColumnsWithoutHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Fragment key={header.id}>
                    {header.isPlaceholder || allColumnsWithoutHeader
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Fragment>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {hasRows &&
            table.getRowModel().rows.map((row) => {
              return (
                <Fragment key={row.id}>
                  <tr className="group border-b last:border-none">
                    {row.getVisibleCells().map((cell) => (
                      <Fragment key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Fragment>
                    ))}
                  </tr>
                </Fragment>
              )
            })}

          {!hasRows && emptyMessageComponent && (
            <ctx.Provider value={{ columnsLength }}>
              <tr>{emptyMessageComponent()}</tr>
            </ctx.Provider>
          )}
        </tbody>
      </table>
    </div>
  )
}
