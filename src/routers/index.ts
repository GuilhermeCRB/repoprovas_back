import { Router } from "express";

import access from "./access.js";
import tests from "./tests.js";

const router = Router();

router.use(access);
router.use(tests);

export default router;