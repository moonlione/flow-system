<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="60" >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="门店名称" width="110" >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="门店地址"  align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="有效期" width="300">
        <template slot-scope="scope">
          {{ dateFormat(scope.row.start_time) +'~'+dateFormat(scope.row.end_time) }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          {{ dateFormat(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="()=>{deviceList(scope.row.id)}">设备管理</el-button>
          <el-button type="danger" plain size="small" @click="()=>{deleteData(scope.row.id)}">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  <div style="margin-top: 20px;text-align: center">   <el-button @click="()=>{ $router.push({ path: '/list' })}">取消</el-button>
  </div>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import {getlastYear,dateFormat} from '@/utils/index'
import $http from '@/utils/request'
export default {
  data() {
    return {
      showDialog:false,
      dateFormat:dateFormat,
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    deviceList(id){
      this.$router.push({
        path:'/device/list',query: { storeId: id,userId:this.$route.query.id }
      })
    },
    fetchData() {
      this.listLoading = true;
      $http.get('/auth/store_list',{
        params:{
          id:this.$route.query.id
        }
      }).then(response => {
        this.list = response.data.data;
        this.listLoading = false
      })
    },
    deleteData(id){
      this.listLoading = true;
      $http.delete('/auth/store_del',{
        params:{
          id:id
        }
      }).then(res => {
        if(res.data.code===0){
          this.fetchData();
          Message({
            message: '删除成功',
            type: 'success'
          });
        }else{
          Message({
            message: '删除失败',
            type: 'error'
          });
        }
      })
    }
  }
}
</script>
