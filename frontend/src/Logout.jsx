
import { apiFetch, getToken, setToken } from './Helpers'

export const logout = async () => {
  const token = getToken();
  if (token != null) {
    try {
      const ret = await apiFetch('POST', '/user/auth/logout', token, {});
      console.log(ret);
      setToken(null);
    } catch (e) {
      console.log(e);
    }
  }
}
