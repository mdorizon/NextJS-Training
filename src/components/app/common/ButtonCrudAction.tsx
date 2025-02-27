"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import ClassroomService from "@/services/classroom.service";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClassroomButtonCrudActionDTO } from "@/types/classroom.type";

interface ButtonCrudActionProps {
  type: "submit" | "button";
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  textAction?: string;
  textLoading?: string;
  model: "classroom";
  action: "create" | "remove";
  id?: string;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModelService = {
  classroom: ClassroomService,
};

const ButtonCrudAction = ({
  className,
  type,
  textLoading,
  textAction,
  variant = "default",
  model,
  action,
  id,
  setOpen,
}: ButtonCrudActionProps) => {
  const queryClient = useQueryClient();
  const formContext = useFormContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: ClassroomButtonCrudActionDTO) => {
      console.log("mutationFn", data);
      if (action === "remove") {
        if (!id)
          throw new Error("L'identifiant est requis pour la suppression");
        console.log("Suppression avec id:", id);
        return ModelService[model].remove({ id });
      }
      return ModelService[model].create(data);
    },
    onSuccess: (data) => {
      console.log("success", data);
      queryClient.invalidateQueries({ queryKey: [`${model}s`] });
      const message =
        action === "create" ? "Classroom created" : "Classroom deleted";
      toast(message);

      if (action !== "remove" && setOpen) {
        setOpen(false);
      }

      if (action === "remove") {
        router.push("/");
      }
    },
    onError: (data) => {
      console.log("error", data);
      toast("Classroom created error");
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("handleClick", action);
    if (action === "create") {
      console.log("create update");
      event.preventDefault();
      formContext.handleSubmit((data) => {
        mutation.mutate(data as ClassroomButtonCrudActionDTO);
      })();
    } else {
      if (id && action === "remove") {
        mutation.mutate({ id: id as string });
      }
    }
  };

  return (
    <Button
      type={type}
      variant={variant}
      className={`${className}`}
      onClick={handleClick}
    >
      {mutation.isPending ? (
        <span className="flex items-center gap-2">
          <LoaderCircle className="animate-spin" />
          <span>{textLoading}</span>
        </span>
      ) : (
        textAction
      )}
    </Button>
  );
};

export default ButtonCrudAction;
