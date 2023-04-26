//Cookies
import cookie from 'react-cookies';
//
//Assest head
import Card from "antd/es/card/Card"
import Logo from '@/assets/Logo001.png'
//Assest tail
//react框架所属head
import { useState , useEffect } from "react"
//react框架所属tail
import './index.scss'
import { Form, Input, Button, Checkbox } from 'antd'
//
import { Link } from "react-router-dom"
//
import { useStore } from "@/store"
//
import { useNavigate } from "react-router-dom"
//提示信息模块
import { message } from "antd"
//头像模块
import { Space } from "antd"
import { Avatar } from "antd" 
import { UserOutlined , RedoOutlined } from '@ant-design/icons'
import Avt001 from '@/assets/Avatar/001.png'
//背景总集head
import Wallpaper000 from '@/assets/Wallpaper000.jpg';
import Wallpaper001 from '@/assets/Wallpaper001.JPG';
import Wallpaper002 from '@/assets/Wallpaper002.JPG';
import Wallpaper003 from '@/assets/Wallpaper003.JPG';
import Wallpaper004 from '@/assets/Wallpaper004.png';
const backgrounds = [Wallpaper000,Wallpaper001,Wallpaper002,Wallpaper003,Wallpaper004];
//背景总集tail

const BACKGROUND_DURATION = 5000;
function Login()
{
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(1);
    const [isFading, setIsFading] = useState(true);
    const [isFading2, setIsFading2] = useState(false);
    const [turn,setturn] = useState(1);
    function wait() 
    {
        return new Promise(resolve => {
            setTimeout(() => 
            {
              console.log('One second has passed.')
              resolve()
            }, 1000)
          })
    }

    async function changebackground()
    {
        if (turn) 
        {
            //cookie.remove('Token');
            setturn(preturn => !preturn);
            setIsFading(preisFading => !preisFading);
            setIsFading2(preisFading => !preisFading);
            await wait();
            setCurrentIndex((prevIndex) => (prevIndex + 2) % backgrounds.length);
            turn = 0;
        }
        else if(!turn)
        {
            //cookie.remove('Token');
            setturn(preturn => !preturn);
            setIsFading(preisFading => !preisFading);
            setIsFading2(preisFading => !preisFading);
            await wait();
            setCurrentIndex2((prevIndex) => (prevIndex + 2) % backgrounds.length);
            turn = 1;
        }
        
        
        
    } 
    const navigate = useNavigate()
    //实例化路由组建
    //提示信息模块head
    const [messageApi, contextHolder] = message.useMessage();
    const success = () =>
    {
        messageApi.open({
            type: 'success',
            content: '登陆成功',
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
        //console.log(values);
        mainStore.getToken({
            username:values.mobile,
            password:values.code
        });
        navigate('/Layout');
    }
    function onfinishFailed(erroinfo)
    {
        console.log('Failed:',erroinfo)
    }
    return(
        <div className="login"
            //style={{backgroundImage: `url(${backgrounds[currentIndex]})`}}
        >
            <img src={backgrounds[currentIndex]} className={`backgroundImage ${isFading ? "fade-in" : "fade-out"}`}>
            </img>
            <img src={backgrounds[currentIndex2]} className={`backgroundImage ${isFading2 ? "fade-in" : "fade-out"}`}>
            </img>
            <Button className="ResetButton" shape="circle" type="primary" icon={<RedoOutlined />} onClick={changebackground}>
            </Button>
            <Card className="login-container">
                <img className="login-Logo" src={Logo} alt=""/>
                <Avatar className="login-avatar" size={128} src={Avt001}>
                </Avatar>          
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onfinishFailed}
                >
                    <Form.Item
                        //数据校验
                        //不知道为什么只校验一次
                        name="mobile"
                        initialValue={'test1'}
                        rules=
                        {[
                            {
                                required : true,
                                message:"请输入11位手机号码",
                            },
                        ]}
                        
                    >
                        <Input size="large" placeholder="请输入手机号" />
                        
                    </Form.Item>
                    <Form.Item
                        name="code"
                        initialValue={'test'}
                        rules=
                        {[
                            {
                                required : true,
                                message:"请输入验证码",
                            },
                        ]}
                        
                    >
                        <Input size="large" placeholder="请输入验证码" />
                        
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        //如果不调用此行函数，对勾的输出结果将是undefined
                    >
                        <Checkbox className="login-checkbox-label">
                        我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    <Link to="/Feiju">
                        <Button className="ReadTxt" type="text" size="small">
                        阅读「用户协议」和「隐私条款」
                        </Button>
                    </Link>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block onClick={success}>
                        登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>   
        </div>
    )
}
export default Login;