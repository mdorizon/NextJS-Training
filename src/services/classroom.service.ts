import { ClassroomButtonCrudActionDTO } from "@/types/classroom.type";
import { Classroom } from "@prisma/client";
import axios from "axios";

const END_POINT = `${process.env.NEXT_PUBLIC_API_URL}/classrooms`;

async function create(
  credentials: ClassroomButtonCrudActionDTO
): Promise<Classroom> {
  const res = await axios.post(END_POINT, credentials);
  return res.data;
}

async function getAll(): Promise<Classroom[]> {
  const res = await axios.get(END_POINT);
  return res.data;
}

async function remove({ id }: { id: string }) {
  console.log("remove service id", id);
  const res = await axios.delete(`${END_POINT}/${id}`);
  return res.data;
}

const ClassroomService = {
  create,
  getAll,
  remove,
};

export default ClassroomService;
