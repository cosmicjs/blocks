import { cosmic } from "@/cosmic/client"
import {
  Pagination as PaginationComp,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/cosmic/elements/Pagination"

export async function Pagination({
  query,
  path,
  limit,
  page,
  className,
}: {
  query: any
  path?: string
  limit: number
  page: number
  className?: string
}) {
  const { total } = await cosmic.objects.find(query).props("id").limit(1)
  const hasNext = page * limit < total || (!page && total)
  const hasPrev = page && page !== 1
  if (!hasPrev && !hasNext) return <></>
  return (
    <PaginationComp className={className}>
      <PaginationContent>
        {hasPrev ? (
          <PaginationItem>
            <PaginationPrevious
              href={page === 2 ? path : `${path}?page=${page - 1}`}
            />
          </PaginationItem>
        ) : (
          ""
        )}
        <PaginationItem>{page || 1}</PaginationItem>
        {hasNext && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`${path}?page=${!page ? 2 : page + 1}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </PaginationComp>
  )
}
