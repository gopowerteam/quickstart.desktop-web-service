import { UserRole } from '@server/config/enum.config'
import { App } from '@server/entities/app.entity'
import { User } from '@server/entities/user.entity'
import { UserService } from '@server/services/user.service'
import {
    Args,
    Arg,
    ArgsType,
    Field,
    Mutation,
    Query,
    Resolver,
    FieldResolver,
    Root,
    ResolverInterface,
    InputType
} from 'type-graphql'

@ArgsType()
class LoginByPasswordArgs {
    @Field()
    username: string

    @Field()
    password: string
}

@InputType()
class RegisterUserInput implements Partial<User> {
    @Field()
    username: string

    @Field()
    password: string

    @Field({ nullable: true })
    role: UserRole
}

@Resolver(of => User)
export class UserResolver implements ResolverInterface<User> {
    constructor(private userService: UserService) {}

    /**
     * 通过密码登录
     * @param param0
     * @returns
     */
    @Query(returns => User)
    async loginByPassword(@Args() { username, password }: LoginByPasswordArgs) {
        return this.userService.loginByPassword(username, password)
    }

    @Query(returns => [User])
    async getUserList() {
        return this.userService.getUserList()
    }
    /**
     * 注册创建用户
     * @param param0
     * @returns
     */
    @Mutation(returns => User)
    async registerUser(@Arg('user') user: RegisterUserInput) {
        return this.userService.registerUser(user)
    }

    @FieldResolver(returns => [App])
    async desktop(@Root() user: User) {
        return user.desktop
    }
}
