// Antd资源
import Card from "antd/es/card/Card"
import Logo from '@/assets/Logo001.png'
import { UserOutlined , RedoOutlined } from '@ant-design/icons'
// Antd资源
// 自定义资源
import Avt001 from '@/assets/Avatar/001.png'
import Wallpaper005 from '@/assets/Wallpaper005.png';
// 自定义资源
// 布局调控
import './index.scss'
// 布局调控
// Hook资源
import { useState , useEffect } from "react"
import { Form, Input, Button, Checkbox } from 'antd'
// Hook资源
// 界面跳转
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
// 界面跳转
// 储存调用
import { useStore } from "@/store"
// 储存调用
// 信息提示模块
import { message } from "antd"
// 信息提示模块
// 头像模块
import { Avatar } from "antd" 
// 头像模块
// 自动间隔
import { Space } from "antd"
// 自动间隔

function Regs()
{
    const navigate = useNavigate()
    //实例化路由组建
    //提示信息模块head
    const [messageApi, contextHolder] = message.useMessage();
    const Success = () =>
    {
        messageApi.open({
            type: 'success',
            content: '注册成功',
            className: 'custom-class',
            style: 
            {
              marginTop: '20vh',
            },
          });
        
    }
    //提示信息模块tail
    const { mainStore } = useStore()
    async function onFinish(values)
    {
        mainStore.PushRegsInfo({
            username:values.mobile,
            password:values.code
        });
        navigate('/Login');
    }
    function onFinishFailed(erroinfo)
    {
        console.log('Failed:',erroinfo)
    }
    return(
        <div className="Regs">
            <img src={Wallpaper005}>
            </img>
            {/* <Button className="ResetButton" shape="circle" type="primary" icon={<RedoOutlined />} onClick={changebackground}>
            </Button> */}
            <Card className="regs-container">
                {/* Tbd的Logo */}
                <img className="regs-Logo" src={Logo} alt=""/>
                {/* Tbd的Logo */}
                {/* 自定义头像 */}
                <Avatar className="regs-avatar" size={128} src={Avt001}>
                {/* 这里后续要做上传 */}
                </Avatar>          
                <Form
                    // 成功要应答,失败也要应答
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="mobile"
                        initialValue={''}
                        rules=
                        {[
                            {
                                required : true,
                                message:"请输入用户名",
                            },
                        ]}
                        
                    >
                        <Input size="large" placeholder="请输入用户名" />
                        
                    </Form.Item>
                    <Form.Item
                        name="code"
                        initialValue={''}
                        rules=
                        {[
                            {
                                required : true,
                                message:"请输入密码",
                            },
                        ]}
                        
                    >
                        <Input size="large" placeholder="请输入密码" />
                        
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        // 建议改为unchecked
                        // 如果不调用此行函数，对勾的输出结果将是undefined
                    >
                        <Checkbox className="regs-checkbox-label">
                        我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    <Link to="/Test">
                        <Button className="ReadTxt" type="text" size="small">
                        阅读「用户协议」和「隐私条款」
                        </Button>
                    </Link>
                    <Form.Item>
                        <Button class = "RegsButton" type="primary" htmlType="submit" size="large" block onClick={Success}>
                        注册
                        </Button>
                    </Form.Item>
                </Form>
            </Card>   
        </div>
    )
}
export default Regs;
