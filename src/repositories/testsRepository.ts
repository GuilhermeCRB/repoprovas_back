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

async function findTestsByTerm() {
    return await db.term.findMany({
        select: {
            number: true,
            disciplines: {
                select: {
                    name: true,
                    teacherDiscipline: {
                        select: {
                            tests: {
                                select: {
                                    name: true,
                                    pdfUrl: true,
                                    teacherDiscipline: {
                                        select: {
                                            teacher: {
                                                select: {
                                                    name: true
                                                }
                                            }
                                        }
                                    },
                                    category: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        orderBy: { number: "asc" }
    });
}

async function findTestsByTeatcher() {
    return await db.teacher.findMany({
        select: {
            name: true,
            teacherDiscipline: {
                select: {
                    tests: {
                        select: {
                            name: true,
                            pdfUrl: true,
                            teacherDiscipline: {
                                select: {
                                    discipline: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            },
                            category: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
}

const testsRepository = {
    findCategoryByName,
    findDisciplineByName,
    findTeacherByName,
    findTeacherDiscipline,
    saveTest,
    findTestsByTerm,
    findTestsByTeatcher
}

export default testsRepository;