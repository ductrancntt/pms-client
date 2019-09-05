/*eslint-disable*/
import auth from '@/security/authentication';
import path from "@/router/path";

const ADMIN = "ROLE_ADMIN";
const USER = "ROLE_ADMIN";

const rules = new Map();
rules.set(path.homeUrl, [ADMIN, USER]);
rules.set(path.homeUrl, [ADMIN]);

export default {
    hasPermissionToViewPage(pageUri) {
        const currentUser = auth.getCurrentUser();
        const requiredRoles = rules.get(pageUri);
    }
}