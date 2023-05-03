import { http } from "@/utils";
import { makeAutoObservable } from "mobx";
class UserStore
{
    useinfo = {};
    constructor()
    {
        makeAutoObservable(this)
    }
    getUserInfo = () =>
    {
        // 调用接口获取数据
    }
}
export default UserStore;