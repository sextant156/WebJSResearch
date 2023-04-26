//React组件
import { useState } from 'react';
import { useStore } from "@/store";
import { useEffect } from 'react';
import { Component } from 'react';
//
// 网络流
import { http } from '@/utils';
// 
//图片展示
import { Card } from 'antd';
import { Image } from 'antd';
//
//Tags输入所属
//
//Antd杂项
import { Breadcrumb } from 'antd';
import { Layout } from 'antd';
import { Menu } from 'antd';
import { Button } from 'antd';
import { Form } from 'antd';
import { Space } from 'antd';//拉开组件间隔
//import { Radio } from 'antd'
import {Input} from 'antd';
// 常用图标
import { FileOutlined, UserOutlined , DesktopOutlined , TeamOutlined , DropboxOutlined , SearchOutlined , ReloadOutlined } from '@ant-design/icons';
// 
//Cookies
import cookie from 'react-cookies'
//
//滑动输入条
import { Col, InputNumber, Row, Slider } from 'antd';
//
//图片资源
import Wallpaper000 from '@/assets/Wallpaper000.jpg';
//
//Order表单
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
//scss文件导入 操控页面具体布局
import './index.scss';
import Base from 'antd/es/typography/Base';
//
//--------分割线--------//





//Tags输入所属
//
const { TextArea } = Input;
const { Content, Footer, Sider } = Layout;
const { Meta } = Card;
//储存搜索数据
//
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






const Laypage = () => 
{
  const {mainStore} = useStore();
  // 主要储存模块
  const [OrderList,SetOrderList] = useState(mainStore.OrderList);
  // 
  const [OrderDicList,SetOrderDicList]=useState([]);
  // 
  const [inputValue, setInputValue] = useState(20);
  // 滑动输入条，可能要改名
  const onChange = (newValue) => 
  {
    setInputValue(newValue);
  };
  const [collapsed, setCollapsed] = useState(false);
  //collapsible可以设定侧栏是否可以折叠
  async function onFinish(values)
  {
    
    let dicTemp = 
    {
      negative_prompt:values.negative_prompt,
      prompt:values.prompt,
      seed:-1,
      steps: inputValue,
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
      sampler_index:"Euler",
    }
    let defaultDicTemp = 
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
    compareDictValues(defaultDicTemp,dicTemp);

    let Token = cookie.load('Token');
    await mainStore.PushPrompts({
      token : Token,
      task_num : 10,
      task_detail : dicTemp,
    });
    await mainStore.getResultList({
      token : Token,
    });
    SetOrderList(mainStore.OrderList);
    // 提取OrderList，这时是一个简单表，我们需要把它转化为含字典表
    for(let j=0;j < OrderList.length;j++)
    {
      SetOrderDicList((OrderDicList) => OrderDicList.concat([{title:OrderList[j]},]));
    }
    appendData();
    console.log(mainStore.OrderList);
  };
  const ContainerHeight = 400;
  const [data, setData] = useState([]);
  
  const appendData = () => 
  {
    setData(OrderDicList);
    // data = [{title:},{title:},{title:},......]
    // console.log(data);
  };
  // 点击刷新 获取已绘制图片的Base64码 目前而言，一个任务对应多张图片
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
    //
    // 设置展示图片的Base64码
    SetBase64Code(Base64Process(mainStore.imgSrc[0]));
    //
  }





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
            <Breadcrumb className='BreadCrumb'>
              <Breadcrumb.Item>使用AI</Breadcrumb.Item>
              <Breadcrumb.Item>AI绘画</Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <br />
            <Form className='Tags' onFinish={onFinish}>
              <Form.Item name="prompt">
                <TextArea rows={6} placeholder="请输入AI应该采用的绘画元素" className='GoodTags'/>
              </Form.Item>
              <Form.Item name="negative_prompt">
                <TextArea rows={6} placeholder="请输入AI需要避免的绘画元素" className='BadTags'/>
              </Form.Item>
              <Breadcrumb className='StepsTips'>
                <Breadcrumb.Item>处理步骤（越大越精细）</Breadcrumb.Item>
              </Breadcrumb>
              {/* 这里是生成按钮 */}
              <Button type="primary" className='GenerateButton' htmlType='submit'>
                生成图片
              </Button>
            </Form>
            <Row className='SliderInput01'>
              <Col span={20}>
                <Slider
                  
                  min={20}
                  max={35}
                  onChange={onChange}
                  value={typeof inputValue === 'number' ? inputValue : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  
                  min={20}
                  max={35}
                  style={{
                    margin: '0 16px',
                  }}
                  value={inputValue}
                  onChange={onChange}
                />
              </Col>
            </Row>
          </Space>
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
              // onScroll={onScroll}
              
            >
              {(item) => (
                <List.Item key={item.title}>
                  <List.Item.Meta
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
            {/* <List
              height={ContainerHeight}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    // avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />} 
                    title={<a href="https://ant.design">{item.title}</a>}
                    // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            /> */}
        </Card>
        {/* 刷新按钮 */}
        <Button
          className='ReAskButton'
          type="primary"
          icon={<ReloadOutlined />}
          onClick={() => ReAsk('af4f668c-cb1c-11ed-9dac-5f966284fe3b')}
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
          TBD ©2023 Created by Yuanshin
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Laypage;