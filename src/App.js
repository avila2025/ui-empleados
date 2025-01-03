import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Table, Layout, Menu } from 'antd';
import {
  UserOutlined,
} from '@ant-design/icons';
import logo from './logo.webp';
import axios from 'axios';
import './App.css';
const { Sider, Content } = Layout;

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [empleadosPerPage] = useState(5);

  useEffect(() => {
    const fetchDataEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:5173/api/Employees');
        if (response.status === 200) {
          setEmpleados(response.data);
        } else {
          console.error('Error al obtener los datos de la API de Empleados');
        }
      } catch (error) {
        console.error('Error en la API  de empleados:', error);
      }
    };
    fetchDataEmpleados();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Document',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
    },
    {
      title: 'Admission Date',
      dataIndex: 'admissionDate',
      key: 'admissionDate',
    },
  ];

  return (
    <div>
      <Table
        dataSource={empleados}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: empleadosPerPage,
          total: empleados.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
}

const App = () => {
  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: <Link to="/employees">Empleados</Link>,
    },
  ];

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="dark" collapsible>
          <Menu theme="dark" mode="inline" items={menuItems} />
        </Sider>
        <Layout>
          <Content style={{ margin: '16px', padding: '16px', background: '#fff' }}>
            <Routes>
              <Route path="/employees" element={<Empleados />} />
              <Route path="/" element={<Empleados />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
export default App;
