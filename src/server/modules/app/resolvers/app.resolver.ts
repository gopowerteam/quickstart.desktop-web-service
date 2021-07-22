import {
    Args,
    Field,
    InputType,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver
} from '@nestjs/graphql'
import { UserRole } from '@server/constants/enum.config'
import { Public } from '@server/decorators/public.decorator'
import { App } from '@server/modules/app/entities/app.entity'
import { Group } from '@server/modules/app/entities/group.entity'
import { AppService } from '@server/modules/app/services/app.service'
import { UserService } from '@server/modules/user/services/user.service'
import { SystemInfo } from '../entities/system-info.entity'

@InputType()
class AppInput implements Partial<App> {
    @Field()
    name: string

    @Field()
    title: string

    @Field()
    icon: string
}

@Resolver(of => App)
export class AppResolver {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService
    ) {}

    /**
     * 获取系统状态
     * @returns
     */
    @Public()
    @Query(returns => SystemInfo)
    async getSystemInfo() {
        // 是否设置管理员
        const admin = await this.userService.findOne({ role: UserRole.ADMIN })

        return {
            administrator: !!admin
        }
    }
    /**
     * 获取应用列表
     * @param param0
     * @returns
     */
    @Query(returns => [App])
    async getAppList() {
        return await this.appService.getAppList()
    }

    /**
     * 同步应用列表
     * @param apps
     * @returns
     */
    @Public()
    @Mutation(returns => [App])
    async syncAppList(
        @Args('apps', { type: () => [AppInput] }) apps: AppInput[]
    ) {
        return await this.appService.syncAppList(apps)
    }

    @Mutation(returns => App)
    async AddUserDesktopApp(@Args('app') app: AppInput) {
        return await this.appService.addUserDesktopApp(app)
    }

    @Mutation(returns => App)
    async RemoveUserDesktopApp(@Args('app') appName: string) {
        return await this.appService.removeUserDesktopApp(appName)
    }

    @ResolveField(returns => Group)
    async group(@Parent() app: App) {
        return app.group
    }

    // @Query('GetAdminList')
    // async getAdminList() {
    //     return await this.applicationService.getAdminList()
    // }

    // @Query('GetGroupList')
    // async getGroupList() {
    //     return await this.applicationService.getGroupList()
    // }

    // @Query('GetUserDesktopApps')
    // async getUserApps(@Args('userid') userid: string) {
    //     return await this.applicationService.getUserDesktopApps(userid)
    // }

    // @Query('GetRoleById')
    // async getRoleById(@Args('roleid') roleid: number) {
    //     return await this.applicationService.getRoleById(roleid)

    // }

    // @Mutation('AddGroup')
    // async addGroup(@Args('group') group: any) {
    //     return await this.applicationService.addGroup(group)
    // }

    // @Mutation('AddAdminList')
    // async addAdminList(@Args('users') users: any[]) {
    //     return await this.applicationService.addAdminList(users)
    // }

    // @Mutation('UpdateApp')
    // async updateApp(@Args('app') app: any) {
    //     return await this.applicationService.updateApp(app)
    // }

    // @Mutation('UpdateGroup')
    // async updateGroup(@Args('group') group: any) {
    //     return await this.applicationService.updateGroup(group)
    // }

    // @Mutation('DeleteGroup')
    // async deleteGroup(@Args('id') id: any) {
    //     return await this.applicationService.deleteGroup(id)
    // }

    // @Mutation('AddUserDesktopApp')
    // async addUserDesktopApp(
    //     @Args('userid') userid: string,
    //     @Args('app') app: string
    // ) {
    //     return await this.applicationService.addUserDesktopApp(userid, app)
    // }

    // @Mutation('DeleteUserDesktopApp')
    // async deleteUserDesktopApp(
    //     @Args('userid') userid: string,
    //     @Args('app') app: string
    // ) {
    //     return await this.applicationService.deleteUserDesktopApp(userid, app)
    // }

    // @Mutation('UpdateRole')
    // async updateRole(
    //     @Args('roleid') roleid: number,
    //     @Args('apps') apps: string[]
    // ) {
    //     return await this.applicationService.updateRole(roleid, apps)
    // }
}
