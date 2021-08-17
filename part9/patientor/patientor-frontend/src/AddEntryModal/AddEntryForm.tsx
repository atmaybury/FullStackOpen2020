import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField,
  DiagnosisSelection,
  TypeSelection,
  EntryType,
  EntryTypeOption } from "./FormField";
import { EntryFormValues } from "../types";
import { useStateValue } from '../state';
import {NumberField} from "../AddPatientModal/FormField";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: EntryTypeOption[] = [
  { value: EntryType.None, label: "None" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Occupational, label: "Occupational Healthcare" }
];

const isDate = (date: string) => {
  return Boolean(Date.parse(date));
};

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "None",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        // healthcheck
        healthCheckRating: 0,
        // occupational healthcare
        employerName: "",
        sickLeaveStartDate: "",
        sickLeaveEndDate: "",
        // hospital
        dischargeDate: "",
        dischargeCriteria: "",
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.description.length < 5) {
          errors.description = 'description too short';
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isDate(values.date)) {
          errors.date = 'invalid date';
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "Hospital") {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }
        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ values, isValid, setFieldValue, setFieldTouched }) => {

        if (values.type === "Hospital") {
          return (
            <Form className="form ui">
              <TypeSelection
                name="type"
                label="Type"
                options={typeOptions}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                diagnoses={Object.values(diagnoses)}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              <Field
                label="Discharge Date"
                placeholder="YYYY-MM-DD"
                name="dischargeDate"
                component={TextField}
              />
              <Field
                label="Discharge Criteria"
                placeholder="Discharge Criteria"
                name="dischargeCriteria"
                component={TextField}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }

        if (values.type === "HealthCheck") {
          return (
            <Form className="form ui">
              <TypeSelection
                name="type"
                label="Type"
                options={typeOptions}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                diagnoses={Object.values(diagnoses)}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              {/*
              <SelectField
                label="Health check rating"
                name="healthCheckRating"
                options={healthCheckOptions}
              />
              */}
              <Field 
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }

        if (values.type === "OccupationalHealthcare") {
          return (
            <Form className="form ui">
              <TypeSelection
                name="type"
                label="Type"
                options={typeOptions}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                diagnoses={Object.values(diagnoses)}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              <Field
                label="Employer"
                placeholder="Employer"
                name="employerName"
                component={TextField}
              />
              <Field
                label="Sick Leave Start Date"
                placeholder="YYYY-MM-DD"
                name="sickLeaveStartDate"
                component={TextField}
              />
              <Field
                label="Sick Leave End Date"
                placeholder="YYYY-MM-DD"
                name="sickLeaveEndDate"
                component={TextField}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }

        return (
          <Form className="form ui">
            <TypeSelection
              name="type"
              label="Type"
              options={typeOptions}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
