import { Test } from "@prisma/client";
import testsRepository from "../repositories/testsRepository.js";

export type TestInputs = Omit<Test &
    { category: string, discipline: string, teacher: string },
    "id" | "createdAT" | "categoryId" | "teacherDisciplineId"
>;

export type CreateTest = Omit<Test, "id" | "createdAT">;

async function saveTest(testInputs: TestInputs) {
    const test: CreateTest = await formatTest(testInputs);
    await testsRepository.saveTest(test);
}

async function formatTest(testInputs: TestInputs){
    const category = await testsRepository.findCategoryByName(testInputs.category);
    const discipline = await testsRepository.findDisciplineByName(testInputs.discipline);
    const teacher = await testsRepository.findTeacherByName(testInputs.teacher);
    const teacherDiscipline = await testsRepository.findTeacherDiscipline(discipline.id, teacher.id);

    return {
        name: testInputs.name,
        pdfUrl: testInputs.pdfUrl,
        categoryId: category.id,
        teacherDisciplineId: teacherDiscipline.id
    };
}

async function getTestsByQuery(filter) {
    if(filter === "term") return await testsRepository.findTestsByTerm();
    if(filter === "teacher") return await testsRepository.findTestsByTeatcher();
}

const testsService = {
    saveTest,
    getTestsByQuery,
    formatTest
};

export default testsService;