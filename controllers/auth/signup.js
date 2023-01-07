import signup from "../../models/auth/signup";
export function updateCurrentMode(mode) {
  signup.currentMode = mode;
}
