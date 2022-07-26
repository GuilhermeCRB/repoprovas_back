import { faker } from "@faker-js/faker";

import db from "../../src/config/database.js";

async function databaseFactory() {
    const terms = await createTerms();
    const teacher = await createTeacher();
    const discipline = await createDiscipline(terms.id);
    await createTeacherDiscipline(teacher.id, discipline.id);  
    await createCategory();
}

async function createTerms() {
    await db.term.createMany({
        data: [{ number: 1 }, { number: 2 }, { number: 3 }],
    });

    return await db.term.findFirst();
}


async function createTeacher() {
    await db.teacher.create({
        data: {
            name: faker.name.findName()
        }
    });

    return await db.teacher.findFirst();
}

async function createDiscipline(termId: number) {
    await db.discipline.create({
        data: {
            termId,
            name: faker.animal.dog()
        }
    });

    return await db.discipline.findFirst();
}

async function createTeacherDiscipline(teacherId: number, disciplineId: number) {
    return await db.teacherDiscipline.create({
        data: {
            teacherId,
            disciplineId
        }
    });
}

async function createCategory() {
    return await db.category.create({
        data: {
            name: faker.animal.dog()
        }
    });
}

export default databaseFactory;