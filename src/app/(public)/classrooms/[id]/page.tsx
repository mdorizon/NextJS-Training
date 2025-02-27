import ButtonCrudAction from "@/components/app/common/ButtonCrudAction";
import { Metadata } from "next";

interface ClassrommPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/classrooms/${id}`
  );
  const classroom = await res.json();

  return {
    title: classroom.classroomName,
  };
}

const ClassroomPage = async ({ params }: ClassrommPageProps) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/classrooms/${id}`
  );
  const classroom = await res.json();

  return (
    <div className="container mx-auto py-10">
      <h2>{classroom.classroomName}</h2>

      <ButtonCrudAction
        type="button"
        textAction="Supprimer"
        textLoading="Suppression en cours..."
        model="classroom"
        action="remove"
        id={id}
      />

      <p>{classroom.description}</p>
    </div>
  );
};

export default ClassroomPage;
