import type {
  ActionType,
  ProColumns,
  ProDescriptionsItemProps,
} from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Drawer, Image, Tag, message, Switch } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import { removeProduct, getProducts, updateProduct } from '@/services/ant-design-pro/api';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

const ProductManagement: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.ProductListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.ProductListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const [messageApi, contextHolder] = message.useMessage();

  const { run: delRun, loading } = useRequest(removeProduct, {
    manual: true,
    onSuccess: () => {
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();

      messageApi.success('删除成功，即将刷新');
    },
    onError: () => {
      messageApi.error('删除失败，请重试');
    },
  });

  const { run: updateStatusRun } = useRequest(updateProduct, {
    manual: true,
    onSuccess: () => {
      messageApi.success('状态更新成功');
      actionRef.current?.reload();
    },
    onError: () => {
      messageApi.error('状态更新失败，请重试');
    },
  });

  const columns: ProColumns<API.ProductListItem>[] = [
    {
      title: '商品图片',
      dataIndex: 'images',
      valueType: 'image',
      width: 100,
      hideInSearch: true,
      render: (_, record) => (
        <Image
          width={60}
          height={60}
          src={record.images?.[0] || '/product_pic/clothes.png'}
          alt={record.name}
          style={{ objectFit: 'cover', borderRadius: 4 }}
        />
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      width: 200,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '商品分类',
      dataIndex: 'category',
      width: 120,
      valueType: 'select',
      valueEnum: {
        服装: { text: '服装' },
        配饰: { text: '配饰' },
        美妆: { text: '美妆' },
        家居: { text: '家居' },
        数码: { text: '数码' },
        食品: { text: '食品' },
        运动: { text: '运动' },
        图书: { text: '图书' },
      },
    },
    {
      title: '售价',
      dataIndex: 'price',
      width: 100,
      sorter: true,
      hideInSearch: true,
      renderText: (val: number) => `¥${val?.toFixed(2) || '0.00'}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      width: 100,
      sorter: true,
      hideInSearch: true,
      renderText: (val: number) => val || 0,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      width: 100,
      sorter: true,
      hideInSearch: true,
      renderText: (val: number) => val || 0,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueType: 'select',
      valueEnum: {
        0: {
          text: <Tag color="default">下架</Tag>,
          status: 'Default',
        },
        1: {
          text: <Tag color="success">上架</Tag>,
          status: 'Success',
        },
      },
      render: (_, record) => (
        <Switch
          checked={record.status === 1}
          checkedChildren="上架"
          unCheckedChildren="下架"
          onChange={async (checked) => {
            await updateStatusRun({
              data: {
                method: 'update',
                key: record.key,
                id: record.id,
                status: checked ? 1 : 0,
                name: record.name,
                category: record.category,
                price: record.price,
                stock: record.stock,
                description: record.description,
                specs: record.specs,
              },
            });
          }}
        />
      ),
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      width: 180,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 150,
      render: (_, record) => [
        <UpdateForm
          trigger={<a key="edit">编辑</a>}
          key="edit"
          onOk={actionRef.current?.reload}
          values={record}
        />,
        <a
          key="delete"
          onClick={() => {
            delRun({
              data: {
                method: 'delete',
                key: [record.key],
              },
            });
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  /**
   *  Delete products
   * @zh-CN 删除商品
   *
   * @param selectedRows
   */
  const handleRemove = useCallback(
    async (selectedRows: API.ProductListItem[]) => {
      if (!selectedRows?.length) {
        messageApi.warning('请选择要删除的商品');

        return;
      }

      await delRun({
        data: {
          method: 'delete',
          key: selectedRows.map((row) => row.key),
        },
      });
    },
    [delRun, messageApi],
  );

  return (
    <PageContainer>
      {contextHolder}
      <ProTable<API.ProductListItem, API.PageParams>
        headerTitle="商品管理"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <CreateForm key="create" reload={actionRef.current?.reload} />,
        ]}
        request={getProducts}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项
              &nbsp;&nbsp;
              <span>
                总库存: {selectedRowsState.reduce((pre, item) => pre + (item.stock ?? 0), 0)}
              </span>
            </div>
          }
        >
          <Button
            loading={loading}
            onClick={() => {
              handleRemove(selectedRowsState);
            }}
          >
            批量删除
          </Button>
          <Button 
            type="primary"
            onClick={() => {
              messageApi.success('批量上架成功');
              actionRef.current?.reload();
            }}
          >
            批量上架
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={800}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={true}
        title="商品详情"
      >
        {currentRow && (
          <ProDescriptions<API.ProductListItem>
            column={2}
            title={currentRow.name}
            dataSource={currentRow}
            columns={[
              {
                title: '商品ID',
                dataIndex: 'id',
              },
              {
                title: '商品名称',
                dataIndex: 'name',
              },
              {
                title: '商品分类',
                dataIndex: 'category',
              },
              {
                title: '售价',
                dataIndex: 'price',
                render: (val: number) => `¥${val?.toFixed(2) || '0.00'}`,
              },
              {
                title: '库存',
                dataIndex: 'stock',
              },
              {
                title: '销量',
                dataIndex: 'sales',
              },
              {
                title: '状态',
                dataIndex: 'status',
                render: (val: number) => (
                  <Tag color={val === 1 ? 'success' : 'default'}>
                    {val === 1 ? '上架' : '下架'}
                  </Tag>
                ),
              },
              {
                title: '商品图片',
                dataIndex: 'images',
                valueType: 'image',
                span: 2,
              },
              {
                title: '商品描述',
                dataIndex: 'description',
                span: 2,
                valueType: 'textarea',
              },
              {
                title: '规格',
                dataIndex: 'specs',
                span: 2,
                render: (specs: any) => {
                  if (!specs) return '-';
                  return (
                    <div>
                      {specs.size && (
                        <div>尺码: {specs.size.join(', ')}</div>
                      )}
                      {specs.color && (
                        <div>颜色: {specs.color.join(', ')}</div>
                      )}
                    </div>
                  );
                },
              },
              {
                title: '创建时间',
                dataIndex: 'createdAt',
                valueType: 'dateTime',
              },
              {
                title: '更新时间',
                dataIndex: 'updatedAt',
                valueType: 'dateTime',
              },
            ]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ProductManagement;
