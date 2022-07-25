import db from "../config/database.js";

import { CreateTest } from "../services/testsService.js";

async function findCategoryByName(category: string) {
    return await db.category.findUnique({
        where: { name: category }
    });
}

async function findDisciplineByName(discipline: string) {
    return await db.discipline.findUnique({
        where: { name: discipline }
    });
}

async function findTeacherByName(teacher: string) {
    return await db.teacher.findUnique({
        where: { name: teacher }
    });
}


async function findTeacherDiscipline(disciplineId: number, teacherId: number) {
    return await db.teacherDiscipline.findFirst({
        where: {
            disciplineId,
            teacherId
        }
    })
}

async function saveTest(test: CreateTest) {
    await db.test.create({
        data: test
    });
}

const testsRepository = {
    findCategoryByName,
    findDisciplineByName,
    findTeacherByName,
    findTeacherDiscipline,
    saveTest
}

export default testsRepository;