
import { apiFetch, getToken, setToken } from '../Helpers'

export const logout = async (setActiveUser, navigate) => {
  const token = getToken();
  if (token != null) {
    try {
      const ret = await apiFetch('POST', '/user/auth/logout', token, {});
      console.log(ret);
      setToken(null);
      setActiveUser(false);
    } catch (e) {
      console.log(e);
    }
  }
}
