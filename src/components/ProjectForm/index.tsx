import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Button, Spin, message } from 'antd';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useAddProjectMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from '../../features/api/projectApi';

type Mode = 'new' | 'edit' | 'read';

interface ProjectFormProps {
  mode: Mode;
  onSubmitSuccess?: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ mode, onSubmitSuccess }) => {
  const [form] = Form.useForm();
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  // Queries & Mutations
  const { data: allProjects } = useGetProjectsQuery(undefined, {
    skip: mode !== 'new',
  });
  const { data: project, isLoading } = useGetProjectByIdQuery(projectId!, {
    skip: mode === 'new',
  });
  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  // Prefill form in edit/read mode
  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        ...project,
        startDate: project.startDate ? dayjs(project.startDate) : null,
        endDate: project.endDate ? dayjs(project.endDate) : null,
      });
    }
  }, [project]);

  // Handlers
  const handleAddProject = async (values: any) => {
    const idExists = allProjects?.some((p) => p.id === values.id);
    if (idExists) {
      message.error('Project ID already exists. Please use a different ID.');
      return;
    }

    await addProject(formatValues(values)).unwrap();
    message.success('Project created successfully!');
    onSubmitSuccess?.();
  };

  const handleUpdateProject = async (values: any) => {
    await updateProject({ id: projectId, ...formatValues(values) }).unwrap();
    message.success('Project updated successfully!');
    onSubmitSuccess?.();
  };

  const handleDeleteProject = async () => {
    await deleteProject(projectId!).unwrap();
    message.success('Project deleted successfully!');
    onSubmitSuccess?.();
  };

  const handleSubmit = async (values: any) => {
    if (mode === 'new') await handleAddProject(values);
    else if (mode === 'edit') await handleUpdateProject(values);
  };

  // Helper function to format dates
  const formatValues = (values: any) => ({
    ...values,
    startDate: values.startDate?.toISOString(),
    endDate: values.endDate?.toISOString(),
  });

  if (isLoading) return <Spin style={{ margin: '200px auto' }} />;

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
              if (!value || !getFieldValue('startDate'))
                return Promise.resolve();
              return dayjs(value).isBefore(getFieldValue('startDate'))
                ? Promise.reject(
                    new Error('End Date cannot be before Start Date'),
                  )
                : Promise.resolve();
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

      <Form.Item>
        <Button onClick={() => navigate('/projects')}>Back</Button>

        {mode !== 'read' ? (
          <Button
            type="primary"
            htmlType="submit"
            loading={isAdding || isUpdating}
            style={{ marginLeft: 8 }}
          >
            {mode === 'new' ? 'Create' : 'Update'}
          </Button>
        ) : (
          <>
            <Button
              type="primary"
              onClick={() => navigate(`/projects/${projectId}/edit`)}
              style={{ marginLeft: 8 }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDeleteProject}
              loading={isDeleting}
              style={{ marginLeft: 8 }}
            >
              Delete
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
