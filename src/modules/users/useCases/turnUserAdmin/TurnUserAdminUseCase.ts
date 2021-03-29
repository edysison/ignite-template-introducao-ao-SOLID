import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User | null {
    const user = this.usersRepository.findById(user_id);
    if (!user) throw new Error("user not found");
    const admin = this.usersRepository.turnAdmin(user);
    return admin;
  }
}

export { TurnUserAdminUseCase };
