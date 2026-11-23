import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import serviceAccount from "../../loan-monitoring-system-580d4-firebase-adminsdk-fbsvc-ef340fa8ab.json";

initializeApp({
    credential: cert(
        serviceAccount as ServiceAccount,
    ),
});

const auth: Auth = getAuth();

export { auth };