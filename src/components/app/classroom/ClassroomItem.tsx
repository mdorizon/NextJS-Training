"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Classroom } from "@prisma/client";
import Link from "next/link";

interface ClassroomProps {
  classroom: Classroom;
}

const ClassroomItem = ({ classroom }: ClassroomProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/classrooms/${classroom.id}`}>
            <h2>{classroom.classroomName}</h2>
          </Link>
        </CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{classroom.description}</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ClassroomItem;
