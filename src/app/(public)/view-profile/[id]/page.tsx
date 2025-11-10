import ConsultantDetails from './_component/ViewProfile.componenet'

export default function ViewProfilePage({ params }: { params: { id: string } }) {
  return (
    <div>
      <ConsultantDetails id={params.id} />
    </div>
  )
}
