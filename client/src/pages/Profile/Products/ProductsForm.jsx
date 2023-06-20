import { Col, Form, Input, Modal, Row, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, editProduct } from "../../../redux/slice/product/productSlice";
import Images from "./Images";

const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];
const ProductsForm = ({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  setSelectedProduct,
}) => {
  const [selectedTab, setSelectedTab] = useState("1")
  const { createSuccess } = useSelector((state) => state.product);
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const onFinish = (values) => {
    if (selectedProduct) {
      const payload = {...values, id: selectedProduct._id}
      dispatch(editProduct(payload))
    }else{
      dispatch(addNewProduct(values));
    }
  };

  useEffect(() => {
    if (createSuccess ) {
      setShowProductForm(false);
    }
  }, [createSuccess, dispatch, setShowProductForm]);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <div className="modal-component">
      <Modal
        open={showProductForm}
        onCancel={() =>{ setShowProductForm(false)
                        setSelectedProduct(null)}
        }
        centered
        width={700}
        okText="Save"
        onOk={() => formRef.current.submit()}
        {...(selectedTab === "2" && {footer: false})}
      >
        <div>
            <h1 className='text-primary text-2xl text-center font-semibold uppercase'>
                {selectedProduct ? "Edit Product" : "Add Product" }
            </h1>
            <Tabs defaultActiveKey="1"
              activeKey={selectedTab}
              onChange={(key) => setSelectedTab(key)}
            >
                <Tabs.TabPane tab="General" key="1">
                <Form layout="vertical" ref={formRef} onFinish={onFinish}>
                    <Form.Item label="Name" name="name" rules={rules}>
                    <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={rules}>
                    <TextArea type="text" />
                    </Form.Item>

                    <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Form.Item label="Price" name="price" rules={rules}>
                        <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Category" name="category" rules={rules}>
                        <select>
                            <option value="">Select an Option</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home</option>
                            <option value="sports">Sports</option>
                        </select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Product Age" name="age" rules={rules}>
                        <Input type="number" />
                        </Form.Item>
                    </Col>
                    </Row>

                    <div className="flex gap-5 lg:gap-10">
                    {additionalThings.map((item, i) => {
                        return (
                        <Form.Item label={item.label} name={item.name} key={i} valuePropName="checked">
                            <Input
                            type="checkbox"
                            value={item.name}
                            onChange={(e) => {
                                formRef.current.setFieldsValue({
                                [item.name]: e.target.checked,
                                });
                            }}
                            checked={formRef.current?.getFieldValue(item.name)}
                            />
                        </Form.Item>
                        );
                    })}
                    </div>

                    <Form.Item 
                      label='Show Bids on Product Page' 
                      name='showBidsOnProductPage'  
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        onChange={(e) => {
                            formRef.current.setFieldsValue({
                            showBidsOnProductPage: e.target.checked,
                            });
                        }}
                        checked={formRef.current?.getFieldValue('showBidsOnProductPage')}
                        style={{ width: 50, marginLeft: 20}}
                      />
                    </Form.Item>
                </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
                  <Images selectedProduct={selectedProduct} setShowProductForm={setShowProductForm} />
                </Tabs.TabPane>
            </Tabs>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsForm;
