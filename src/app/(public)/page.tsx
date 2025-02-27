import ClassroomsList from "@/components/app/classroom/ClassroomsList";
import ClassroomForm from "@/components/app/classroom/ClassroomForm";
import PrimaryDialog from "@/components/app/common/PrimaryDialog";

const ClassroomsPage = async () => {
  return (
    <div className="container mx-auto py-10">
      <h1>Classrooms page</h1>

      <div className="my-10">
        <PrimaryDialog
          title="Ajouter une classe"
          textButton="Ajouter une annonce"
        >
          <ClassroomForm className="mt-10" />
        </PrimaryDialog>
      </div>

      <ClassroomsList />
    </div>
  );
};

export default ClassroomsPage;
