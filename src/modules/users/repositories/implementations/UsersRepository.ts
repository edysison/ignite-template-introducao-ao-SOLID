import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, { name, email });
    this.users.push(user);
    return user;
  }

  findById(id: string): User {
    const data = this.users.find((user) => user.id === id);
    return data;
  }

  findByEmail(email: string): User {
    const data = this.users.find((user) => user.email === email);
    return data;
  }

  turnAdmin(receivedUser: User): User {
    const adminUser = this.users.find((user) => user.id === receivedUser.id);
    adminUser.admin = true;
    return adminUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
