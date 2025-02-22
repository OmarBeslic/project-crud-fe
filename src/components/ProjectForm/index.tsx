import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Button, Checkbox, Spin, message } from 'antd';
import dayjs from 'dayjs';

import {
  useAddProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useGetProjectsQuery,
} from '../../features/api/projectApi';
import { useParams } from 'react-router-dom';

type Mode = 'new' | 'edit' | 'read';

interface ProjectFormProps {
  mode: Mode;
  onSubmitSuccess?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ mode, onSubmitSuccess }) => {
  const [form] = Form.useForm();
  const { id: projectId } = useParams();
  // Fetch all projects for ID validation in "new" mode
  const { data: allProjects } = useGetProjectsQuery(undefined, {
    skip: mode !== 'new',
  });

  // Fetch project data if in edit or read mode
  const { data: project, isLoading } = useGetProjectByIdQuery(projectId!, {
    skip: mode === 'new',
  });

  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  // Prefill form when project data is available
  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        ...project,
        startDate: dayjs(project.startDate),
        endDate: dayjs(project.endDate),
      });
    }
  }, [project, form]);

  // Submit handler
  const handleSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      startDate: values.startDate?.toISOString(),
      endDate: values.endDate?.toISOString(),
    };

    if (mode === 'new') {
      // Check if ID already exists
      const idExists = allProjects?.some((p) => p.id === values.id);
      if (idExists) {
        message.error('Project ID already exists. Please use a different ID.');
        return;
      }

      await addProject(formattedValues).unwrap();
      message.success('Project created successfully!');
    } else if (mode === 'edit') {
      await updateProject({ id: projectId, ...formattedValues }).unwrap();
      message.success('Project updated successfully!');
    }

    onSubmitSuccess?.();
  };

  if (isLoading) return <Spin />;

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Project ID"
        name="id"
        rules={[{ required: true, message: 'Project ID is required' }]}
      >
        <Input disabled={mode !== 'new'} />
      </Form.Item>

      <Form.Item
        label="Project Name"
        name="name"
        rules={[{ required: true, message: 'Project Name is required' }]}
      >
        <Input disabled={mode === 'read'} />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <Input.TextArea disabled={mode === 'read'} />
      </Form.Item>

      <Form.Item
        label="Start Date"
        name="startDate"
        rules={[{ required: true, message: 'Start Date is required' }]}
      >
        <DatePicker format="YYYY-MM-DD" disabled={mode === 'read'} />
      </Form.Item>

      <Form.Item
        label="End Date"
        name="endDate"
        dependencies={['startDate']}
        rules={[
          { required: true, message: 'End Date is required' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || !getFieldValue('startDate')) {
                return Promise.resolve();
              }
              if (dayjs(value).isBefore(getFieldValue('startDate'))) {
                return Promise.reject(
                  new Error('End Date cannot be before Start Date'),
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <DatePicker format="YYYY-MM-DD" disabled={mode === 'read'} />
      </Form.Item>

      <Form.Item
        label="Manager"
        name="manager"
        rules={[{ required: true, message: 'Manager is required' }]}
      >
        <Input disabled={mode === 'read'} />
      </Form.Item>

      {mode !== 'read' && (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isAdding || isUpdating}
          >
            {mode === 'new' ? 'Create Project' : 'Update Project'}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default ProjectForm;
