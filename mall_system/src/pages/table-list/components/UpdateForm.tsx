import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormSwitch,
  ProFormItem,
  StepsForm,
} from '@ant-design/pro-components';
import { useIntl, useRequest } from '@umijs/max';
import { Modal, message, Upload } from 'antd';
import React, { cloneElement, useCallback, useState } from 'react';
import { updateProduct } from '@/services/ant-design-pro/api';

export type FormValueType = {
  category?: string;
  price?: number;
  stock?: number;
  status?: number;
  description?: string;
  specs?: {
    size?: string[];
    color?: string[];
    [key: string]: any;
  };
} & Partial<API.ProductListItem>;

export type UpdateFormProps = {
  trigger?: React.ReactElement<any>;
  onOk?: () => void;
  values: Partial<API.ProductListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onOk, values, trigger } = props;

  const intl = useIntl();

  const [open, setOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const { run } = useRequest(updateProduct, {
    manual: true,
    onSuccess: () => {
      messageApi.success('商品更新成功');
      onOk?.();
    },
    onError: () => {
      messageApi.error('商品更新失败，请重试');
    },
  });

  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onFinish = useCallback(
    async (values?: any) => {
      await run({
        data: {
          ...values,
          method: 'update',
          key: values.key || values.id,
          id: values.id,
          status: values.status ? 1 : 0,
        }
      });
      onCancel();
    },
    [onCancel, run],
  );

  return (
    <>
      {contextHolder}
      {trigger
        ? cloneElement(trigger, {
          onClick: onOpen,
        })
        : null}
      <StepsForm
        stepsProps={{
          size: 'small',
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              width={800}
              bodyStyle={{ padding: '32px 40px 48px' }}
              destroyOnClose
              title="编辑商品"
              open={open}
              footer={submitter}
              onCancel={onCancel}
            >
              {dom}
            </Modal>
          );
        }}
        onFinish={onFinish}
      >
        <StepsForm.StepForm
          initialValues={{
            ...values,
            status: values.status === 1,
          }}
          title="基本信息"
        >
          <ProFormText
            name="name"
            label="商品名称"
            width="md"
            rules={[
              {
                required: true,
                message: '请输入商品名称',
              },
            ]}
          />
          <ProFormSelect
            name="category"
            width="md"
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
            rules={[
              {
                required: true,
                message: '请选择商品分类',
              },
            ]}
          />
          <ProFormDigit
            name="price"
            label="售价"
            width="md"
            placeholder="请输入商品售价"
            min={0}
            fieldProps={{ precision: 2 }}
            rules={[
              {
                required: true,
                message: '请输入商品价格',
              },
            ]}
          />
          <ProFormDigit
            name="stock"
            label="库存"
            width="md"
            placeholder="请输入库存数量"
            min={0}
            rules={[
              {
                required: true,
                message: '请输入库存数量',
              },
            ]}
          />
          <ProFormTextArea
            name="description"
            width="md"
            label="商品描述"
            placeholder="请输入商品描述"
          />
          <ProFormSwitch
            name="status"
            label="上架状态"
            checkedChildren="上架"
            unCheckedChildren="下架"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            specs: values.specs || { size: [], color: [] },
          }}
          title="规格设置"
        >
          <ProFormSelect
            name={['specs', 'size']}
            label="尺码"
            width="md"
            mode="multiple"
            placeholder="请选择尺码"
            options={[
              { label: 'S', value: 'S' },
              { label: 'M', value: 'M' },
              { label: 'L', value: 'L' },
              { label: 'XL', value: 'XL' },
              { label: 'XXL', value: 'XXL' },
            ]}
          />
          <ProFormSelect
            name={['specs', 'color']}
            label="颜色"
            width="md"
            mode="multiple"
            placeholder="请选择颜色"
            options={[
              { label: '红色', value: '红色' },
              { label: '蓝色', value: '蓝色' },
              { label: '绿色', value: '绿色' },
              { label: '黑色', value: '黑色' },
              { label: '白色', value: '白色' },
              { label: '黄色', value: '黄色' },
              { label: '粉色', value: '粉色' },
            ]}
          />
          <ProFormItem
            name="images"
            label="商品图片"
            extra="支持多图上传，最多5张"
          >
            <Upload
              action="/api/upload"
              listType="picture-card"
              maxCount={5}
              multiple
            >
              <div>
                <div style={{ marginTop: 8 }}>上传</div>
              </div>
            </Upload>
          </ProFormItem>
        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};

export default UpdateForm;
