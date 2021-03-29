import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string | string[];
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    if (typeof user_id !== "string") throw new Error("inválid user_id");
    const user = this.usersRepository.findById(user_id);
    console.log(user);
    if (!user) throw new Error("user not found");
    if (!user.admin) throw new Error("user does not have necessary privilages");
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
