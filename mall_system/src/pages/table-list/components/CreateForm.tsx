import { PlusOutlined } from '@ant-design/icons';
import {
  type ActionType,
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import type { FC } from 'react';
import { addProduct } from '@/services/ant-design-pro/api';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;

  const [messageApi, contextHolder] = message.useMessage();
  const intl = useIntl();

  const { run, loading } = useRequest(addProduct, {
    manual: true,
    onSuccess: () => {
      messageApi.success('商品创建成功');
      reload?.();
    },
    onError: () => {
      messageApi.error('商品创建失败，请重试');
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm
        title="新建商品"
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            新建商品
          </Button>
        }
        width="600px"
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          await run({
            data: {
              ...value,
              method: 'post',
              status: value.status ? 1 : 0,
            } as API.ProductListItem
          });
          return true;
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '请输入商品名称',
            },
          ]}
          width="md"
          name="name"
          label="商品名称"
          placeholder="请输入商品名称"
        />
        <ProFormSelect
          rules={[
            {
              required: true,
              message: '请选择商品分类',
            },
          ]}
          width="md"
          name="category"
          label="商品分类"
          placeholder="请选择商品分类"
          options={[
            { label: '服装', value: '服装' },
            { label: '配饰', value: '配饰' },
            { label: '美妆', value: '美妆' },
            { label: '家居', value: '家居' },
            { label: '数码', value: '数码' },
            { label: '食品', value: '食品' },
            { label: '运动', value: '运动' },
            { label: '图书', value: '图书' },
          ]}
        />
        <ProFormDigit
          rules={[
            {
              required: true,
              message: '请输入商品价格',
            },
          ]}
          width="md"
          name="price"
          label="售价"
          placeholder="请输入商品售价"
          min={0}
          fieldProps={{ precision: 2 }}
        />
        <ProFormDigit
          rules={[
            {
              required: true,
              message: '请输入库存数量',
            },
          ]}
          width="md"
          name="stock"
          label="库存"
          placeholder="请输入库存数量"
          min={0}
        />
        <ProFormTextArea
          width="md"
          name="description"
          label="商品描述"
          placeholder="请输入商品描述"
        />
        <ProFormSwitch
          name="status"
          label="上架状态"
          checkedChildren="上架"
          unCheckedChildren="下架"
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
