//@ts-nocheck
import { Router } from "express";
import { anWriteAPI, coWriteAPI, dmWriteAPI, mrWriteAPI, dmFetchAPI, mrFetchAPI, coFetchAPI, anFetchAPI, hiddenMsgFetchAPI, pinnedAnFetchAPI, filteredMsgFetchAPI, removedMsgAPI, clearMsgAPI, resolveMessageAPI, hideAllMessagesAPI, hideMessageAPI, pinAnnouncementAPI, unpinAnnouncementAPI } from "../controllers/messageController";
import { authenticate } from "../middleware/jwt-auth";

const router = Router();

router.post("/direct_message/write", authenticate, dmWriteAPI);
router.post("/maintenance_request/write", authenticate, mrWriteAPI);
router.post("/complaint/write", authenticate, coWriteAPI);
router.post("/announcement/write", authenticate, anWriteAPI);

router.get("/direct_message/view", authenticate, dmFetchAPI);
router.get("/maintenance_request/view", authenticate, mrFetchAPI);
router.get("/complaint/view", authenticate, coFetchAPI);
router.get("/announcement/view", authenticate, anFetchAPI);
router.get("/hidden/view", authenticate, hiddenMsgFetchAPI);
router.get("/announcement/view/pinned", authenticate, pinnedAnFetchAPI);
router.get("/filtered/view", authenticate, filteredMsgFetchAPI);

router.delete("/delete", authenticate, removedMsgAPI);
router.delete("/clear", authenticate, clearMsgAPI);

router.patch("/resolve", resolveMessageAPI);
router.patch("/hide", hideMessageAPI);
router.patch("/hide_all", authenticate, hideAllMessagesAPI);
router.patch("/announcement/pin", authenticate, pinAnnouncementAPI);
router.patch("/announcement/unpin", authenticate, unpinAnnouncementAPI);
export default router;