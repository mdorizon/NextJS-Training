"use client";

import { Input } from "@/components/ui/input";
import { Classroom } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import FormErrorMessage from "../common/FormErrorMessage";
import ButtonCrudAction from "../common/ButtonCrudAction";

interface ClassroomFormProps {
  className?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClassroomForm = ({ className, setOpen }: ClassroomFormProps) => {
  const methods = useForm<Classroom>();

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form className={`${className} flex flex-col gap-2`}>
        <Input
          type="text"
          placeholder="Entrez votre nom de classe"
          {...register("classroomName", {
            required: "Le titre est obligatoire",
          })}
        />
        {errors.classroomName && (
          <FormErrorMessage message={errors.classroomName.message as string} />
        )}

        <Input
          placeholder="Entrez votre description de classe"
          type="text"
          {...register("description")}
        />

        <ButtonCrudAction
          type="submit"
          textAction="Ajouter"
          textLoading="Ajout en cours..."
          variant="default"
          model="classroom"
          action="create"
          setOpen={setOpen}
        />
      </form>
    </FormProvider>
  );
};

export default ClassroomForm;
