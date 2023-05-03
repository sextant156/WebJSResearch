import { makeAutoObservable } from "mobx";
import { http } from '@/utils';
import { useState } from 'react';
import cookie from 'react-cookies'
class MainStore 
{
  ResultsInfo = {};
  imgSrc={};
  OrderList={};
  // 组合器
  constructor() 
  {
    makeAutoObservable(this)
  }
  //登录
  getToken = async ({ username, password }) => 
  {
    
    const res = await http.post('https://tritium.work:5000/signin', 
    {
      username,
      password
    });
    //存入token
    this.token = res.token;
    cookie.remove('Token');
    cookie.save('Token',res.token,{path:'/'});
  }
  PushRegsInfo = async({ username , password }) =>
  {
    const res = await http.post('https://tritium.work:5000/signup',
    {
      username,
      password
    });
  }
  PushPrompts = async ({ token , steps , task_num , task_detail }) => 
  {
    const ImageBack = await http.post('https://tritium.work:5000/upload_task', 
    {
      token,
      task_num,
      task_detail,

    })
  };
  getResultList = async({ token })=>
  {
    const  ResultList= await http.post('https://tritium.work:5000/get_task_list',
    {
      token,
    })
    // 测试阶段，即插即拔
    this.OrderList = ResultList.task_name_list;
    // 决定不用cookie了
    // cookie.remove('OrderList');
    // cookie.save('OrderList',ResultList.task_name_list,{path:'/'});
  };
  getResult = async ({ token , task_name}) => 
  {
    const Results = await http.post('https://tritium.work:5000//get_result',
    {
      token,
      task_name,
    })
    // 测试阶段，即插即拔
    // this.ResultsInfo = Results;
    this.imgSrc = Results.result;
  };
}
export default MainStore