// export interface InvoiceBoxProps {
//   consultantId: number
// }

// /* ----------------------------- INVOICE COMPONENT ----------------------------- */

// export function InvoiceBox({ consultantId }: InvoiceBoxProps) {
//   const { data: consultantsData, isLoading } = useConsultantsQuery({ page: 1, limit: 50 })
//   const { data: currencies } = useCurrenciesQuery()

//   const consultant = useMemo(() => consultantsData?.list.find((c) => c.id === consultantId), [consultantsData, consultantId])

//   if (isLoading) {
//     return <Card className="p-4 text-sm text-muted-foreground">Loading fees…</Card>
//   }

//   if (!consultant) {
//     return <Card className="p-4 text-sm text-muted-foreground">Fee info unavailabledddd</Card>
//   }

//   const rateSource = consultant.profile?.hourlyRate ?? null
//   const hourlyRate = rateSource ? parseFloat(rateSource) : null
//   if (!hourlyRate) {
//     return <Card className="p-4 text-sm text-muted-foreground">Fee info unavailable</Card>
//   }

//   const currencyId = consultant.profile?.currencyId
//   const currencySymbol = consultant.currency?.symbol || currencies?.find((c) => c.id === currencyId)?.symbol || ''

//   const platformFee = hourlyRate * 0.1
//   const total = hourlyRate + platformFee

//   return (
//     <Card className="p-4 border border-border shadow-sm mt-4">
//       <div className="flex justify-between text-sm mb-2">
//         <span className="text-muted-foreground">Booking Fee</span>
//         <span className="font-medium">
//           {currencySymbol}
//           {hourlyRate.toFixed(2)}
//         </span>
//       </div>

//       <div className="flex justify-between text-sm mb-2">
//         <span className="text-muted-foreground">Platform Fee (10%)</span>
//         <span className="font-medium">
//           {currencySymbol}
//           {platformFee.toFixed(2)}
//         </span>
//       </div>

//       <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-base">
//         <span>Total Amount</span>
//         <span>
//           {currencySymbol}
//           {total.toFixed(2)}
//         </span>
//       </div>
//     </Card>
//   )
// }
