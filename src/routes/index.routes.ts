import { Router, Request, Response } from "express"; 

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.json({ messagge: "Hello to my API rest" });
});

export default router; 