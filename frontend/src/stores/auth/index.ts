import { create } from 'zustand';
import api, { LoginUserDto, ReturnedUser, SignUpUserDto } from '../../api';

interface AuthStore {
  token: string | null;
  user: ReturnedUser | null;
  login: (data: LoginUserDto) => Promise<void>;
}

const useAuth = create<AuthStore>((set) => ({
  token: null,
  user: null,
  login: async (user: LoginUserDto) => {
    const { data } = await api.loginWithEmail(user);
    set({ token: data.access_token });
  },
  signUp: async (user: SignUpUserDto) => {
    const { data } = await api.signUp(user);
    set({ token: data.access_token });
  },
}));
