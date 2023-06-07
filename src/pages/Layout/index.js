// React组件
import { useState } from 'react';
import { useStore } from "@/store";
import { useEffect } from 'react';
import { Component } from 'react';
import { useRef } from 'react';
// 网络流
import { http } from '@/utils';
// 图片展示
import { Card } from 'antd';
import { Image } from 'antd';

//Antd
  // 面包屑，小标题
import { Breadcrumb } from 'antd';
  // 布局
import { Layout } from 'antd';
  // 菜单 
import { Menu } from 'antd';
  // 按钮
import { Button } from 'antd';
  // 收集表
import { Form } from 'antd';
  // 间隔
import { Space } from 'antd';
  // 单选项
import { Radio } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import {Tag, Tooltip, theme} from 'antd';
import {Input} from 'antd';
import { Header } from 'antd/es/layout/layout';
import { FileOutlined, UserOutlined , DesktopOutlined , TeamOutlined , DropboxOutlined , SearchOutlined , ReloadOutlined } from '@ant-design/icons';
// Cookies
import cookie from 'react-cookies'
  // 滑动输入条
import { Col, InputNumber, Row, Slider } from 'antd';
  // 选择器
import { Select } from 'antd';
  //Order表单
import {List} from 'antd';
import VirtualList from 'rc-virtual-list';
// 导入样式
import './index.scss';

const { TextArea } = Input;
const { Content, Footer, Sider } = Layout;

//侧栏物件
function getItem(label, key, icon, children) 
{
  return {
    key,
    icon,
    children,
    label,
  };
}
//定义了一个items组用于储存侧栏物品
const items = [
  getItem('欢迎来到本站', '1' ,<DesktopOutlined/> ),
  getItem('使用AI', 'sub1', <UserOutlined />,  
  [
    getItem('AI绘画', 'sub2',null,[
      getItem('AI虚拟形象','7'),
      getItem('AIDrawer','8'),
    ]),
    getItem('AI建模','5'),
    getItem('AIChat','6'),
    getItem('AI音声合成','sub3',null,[
      getItem('VIP 模型训练','3'),
      getItem('声线合成','4')
    ]),
  ]),
  getItem('成为贡献者', '9',<DropboxOutlined />),
];
// 

