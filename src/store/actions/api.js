import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("API_CALL_BEGAN");
export const apiCallSuccess = createAction("API_CALL_SUCCESS");
export const apiCallFailed = createAction("API_CALL_FAILED");
