import { Box } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { IChangeEvent } from '@rjsf/core';
import Form from '@rjsf/material-ui';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import React, { Component, FormEvent } from 'react';

interface AppFormProps {
  api: String;
  token: String;
  maxWidth: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface AppFormState {
  schema: RJSFSchema;
  submitted: boolean;
  response: any;
}

export class AppForm extends Component<AppFormProps, AppFormState> {
  state = {
    schema: {},
    submitted: false,
    response: null
  }

  componentDidMount() {
    void this.getSchema();
  }

  componentDidUpdate(prevProps: Readonly<AppFormProps>, prevState: Readonly<AppFormState>) {
    if (prevProps.token !== this.props.token) {
      void this.getSchema();
    }
  }

  getSchema = async (): Promise<void> => {
    const { api, token } = this.props;
    if (token) {
      try {
        const response = await fetch(
          `${api}/submissions/${token}/schema.json`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        const schema = await response.json();
        this.setState({ schema });
      } catch (error) {
        console.error(error);
      }
    }
  };

  handleSubmit = async ({ formData }: IChangeEvent, event: FormEvent) => {
    const { api, token } = this.props;
    try {
      const response = await fetch(
        `${api}/submissions/${token}/submit/json`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      this.setState({ submitted: true, response: await response.json() })
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  render() {
    return (
      <Container maxWidth={this.props.maxWidth}>
        <Box sx={{ my: 4 }}>
          <Form schema={this.state.schema}
                validator={validator}
                onSubmit={this.handleSubmit}
                liveValidate/>
        </Box>
        {this.state.submitted &&
            <Box component="pre">
              {JSON.stringify(this.state.response, null, 2)}
            </Box>
        }
      </Container>
    );
  }

}