// 场下全是心跳声，我的朋友
const Laypage = () => 
{
  // 设置侧栏折叠状态
  const [collapsed, setCollapsed] = useState(true);
  // 存储系统
  const {mainStore} = useStore();
  // 存入任务列表（list格式）
  const [OrderList,SetOrderList] = useState(mainStore.OrderList);
  // 初始化人物列表（dic格式）
  const [OrderDicList,SetOrderDicList]=useState([]);
  // 滑动输入条（步骤）
    const [inputValue001, setInputValue001] = useState(20);
    // Antd滑动条调用函数
    const onChange = (newValue) => 
    {
      setInputValue(newValue);
    };
    const { token } = theme.useToken();
    // 初始化GoodTags
    const [GoodTags, setGoodTags] = useState(['nsfw',]);
    // 初始化BadTags
    const [BadTags, setBadTags] = useState([,]);
    // 设置标签是否可以输入
    const [inputVisible, setInputVisible] = useState(false);
    // 设置标签输入值
    const [inputValue, setInputValue] = useState('');
    // 
    const [editInputIndex, setEditInputIndex] = useState(-1);
    // 
    const [editInputValue, setEditInputValue] = useState('');
    // 
    const inputRef = useRef(null);
    // 
    const editInputRef = useRef(null);
    // 
    const [inputVisible2, setInputVisible2] = useState(false);
    // 
    const [inputValue2, setInputValue2] = useState('');
    // 
    const [editInputIndex2, setEditInputIndex2] = useState(-1);
    // 
    const [editInputValue2, setEditInputValue2] = useState('');
    // 
    const inputRef2 = useRef(null);
    // 
    const editInputRef2 = useRef(null);
    useEffect(() => 
    {
      if (inputVisible) 
      {
        inputRef.current?.focus();
      }
    }, [inputVisible]);
    useEffect(() => 
    {
      if (inputVisible2) 
      {
        inputRef2.current?.focus();
      }
    }, [inputVisible2]);
    
    useEffect(() => 
    {
      editInputRef.current?.focus();
    }, [inputValue]);
    useEffect(() => 
    {
      editInputRef2.current?.focus();
    }, [inputValue2]);
    const handleCloseGoodTags = (removedTag) => 
    {
      const newTags = GoodTags.filter((tag) => tag !== removedTag);
      console.log(newTags);
      setGoodTags(newTags);
    };
    const handleCloseBadTags = (removedTag) =>
    {
      const newTags = BadTags.filter((tag) => tag !== removedTag);
      console.log(newTags);
      setBadTags(newTags);
    }
    const showInput = () => 
    {
      setInputVisible(true);
    };
    const handleInputChange = (e) => 
    {
      setInputValue(e.target.value);
    };
    const handleInputConfirmGoodTags = () => 
    {
      if (inputValue && GoodTags.indexOf(inputValue) === -1) 
      {
        setGoodTags([...GoodTags, inputValue]);
      }
      setInputVisible(false);
      setInputValue('');
    };
    const handleInputConfirmBadTags = () =>
    {
      if (inputValue && BadTags.indexOf(inputValue) === -1)
      {
        setBadTags([...BadTags, inputValue]);
      }
      setInputVisible(false);
      setInputValue('');
    };
    const handleEditInputChange = (e) => 
    {
      setEditInputValue(e.target.value);
    };
    const handleEditInputConfirmGoodTags = () => 
    {
      const newTags = [...GoodTags];
      newTags[editInputIndex] = editInputValue;
      setGoodTags(newTags);
      setEditInputIndex(-1);
      setInputValue('');
    };
    const handleEditInputConfirmBadTags = () =>
    {
      const newTags = [...BadTags];
      newTags[editInputIndex] = editInputValue;
      setBadTags(newTags);
      setEditInputIndex(-1);
      setInputValue('');
    }
    const tagInputStyle = 
    {
      width: 78,
      verticalAlign: 'top',
    };
    const tagPlusStyle = 
    {
      background: token.colorBgContainer,
      borderStyle: 'dashed',
    };
  async function OnFinish(values)
  {
    // 检查用户提交的数据是否有空值
    // 若有空值，则使用默认值
    let DicTemp = 
    {
      negative_prompt:values.negative_prompt,
      prompt:GoodTags,
      // 种子
      seed:-1,
      // 处理步骤
      steps: inputValue,
      // 是否启用高分辨率
      enable_hr: false,
      // 降噪强度
      denoising_strength: 0,
      // 高分辨率第一阶段宽度
      firstphase_width: 0,
      // 高分辨率第一阶段高度
      firstphase_height: 0,
      // 高分辨率缩放比例
      hr_scale: 2,
      // 高分辨率第二阶段步骤
      hr_second_pass_steps: 0,
      // 高分辨率第二阶段宽度
      hr_resize_x: 0,
      // 高分辨率第二阶段高度
      hr_resize_y: 0,
      // 子种子
      subseed: -1,
      // 子种子强度
      subseed_strength: 0,
      // 种子缩放高度
      seed_resize_from_h: -1,
      // 种子缩放宽度
      seed_resize_from_w: -1,
      // 采样器名称
      sampler_name: "Euler a",
      // 批处理大小
      batch_size: 1,
      // 采样器迭代次数
      n_iter:1,
      // 
      cfg_scale: 7,
      // 宽度
      width: 512,
      // 高度
      height: 512,
      // 人脸补全算法
      restoring_faces: false,
      tiling: false,
      eta:0,
      s_churn: 0,
      s_tmax: 0,
      s_tmin: 0,
      s_noise: 1,
      override_settings:{},
      override_settings_restore_afterwards: true,
      sampler_index:"Euler",
    }
    let DefaultDicTemp = 
    {
      negative_prompt:"1",
      prompt:"1",
      seed: -1,
      enable_hr: false,
      denoising_strength: 0,
      firstphase_width: 0,
      firstphase_height: 0,
      hr_scale: 2,
      hr_second_pass_steps: 0,
      hr_resize_x: 0,
      hr_resize_y: 0,
      subseed: -1,
      subseed_strength: 0,
      seed_resize_from_h: -1,
      seed_resize_from_w: -1,
      sampler_name: "Euler a",
      batch_size: 1,
      n_iter:1,
      steps:30,
      cfg_scale: 7,
      width: 512,
      height: 512,
      restoring_faces: false,
      tiling: false,
      eta:0,
      s_churn: 0,
      s_tmax: 0,
      s_tmin: 0,
      s_noise: 1,
      override_settings:{},
      override_settings_restore_afterwards: true,
      sampler_index:"Euler"
    }
    function compareDictValues(dic1, dic2) 
    {
      for (const [key, value] of Object.entries(dic2)) 
      {
        if (value === null) 
        {
          dic2[key] = dic1[key];
        }
      }
    }
    compareDictValues(DefaultDicTemp,DicTemp);
    // 检查用户提交的数据是否有空值
    // 若有空值，则使用默认值
    // 登入账户
    let Token = cookie.load('Token');
    // 登入账户
    // 上传Tags
    console.log(DicTemp);
    await mainStore.PushPrompts({
      token : Token,
      task_num : 10,
      task_detail : DicTemp,
    });
    // 上传Tags
    await mainStore.getResultList({
      token : Token,
    });
  };


  const ContainerHeight = 400;

  // 解析并刷新当前展示的图片
  const [Base64Code, SetBase64Code] = useState(null)
  async function ReAsk(task_name)
  {
    let Token = cookie.load('Token');
    await mainStore.getResult(
      {
        token : Token,
        task_name : task_name,
      }
    )
    console.log(mainStore.imgSrc[0]);
    // 加工后端传回的未经加工的Base64码
    const Base64Process = (Base64CodeUnprocessed) =>
    {
      let Base64CodeTemp = 'data:image/' + 'png' + ';base64,'+Base64CodeUnprocessed;
      return Base64CodeTemp;
    }
    // 设置展示图片的Base64码
    SetBase64Code(Base64Process(mainStore.imgSrc[0]));
  }
  // 刷新列表
  async function ReFresh()
  {
    // 点击按钮后，执行此函数，刷新List中的内容
    // 登录
    let Token = cookie.load('Token');

    await mainStore.getResultList(
      {
        token:Token,
      }
    )
    SetOrderList(mainStore.OrderList);
    console.log('OrderList',OrderList);
    for(let j=0;j < OrderList.length;j++)
    {
      SetOrderDicList((OrderDicList) => OrderDicList.concat([{title:OrderList[j]},]));
    }
    console.log('OrderDicList',OrderDicList);
    appendData();
  }
  // 设置List的内容
  const [data, setData] = useState([]);
  const appendData = () => 
  {
    setData(OrderDicList);
    // data = [{title:},{title:},{title:},......]以此种格式存储，方便后续List调用
    console.log('data',data);
  };

  return (
    <Layout
      style=
      {{
        minHeight: '100vh',
      }}

    >
      
      <Sider className='Sider' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu className='FunctionMenu' defaultSelectedKeys={['8']} mode="inline" items={items} theme='dark'>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style=
          {{
            margin: '0 20px',
          }}
        >
          <Space
            direction="vertical"
            size="middle"
            style=
            {{
              display: 'flex',
            }}
          >
            <Breadcrumb className='Introduction'>
              <Breadcrumb.Item>
                <a href="/Login">使用AI</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>AI绘画</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <br />
            <Form className='Tags' onFinish={OnFinish}>
              <Form.Item name="prompt">
                <Card className='GoodTags'>
                  <Space size={[0, 8]} wrap>
                    <Space size={[0, 8]} wrap>
                      {GoodTags.map((GoodTags, index) => {
                        if (editInputIndex === index) {
                          return (
                            <Input
                              ref={editInputRef}
                              key={GoodTags}
                              size="small"
                              style={tagInputStyle}
                              value={editInputValue}
                              onChange={handleEditInputChange}
                              onBlur={handleEditInputConfirmGoodTags}
                              onPressEnter={handleEditInputConfirmGoodTags}
                            />
                          );
                        }
                        const isLongTag = GoodTags.length > 20;
                        const tagElem = (
                          <Tag
                            key={GoodTags}
                            closable={index !== 0}
                            style={{
                              userSelect: 'none',
                            }}
                            onClose={() => handleCloseGoodTags(GoodTags)}
                          >
                            <span
                              onDoubleClick={(e) => {
                                if (index !== 0) {
                                  setEditInputIndex(index);
                                  setEditInputValue(GoodTags);
                                  e.preventDefault();
                                }
                              }}
                            >
                              {isLongTag ? `${GoodTags.slice(0, 20)}...` : GoodTags}
                            </span>
                          </Tag>
                        );
                        return isLongTag ? (
                          <Tooltip title={GoodTags} key={GoodTags}>
                            {tagElem}
                          </Tooltip>
                        ) : (
                          tagElem
                        );
                      })}
                    </Space>
                    {inputVisible ? (
                      <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={tagInputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirmGoodTags}
                        onPressEnter={handleInputConfirmGoodTags}
                      />
                    ) : (
                      <Tag style={tagPlusStyle} onClick={showInput}>
                        <PlusOutlined /> 添加正面标签
                      </Tag>
                    )}
                  </Space>
                </Card>
              </Form.Item>
              <Form.Item name="negative_prompt">
                <Card className='BadTags'>
                  <Space size={[0, 8]} wrap>
                    <Space size={[0, 8]} wrap>
                      {GoodTags.map((BadTags, index) => {
                        if (editInputIndex === index) {
                          return (
                            <Input
                              ref={editInputRef}
                              key={BadTags}
                              size="small"
                              style={tagInputStyle}
                              value={editInputValue}
                              onChange={handleEditInputChange}
                              onBlur={handleEditInputConfirmBadTags}
                              onPressEnter={handleEditInputConfirmBadTags}
                            />
                          );
                        }
                        const isLongTag = BadTags.length > 20;
                        const tagElem = (
                          <Tag
                            key={BadTags}
                            closable={index !== 0}
                            style={{
                              userSelect: 'none',
                            }}
                            onClose={() => handleCloseBadTags(BadTags)}
                          >
                            <span
                              onDoubleClick={(e) => {
                                if (index !== 0) {
                                  setEditInputIndex(index);
                                  setEditInputValue(BadTags);
                                  e.preventDefault();
                                }
                              }}
                            >
                              {isLongTag ? `${BadTags.slice(0, 20)}...` : BadTags}
                            </span>
                          </Tag>
                        );
                        return isLongTag ? (
                          <Tooltip title={BadTags} key={BadTags}>
                            {tagElem}
                          </Tooltip>
                        ) : (
                          tagElem
                        );
                      })}
                    </Space>
                    {inputVisible ? (
                      <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        style={tagInputStyle}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirmGoodTags}
                        onPressEnter={handleInputConfirmGoodTags}
                      />
                    ) : (
                      <Tag style={tagPlusStyle} onClick={showInput}>
                        <PlusOutlined /> 添加负面标签 
                      </Tag>
                    )}
                  </Space>
                </Card>
              </Form.Item>
              {/* <Breadcrumb className='StepsTips'>
                <Breadcrumb.Item>处理步骤（越大越精细）</Breadcrumb.Item>
              </Breadcrumb> */}
              {/* 这里是生成按钮 */}
              <Button type="primary" className='GenerateButton' htmlType='submit'>
                生成图片
              </Button>
            </Form>
          </Space>
          <Card
            className='ParameterCard'
            hoverable
          >
            <Row>
              <Col span={24}>
              </Col>
            </Row>
            <Row>
              <Col span={12}>col-12</Col>
              <Col span={12}>col-12</Col>
            </Row>
            <Row>
              <Col span={8}>col-8</Col>
              <Col span={8}>col-8</Col>
              <Col span={8}>col-8</Col>
            </Row>
            <Row>
              <Col span={6}>col-6</Col>
              <Col span={6}>col-6</Col>
              <Col span={6}>col-6</Col>
              <Col span={6}>col-6</Col>
            </Row>
          </Card>
          <Card
            hoverable
            className='ShowOrderList'
            height={ContainerHeight}
          >
            <VirtualList
              height={ContainerHeight}
              data={data}
              itemHeight={50}
              itemKey="title"
              
            >
              {(item) => (
                <List.Item key={item.title}>
                  <List.Item.Meta
                    className='ListItem'
                    // avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    // description={item.email}
                  />
                  <Button type="link" className='CheckTheImage' onClick={() => ReAsk(item.title)}>
                    查看图片
                  </Button>
                </List.Item>
              )}
            </VirtualList>
        </Card>
        {/* 刷新按钮1，刷新列表内容 */}
        <Button
          className='ReFreshButton'
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => ReFresh()}
        />
        <img src={Base64Code} alt='img there' className='Image'/>

        </Content>
        <Footer
          className='Footer'
          style=
          {{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Laypage;