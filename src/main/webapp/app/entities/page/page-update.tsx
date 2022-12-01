import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPage } from 'app/shared/model/page.model';
import { getEntity, updateEntity, createEntity, reset } from './page.reducer';

export const PageUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const pageEntity = useAppSelector(state => state.page.entity);
  const loading = useAppSelector(state => state.page.loading);
  const updating = useAppSelector(state => state.page.updating);
  const updateSuccess = useAppSelector(state => state.page.updateSuccess);

  const handleClose = () => {
    navigate('/page');
  };

  useEffect(() => {
    const urlLocal = window.location.pathname;
    console.log('url', urlLocal);
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...pageEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...pageEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="qrcodepagesApp.page.home.createOrEditLabel" data-cy="PageCreateUpdateHeading">
            Create or edit a Page
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="page-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Url" id="page-url" name="url" data-cy="url" type="text" />
              <ValidatedField label="Title" id="page-title" name="title" data-cy="title" type="text" />
              <ValidatedField label="Text" id="page-text" name="text" data-cy="text" type="textarea" />
              <ValidatedBlobField label="Image" id="page-image" name="image" data-cy="image" openActionLabel="Open" />
              <ValidatedBlobField label="Logo" id="page-logo" name="logo" data-cy="logo" openActionLabel="Open" />
              <ValidatedField label="Qrcode" id="page-qrcode" name="qrcode" data-cy="qrcode" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/page" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PageUpdate;
