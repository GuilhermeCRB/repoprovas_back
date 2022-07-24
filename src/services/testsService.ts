import { Test } from "@prisma/client";

export type TestInputs = Omit<Test & {category: string, teacher: string}, "id" | "createdAT" | "categoryId" | "teacherDisciplineId">;

const testsService = {
    
};

export default testsService;