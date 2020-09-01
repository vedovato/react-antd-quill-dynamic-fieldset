import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Button, Space } from "antd";
import ReactQuill from "react-quill";

import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";

const DATA = [
  { question: "Primeira Questão Asb #2" },
  { question: "Mais uma Questão para Asb #2" },
  { question: "Nova questão disponível" },
  { question: "Testando novo conteúdo" },
  { question: "Item final para discussão" }
];

const DynamicFieldSet = () => {
  const [formData, setFormData] = useState([]);

  const onFinish = ({ questions }) => {
    console.info("Values:", questions);
  };

  useEffect(() => {
    const data = DATA.reduce((acc, item) => {
      acc.push(item.question);
      return acc;
    }, []);

    setFormData(data);
  }, []);

  return formData.length ? (
    <Form
      onFinish={onFinish}
      initialValues={{ questions: formData }}
      style={{ padding: 40 }}
    >
      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Form.Item key={field.key}>
                <Space direction="horizontal">
                  <Form.Item {...field} children={<ReactQuill />} />
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              </Form.Item>
            ))}

            <Form.Item>
              <Button onClick={() => add(null)} icon={<PlusOutlined />} />
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  ) : null;
};

export default DynamicFieldSet;
