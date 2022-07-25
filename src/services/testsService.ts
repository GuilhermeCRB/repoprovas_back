import { Test } from "@prisma/client";
import testsRepository from "../repositories/testsRepository.js";

export type TestInputs = Omit<Test &
    { category: string, discipline: string, teacher: string },
    "id" | "createdAT" | "categoryId" | "teacherDisciplineId"
>;

export type CreateTest = Omit<Test, "id" | "createdAT">;

async function saveTest(testInputs: TestInputs) {
    const category = await testsRepository.findCategoryByName(testInputs.category);
    const discipline = await testsRepository.findDisciplineByName(testInputs.discipline);
    const teacher = await testsRepository.findTeacherByName(testInputs.teacher);
    const teacherDiscipline = await testsRepository.findTeacherDiscipline(discipline.id, teacher.id);
    const test: CreateTest = formatTest(testInputs, category.id, teacherDiscipline.id);
    await testsRepository.saveTest(test);
}

function formatTest(testInputs: TestInputs, categoryId: number, teacherDisciplineId: number){
    return {
        name: testInputs.name,
        pdfUrl: testInputs.pdfUrl,
        categoryId,
        teacherDisciplineId
    };
}

async function getTestsByQuery(filter) {
    if(filter === "term") return await testsRepository.findTestsByTerm();
    if(filter === "teacher") return await testsRepository.findTestsByTeatcher();
}

const testsService = {
    saveTest,
    getTestsByQuery
};

export default testsService;